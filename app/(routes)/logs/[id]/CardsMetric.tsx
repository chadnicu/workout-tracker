"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Set } from "@/lib/types";

function averages(logs: Set[]) {
  let averageReps = 0,
    averageWeight = 0;

  logs.map((log) => {
    averageReps += log.reps ?? 0;
    averageWeight += log.weight ?? 0;
  });

  return [averageReps, averageWeight];
}

export default function CardsMetric({ logs }: { logs: Set[] }) {
  const [avgReps, avgWeight] = averages(logs);
  const [lastReps, lastWeight] = [
    logs[logs.length - 1].reps ?? 0,
    logs[logs.length - 1].weight ?? 0,
  ];

  return (
    <Card>
      <CardHeader className="text-left">
        <CardTitle>Exercise reps and weight graph</CardTitle>
        <CardDescription>
          Your weight is {lastWeight <= avgWeight && "not"} ahead of where it
          normally is
          {lastReps > avgReps
            ? `, and ${
                lastWeight <= avgWeight ? "neither" : "so"
              } are your reps.`
            : `, but your reps are${lastWeight > avgWeight ? " not" : ""}.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={logs}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="grid grid-cols-2 gap-2 rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Reps
                          </span>
                          <span className="font-bold">{payload[1].value}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Weight
                          </span>
                          <span className="font-bold">{payload[0].value}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="natural"
                dataKey="weight"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "hsl(178, 100%, 44%)" },
                }}
                style={{
                  stroke: "hsl(178, 100%, 44%)",
                }}
              />
              <Line
                type="natural"
                dataKey="reps"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "hsl(209, 100%, 47%)" },
                }}
                style={{
                  stroke: "hsl(209, 100%, 47%)",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
