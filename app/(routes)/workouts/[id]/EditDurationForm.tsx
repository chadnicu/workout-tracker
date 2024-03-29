"use client";

import { editWorkout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Workout } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const timeSchema = z.object({
  started: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Invalid time format. Expected HH:MM",
  }),
  finished: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Invalid time format. Expected HH:MM",
  }),
});

function HHMMToUnix(started: string, finished: string) {
  const startedDate = new Date(`1970-01-01T${started}:00`).getTime().toString();
  const finishedDate = new Date(`1970-01-01T${finished}:00`)
    .getTime()
    .toString();

  return [startedDate, finishedDate];
}

function unixToHHMM(unixTimestamp: number) {
  const date = new Date(unixTimestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
}

export default function EditDurationForm({ workout }: { workout: Workout }) {
  const queryKey = [`workout-${workout.id}`];

  const [editable, setEditable] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof timeSchema>>({
    resolver: zodResolver(timeSchema),
    defaultValues: {
      started: unixToHHMM(parseInt(workout.started ?? "", 10)),
      finished: unixToHHMM(parseInt(workout.finished ?? "", 10)),
    },
  });

  async function onSubmit(values: z.infer<typeof timeSchema>) {
    setEditable(false);
    const [started, finished] = HHMMToUnix(values.started, values.finished);
    console.log(values.started, values.finished, started, finished, "HEREE");
    await editWorkout(workout.id, { ...workout, started, finished });
    await queryClient.invalidateQueries(queryKey);
  }

  const { mutate } = useMutation({
    mutationFn: onSubmit,
    onMutate: async (values: z.infer<typeof timeSchema>) => {
      const [started, finished] = HHMMToUnix(values.started, values.finished);
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData(queryKey);
      queryClient.setQueriesData(queryKey, { ...workout, started, finished });

      return { previous };
    },
    onError: (err, newExercise, context) => {
      queryClient.setQueryData(queryKey, context?.previous);
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <>
      {editable ? (
        <Card className="mx-auto mb-1 grid w-fit p-1">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-lg">Edit session duration</CardTitle>
            {/* <CardDescription></CardDescription> */}
          </CardHeader>
          <CardContent className="p-4 pb-2">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(
                  async (data: z.infer<typeof timeSchema>) => mutate(data)
                )}
                className="grid gap-2 pb-2"
              >
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="started"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-2">
                          <FormControl>
                            <Input
                              type="time"
                              // placeholder={started}
                              className="w-full text-center"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="finished"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-2">
                          <FormControl>
                            <Input
                              type="time"
                              // placeholder="0"
                              className="w-full text-center"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <Button
                    variant={"outline"}
                    onClick={() => setEditable(false)}
                    className="w-full"
                  >
                    Close
                  </Button>
                  <Button variant={"default"} type="submit" className="w-full">
                    Done
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      ) : (
        <Button
          variant={"outline"}
          className="mx-auto w-fit"
          onClick={() => setEditable(true)}
        >
          Edit
        </Button>
      )}
    </>
  );
}
