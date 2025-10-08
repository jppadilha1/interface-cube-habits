"use client";

import { SnowflakeIcon } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A horizontal bar chart";

const chartData = [
  { habit: "Ler 20 minutos", streak: 186 },
  { habit: "Beber 3l d'água", streak: 305 },
  { habit: "Treinar 1hr", streak: 237 },
];

const chartConfig = {
  streak: {
    label: "Days",
    color: "#0288d1",
  },
} satisfies ChartConfig;

export default function AllHabitsChart() {
  return (
    <Card className="mt-10 w-[100%] lg:w-[60%] bg-[#1c1c1c] text-cyan-50 border-none">
      <CardHeader>
        <CardTitle className="text-2xl">Your Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
            }}
          >
            <XAxis type="number" dataKey="streak" hide />
            <YAxis
              dataKey="habit"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={120}
              tick={{ fill: "#e0f7fa", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="streak" fill="#0288d1" radius={5}>
              <LabelList
                dataKey="streak"
                position="insideRight"
                fill="#e0f7fa"
                fontSize={14}
                fontWeight="bold"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Stay consistent, make habits unbreakable!
          <SnowflakeIcon className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          You're tracking 3 habits right now
        </div>
      </CardFooter>
    </Card>
  );
}
