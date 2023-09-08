import {
  getCurrentWorkout,
  getExercisesByWorkoutId,
  getLastSets,
} from "@/app/(pages)/actions";
import Workout from "./Workout";

export default async function Page({ params }: { params: { id: string } }) {
  const workoutId = parseInt(params.id, 10);
  const currentWorkout = await getCurrentWorkout(workoutId);
  const exercises = await getExercisesByWorkoutId(workoutId);
  // const sets = await getSets();
  // const last = await getLastSets(workoutId);

  return (
    <Workout
      workout={currentWorkout}
      initialExercises={exercises}
      // initialSets={sets}
      // lastSets={last}
    />
  );
}