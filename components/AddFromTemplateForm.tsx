"use client";

import { Template } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { addTemplateToWorkout } from "@/app/(pages)/actions";
// import { toast } from "@/components/ui/use-toast"

const fromTemplateSchema = z.object({
  date: z.date({
    required_error: "Date of the workout is required.",
  }),
  templateId: z.coerce.number().positive(),
});

export default function AddFromTemplateForm({
  templates,
}: {
  templates: Template[];
}) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof fromTemplateSchema>>({
    resolver: zodResolver(fromTemplateSchema),
    defaultValues: {
      date: new Date(),
      templateId: 0,
    },
  });

  function onSubmit(data: z.infer<typeof fromTemplateSchema>) {
    addTemplateToWorkout(data.templateId, { date: data.date });
    queryClient.invalidateQueries(["workouts"]);
  }

  const { mutate: addOptimistically } = useMutation({
    mutationFn: async (data: z.infer<typeof fromTemplateSchema>) => {
      setOpen(false);
      form.reset();
      await addTemplateToWorkout(data.templateId, { date: data.date });
      queryClient.invalidateQueries(["workouts"]);
    },
    onMutate: async (newWorkout: z.infer<typeof fromTemplateSchema>) => {
      await queryClient.cancelQueries({ queryKey: ["workouts"] });
      const previous = queryClient.getQueryData(["workouts"]);
      queryClient.setQueryData(["workouts"], (old: any) => {
        const template = templates.find(
          ({ id }) => id === newWorkout.templateId
        );
        return [
          ...old,
          {
            date: newWorkout.date,
            ...template,
          },
        ];
      });
      return { previous };
    },
    onError: (err, newExercise, context) =>
      queryClient.setQueryData(["workouts"], context?.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["workouts"] }),
  });

  return (
    <>
      {open ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof fromTemplateSchema>) =>
                addOptimistically(data)
            )}
            className="mt-10 space-y-6 text-left"
          >
            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Template</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[240px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? templates.find(
                                (template) => template.id === field.value
                              )?.title
                            : "Select template"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] p-0">
                      <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {templates?.map((template) => (
                            <CommandItem
                              value={template.title}
                              key={template.id}
                              onSelect={() => {
                                form.setValue("templateId", template.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  template.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {template.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    This is the template blabla.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <DatePicker field={field} />
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="flex w-full justify-around gap-2">
              <Button
                variant={"outline"}
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant={"outline"} className="w-full">
                Add
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div>
          <Button
            variant={"outline"}
            className="w-full"
            onClick={() => setOpen(true)}
          >
            Add from template
          </Button>
        </div>
      )}
    </>
  );
}

function DatePicker({
  field,
}: {
  field?: ControllerRenderProps<
    {
      date: Date;
      templateId: number;
    },
    "date"
  >;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field?.value && "text-muted-foreground"
            )}
          >
            {field?.value ? (
              format(field?.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field?.value}
          onSelect={(e) => {
            if (e) return field?.onChange(e);
          }}
          // disabled={(date) =>
          //   date > new Date() || date < new Date("1900-01-01")
          // }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}