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
import { Textarea } from "./ui/textarea";
import { ExerciseContext } from "@/app/exercises/helpers";
import { ExerciseFormData, exerciseSchema } from "@/app/exercises/helpers";
import LoadingSpinner from "./loading-spinner";
import { ToggleDialogFunction } from "./responsive-form-dialog";
import { ReactNode, useContext } from "react";

export default function ExerciseForm({
  mutate,
  isSubmitting,
  submitButtonText,
}: {
  mutate: (values: ExerciseFormData) => void;
  isSubmitting?: boolean;
  submitButtonText?: ReactNode;
}) {
  const { title, instructions, url } = useContext(ExerciseContext);

  const form = useForm<ExerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: { title, instructions: instructions ?? "", url: url ?? "" },
  });

  const setOpen = useContext(ToggleDialogFunction);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          mutate(values);
          setOpen(false);
        })}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Bench Press" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your exercise.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Retract your scapula, arch your back, lower slowly then press back up"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                These are the instructions for your exercise.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the URL to your exercise&apos;s YouTube video.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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