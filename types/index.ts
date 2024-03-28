import { z } from "zod";
import { exerciseSchema } from "@/lib/validators/exercise";
import { getExercises } from "@/server/exercises";
import { addWorkoutSchema, editWorkoutSchema } from "@/lib/validators/workout";
import { getWorkouts } from "@/server/workouts";
import { setSchema } from "@/lib/validators/set";
import { exerciseCommentSchema } from "@/lib/validators/workout-exercise";
import { getExercisesByWorkoutId } from "@/server/workout-exercise";
import {
  getAllSets,
  getSetsByExerciseId,
  getSetsByWorkoutId,
} from "@/server/sets";
import { getTemplates } from "@/server/templates";
import { templateSchema } from "@/lib/validators/template";

export type ExerciseInput = z.infer<typeof exerciseSchema>;
export type Exercise = Awaited<ReturnType<typeof getExercises>>[0];

export type AddWorkoutInput = z.infer<typeof addWorkoutSchema>;
export type EditWorkoutInput = z.infer<typeof editWorkoutSchema>;
export type Workout = Awaited<ReturnType<typeof getWorkouts>>[0];

export type SetInput = z.infer<typeof setSchema>;
export type Set = Awaited<ReturnType<typeof getAllSets>>[0];

// export type ExerciseSet = Awaited<ReturnType<typeof getSetsByExerciseId>>[0];

export type WorkoutExercises = Awaited<
  ReturnType<typeof getExercisesByWorkoutId>
>;
export type WorkoutExercise = WorkoutExercises["inWorkout"][0];
// export type WorkoutSet = Awaited<ReturnType<typeof getSetsByWorkoutId>>[0];
export type CommentInput = z.infer<typeof exerciseCommentSchema>;

export type TemplateInput = z.infer<typeof templateSchema>;
export type Template = Awaited<ReturnType<typeof getTemplates>>[0];
