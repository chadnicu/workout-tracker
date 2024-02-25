import { z } from "zod";
import { exerciseSchema } from "@/lib/validators/exercise";
import { getExercises } from "@/server/exercises";
import { addWorkoutSchema, editWorkoutSchema } from "@/lib/validators/workout";
import { getWorkouts } from "@/server/workouts";
import { setSchema } from "@/lib/validators/set";
import { exerciseCommentSchema } from "@/lib/validators/workout-exercise";
import { getExercisesByWorkoutId } from "@/server/workout-exercise";
import { getSetsByExerciseId, getSetsByWorkoutId } from "@/server/sets";

export type ExerciseInput = z.infer<typeof exerciseSchema>;
export type Exercise = Awaited<ReturnType<typeof getExercises>>[0];

export type AddWorkoutInput = z.infer<typeof addWorkoutSchema>;
export type EditWorkoutInput = z.infer<typeof editWorkoutSchema>;
export type Workout = Awaited<ReturnType<typeof getWorkouts>>[0];

export type SetInput = z.infer<typeof setSchema>;

export type ExerciseSet = Awaited<ReturnType<typeof getSetsByExerciseId>>[0];

export type WorkoutExercises = Awaited<
  ReturnType<typeof getExercisesByWorkoutId>
>;
export type WorkoutExercise = WorkoutExercises["inWorkout"][0];
export type WorkoutSet = Awaited<ReturnType<typeof getSetsByWorkoutId>>[0];
export type CommentInput = z.infer<typeof exerciseCommentSchema>;