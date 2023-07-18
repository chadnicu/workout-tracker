import { removeExerciseFromSession } from "@/app/actions";
import AddButton from "@/components/AddButton";
import ComboBox from "@/components/ComboBox";
import ComboboxDemo from "@/components/ComboBox";
import CoolView from "@/components/CoolView";
import { DeleteButton } from "@/components/DeleteButton";
import RemoveButton from "@/components/RemoveButton";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { exercise, exercise_session, session } from "@/lib/schema";
import { db } from "@/lib/turso";
import { auth } from "@clerk/nextjs";
import { and, eq, notInArray } from "drizzle-orm";
import Session from "./Session";

export default async function Page({ params }: { params: { id: string } }) {
  const sessionId = parseInt(params.id, 10);

  const currentSession = await db
    .select()
    .from(session)
    .where(eq(session.id, sessionId))
    .limit(1)
    .get();

  const exercises = await db
    .select()
    .from(exercise_session)
    .innerJoin(exercise, eq(exercise_session.exerciseId, exercise.id))
    .where(eq(exercise_session.sessionId, sessionId))
    .all()
    .then((data) => data.map(({ exercise }) => exercise));

  // const exerciseIds = await db
  //   .select()
  //   .from(exercise_session)
  //   .where(eq(exercise_session.sessionId, sessionId))
  //   .all()
  //   .then((data) => (data.length !== 0 ? data.map((e) => e.exerciseId) : [-1]));

  const exerciseIds = exercises.length ? exercises.map((e) => e.id) : [-1];

  const { userId } = auth();

  const other = await db
    .select()
    .from(exercise)
    .where(
      and(
        eq(exercise.userId, userId ?? "niger"),
        notInArray(exercise.id, exerciseIds)
      )
    )
    .all();

  return (
    // <div className="p-10 text-center">
    //   <h1 className="text-5xl font-bold">{currentSession.title}</h1>

    //   <div className="mt-10 flex justify-around gap-5">
    //     <div className="grid gap-2">
    //       {exercises.map((e) => (
    //         <div key={e.id}>
    //           <div className="flex items-center justify-between gap-10 border px-7 py-5">
    //             <div className="text-left">
    //               <HoverExercise data={e} />
    //             </div>
    //             <div className="">
    //               <DeleteButton
    //                 // mutate={async () =>
    //                 //   await removeExerciseFromSession(e.id, sessionId)
    //                 // }
    //                 fromServer={{ exerciseId: e.id, sessionId }}
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>

    //     <ComboBox
    //       exercises={other.map((e, i) => ({
    //         value: e.title,
    //         label: e.title,
    //         // label: `${i + 1}. ${e.title}`,
    //         exerciseId: e.id,
    //         sessionId: sessionId,
    //       }))}
    //     />
    //   </div>
    // </div>
    <Session
      currentSession={currentSession}
      exercises={exercises}
      other={other}
    />
  );
}
