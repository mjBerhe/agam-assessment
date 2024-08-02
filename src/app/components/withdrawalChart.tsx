"use client";

import type { Policy } from "./policyForm";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  withdrawals: {
    label: "Withdrawal Amount",
  },
  withdrawalAmount: {
    label: "Withdrawal Amount",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const WithdrawalChart: React.FC<{ data: Policy }> = ({ data }) => {
  const chartData = [
    ...data.policyRecords.map((x) => ({
      date: x.year,
      withdrawalAmount: x.withdrawalAmount,
    })),
  ];

  return (
    <div>
      <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <h1 className="text-lg font-bold">Withdrawal Amount ($) vs Years</h1>
          <span className="text-sm">
            over last {data.policyRecords.length - 1} years
          </span>
        </div>
        <div className="flex">
          <div className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-sm">Present Value WB Claims</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {Math.round(data.cumulativeWithdrawalClaims).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={40}
              tickFormatter={(value: string) => value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[200px] bg-slate-700/80"
                  nameKey="withdrawals"
                  labelFormatter={(value: string, x: unknown) => {
                    // @ts-expect-error payload is being weird but I know it exists
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    return `Year: ${x[0].payload.date ?? ""}`;
                  }}
                />
              }
            />
            <Bar
              dataKey="withdrawalAmount"
              fill={`var(--color-${`withdrawalAmount`})`}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};