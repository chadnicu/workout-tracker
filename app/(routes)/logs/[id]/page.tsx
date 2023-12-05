import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getLogsByExerciseId } from "@/app/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const fallback = (
    <div className="grid w-full place-items-center space-y-3 ">
      <Skeleton className="mb-7 h-12 w-[90vw] md:w-[40vw]" />
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton key={i} className="h-6 w-[70vw] md:w-[30vw]" />
      ))}
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <FetchLogs exerciseId={params.id} />
    </Suspense>
  );
}

async function FetchLogs({ exerciseId }: { exerciseId: string }) {
  const logs = await getLogsByExerciseId(parseInt(exerciseId, 10));

  return (
    <div className="grid place-items-center gap-10">
      <h1 className="text-5xl font-bold">{logs[0]?.exerciseTitle ?? ""}</h1>
      <div>
        {logs.map((e) => (
          <div key={e.id} className="flex gap-5">
            <p className="font-semibold">{e.date.toString().slice(0, 15)}</p>
            <h1>
              {e.reps} x {e.weight}
            </h1>
            <p className="italic">({e.workoutTitle})</p>
            {e.comment && <p>{e.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}