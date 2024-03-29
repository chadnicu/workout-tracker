"use client";

import ExerciseCard from "@/components/ExerciseCard";
import { useQuery } from "@tanstack/react-query";
import { getExercises } from "@/app/actions";
import ExerciseSkeleton from "@/components/ExerciseSkeleton";

export default function Exercises() {
  const { data, isFetched } = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => getExercises(),
  });

  if (!isFetched)
    return (
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 10 }, (_, i) => (
          <ExerciseSkeleton key={i} />
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 xl:grid-cols-3">
      {!data?.length && <p>you have no exercises</p>}
      {data?.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}
