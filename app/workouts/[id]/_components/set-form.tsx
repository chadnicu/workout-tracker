import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/loading-spinner";
import { ToggleDialogFunction } from "@/components/responsive-form-dialog";
import { ReactNode, useContext } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { WorkoutExerciseContext } from "../_utils/context";
import { SetInput } from "../_utils/types";
import { setSchema } from "../_utils/validators";

export default function SetForm({
  submitAction,
  deleteSet,
  isDeleting,
  isSubmitting,
  defaultValues,
  submitButtonText,
}: {
  submitAction: (values: SetInput) => void;
  deleteSet?: () => void;
  isDeleting?: boolean;
  isSubmitting?: boolean;
  defaultValues: { reps: number; weight: number };
  submitButtonText?: ReactNode;
}) {
  const form = useForm<SetInput>({
    resolver: zodResolver(setSchema),
    defaultValues,
  });

  const setOpen = useContext(ToggleDialogFunction);

  const { id } = useContext(WorkoutExerciseContext);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          submitAction(values);
          setOpen(false);
        })}
        className="space-y-4"
      >
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="reps"
            render={({ field }) => (
              <FormItem className="max-w-[43%]">
                <div className="flex items-center gap-2">
                  <FormLabel>Reps</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                </div>
                <FormDescription>
                  The number of repetitions you have done in this set.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Cross2Icon className="mt-[10px]" />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="max-w-[43%]">
                <div className="flex items-center gap-2">
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                </div>
                <FormDescription>
                  The weight you used for this set.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {deleteSet !== undefined && (
          <Button
            variant={"destructive"}
            type="button"
            onClick={() => {
              deleteSet();
              setOpen(false);
            }}
            className="float-left flex justify-center items-center"
          >
            Delete
            {isDeleting && (
              <LoadingSpinner className="ml-1 w-4 h-4 text-background/80 fill-background/80" />
            )}
          </Button>
        )}
        <Button
          type="submit"
          className="float-right flex justify-center items-center"
        >
          {submitButtonText ?? "Submit"}
          {isSubmitting && (
            <LoadingSpinner className="ml-1 w-4 h-4 text-background/80 fill-background/80" />
          )}
        </Button>
      </form>
    </Form>
  );
}
