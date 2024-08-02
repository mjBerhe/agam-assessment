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
  reductions: {
    label: "Reduction Amount",
  },
  reductionAmount: {
    label: "Account Reduction Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const ReductionChart: React.FC<{ data: Policy }> = ({ data }) => {
  const chartData = [
    ...data.policyRecords.map((x) => ({
      date: x.year,
      reductionAmount: Math.round(
        x.fundFees + x.riderCharge + x.deathPayments + x.withdrawalAmount,
      ),
    })),
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:h-[120px] sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:w-[350px] sm:py-6">
          <h1 className="text-lg font-bold">Account Reduction ($) vs Years</h1>
          <span className="text-sm text-gray-400">
            *includes fund fees, death payments, rider charges and withdrawals
          </span>
        </div>
        <div className="flex sm:w-[225px]">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-sm">Present Value RC Claims</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {Math.round(data.cumulativeRiderCharges).toLocaleString()}
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
              minTickGap={45}
              tickFormatter={(value: string) => value}
            />
            <YAxis tickMargin={8} width={45} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[200px] bg-slate-700/80"
                  nameKey="reductions"
                  labelFormatter={(value: string, x: unknown) => {
                    // @ts-expect-error payload is being weird but I know it exists
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    return `Year: ${x[0].payload.date ?? ""}`;
                  }}
                />
              }
            />
            <Bar
              dataKey="reductionAmount"
              fill={`var(--color-${`reductionAmount`})`}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
