"use client";

import { Set } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Logs() {
  const queryClient = useQueryClient();

  function queryLogs() {
    const data = queryClient.getQueryData(["logs"]);
    if (!data) return [];
    return data as (Set & {
      title: string;
      exerciseId: number;
    })[];
  }

  const { data: logs } = useQuery({
    queryKey: ["logs"],
    queryFn: queryLogs,
    initialData: () => queryLogs(),
  });

  return (
    <div className="grid h-full w-full grid-cols-1 items-end gap-5 space-y-10 p-10 lg:grid-cols-4 xl:grid-cols-5">
      {!logs.length && <p>you have no logs</p>}
      {logs
        .filter(
          (item, i, arr) =>
            arr.findIndex((each) => each.title === item.title) === i
        )
        .sort((a, b) => a.title?.localeCompare(b.title))
        .map((e) => (
          <div
            key={e.id}
            className="grid h-fit place-items-center gap-5 border px-7 py-5"
          >
            <HoverLog log={e} />
            {/* <Link
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-lg font-bold"
              )}
              href={`/logs/${e.exerciseId}`}
            >
              {e.title}
            </Link> */}
          </div>
        ))}
    </div>
  );
}

function HoverLog({
  log,
}: {
  log: Set & {
    title: string;
    exerciseId: number;
  };
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          href={`/logs/${log.exerciseId}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "px-0 py-3 text-left text-xl font-bold"
          )}
        >
          {log.title}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-fit max-w-xs justify-between space-x-4 space-y-1">
        {/* <p className="text-sm">{log?.description || "No description"}</p> */}
        {/* aici o sa pun last sets sau c */}
      </HoverCardContent>
    </HoverCard>
  );
}
