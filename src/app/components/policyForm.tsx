"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { fetchPolicyData } from "../actions";
import { CSVDownloadButton } from "./csvDownload";

export type Policy = {
  age: number;
  cumulativeDeathClaims: number;
  cumulativeWithdrawalClaims: number;
  cumulativeRiderCharges: number;
  cumulativeFundFees: number;
  policyRecords: PolicyRecords;
};

export type PolicyRecords = {
  year: number;
  age: number;
  contribution: number;
  avPreFee: number;
  fund1PreFee: number;
  fund2PreFee: number;
  fundFees: number;
  onlyFundFees: number;
  avPreWithdrawal: number;
  fund1PreWithdrawal: number;
  fund2PreWithdrawal: number;
  withdrawalAmount: number;
  avPostWithdrawal: number;
  fund1PostWithdrawal: number;
  fund2PostWithdrawal: number;
  riderCharge: number;
  avPostCharges: number;
  fund1PostCharges: number;
  fund2PostCharges: number;
  deathPayments: number;
  avPostDeathClaims: number;
  fund1PostDeathClaims: number;
  fund2PostDeathClaims: number;
  fund1PostRebalance: number;
  fund2PostRebalance: number;
  ropDeathBase: number;
  narDeathClaims: number;
  riderDeathBenefitBase: number;
  riderWithdrawalBase: number;
  riderWithdrawalAmount: number;
  riderCumulativeWithdrawal: number;
  riderMaxAnnualWithdrawal: number;
  riderMaxAnnualWithdrawalRate: number;
  eligibleStepUp: number;
  growthPhase: number;
  withdrawalPhase: number;
  automaticPeriodicBenefitStatus: number;
  lastDeath: number;
  fund1Return: number;
  fund2Return: number;
  rebalanceIndicator: number;
  df: number;
  qx: number;
  finalDeathClaims: number;
  finalWithdrawalClaims: number;
  finalRiderCharges: number;
  finalFundFees: number;
  fund1InterestCredited: number;
  fund2InterestCredited: number;
  totalInterestCredited: number;
}[];

export type PolicyParams = {
  incYears?: number;
  fund1Return?: number;
  volatilityRate?: number;
  riskFreeRate?: number;
  fundFeeRate?: number;
  fund1Size?: number;
};

export const PolicyForm: React.FC = () => {
  const [data, setData] = useState<Policy>();

  const [fund1Return, setFund1Return] = useState<string>("3");
  const [fund1Size, setFund1Size] = useState<string>("20");
  const [fund2Size, setFund2Size] = useState<string>("80");

  const [volatilityRate, setFundVolatilityRate] = useState<string>("16");
  const [riskFreeRate, setRiskFreeRate] = useState<string>("3");
  const [fundFeeRate, setFundFeeRate] = useState<string>("0.15");

  const mutation = useMutation({
    mutationFn: (params: PolicyParams) => fetchPolicyData({ ...params }),
    onSuccess: (data) => setData(data),
  });

  const handleClick = () => {
    mutation.mutate({
      incYears: 40,
      fund1Return: parseFloat(fund1Return) / 100,
      volatilityRate: parseFloat(volatilityRate) / 100,
      riskFreeRate: parseFloat(riskFreeRate) / 100,
      fundFeeRate: parseFloat(fundFeeRate) / 100,
      fund1Size: parseFloat(fund1Size) / 100,
    });
  };

  const handleFundSize = (amount: string) => {
    const x = parseFloat(amount);
    if (x < 100 && x >= 0) {
      setFund1Size(x.toString());
      setFund2Size((100 - x).toString());
    }
    if (!x) {
      setFund1Size("0");
      setFund2Size("100");
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full justify-center gap-x-12">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <label className="text-base font-medium">Fund 1 Return</label>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                value={fund1Return}
                onChange={(e) => setFund1Return(e.currentTarget.value)}
                className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
              />
              <span className="text-lg">%</span>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-base font-medium">Fund 2 Volatility</label>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                value={volatilityRate}
                onChange={(e) => setFundVolatilityRate(e.currentTarget.value)}
                className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
              />
              <span className="text-lg">%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <label className="text-base font-medium">Fund 1 Distribution</label>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                value={fund1Size}
                onChange={(e) => handleFundSize(e.currentTarget.value)}
                className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
              />
              <span className="text-lg">%</span>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-base font-medium">Fund 2 Distribution</label>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                value={fund2Size}
                // onChange={(e) => handleFundSize("fund2", e.currentTarget.value)}
                className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white disabled:opacity-50"
                disabled
              />
              <span className="text-lg">%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="text-lg font-medium">Risk Free Rate</label>
          <div className="flex items-center gap-x-2">
            <input
              type="number"
              value={riskFreeRate}
              onChange={(e) => setRiskFreeRate(e.currentTarget.value)}
              className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
            />
            <span className="text-lg">%</span>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="text-lg font-medium">Fund Fee Rate</label>
          <div className="flex items-center gap-x-2">
            <input
              type="number"
              value={fundFeeRate}
              onChange={(e) => setFundFeeRate(e.currentTarget.value)}
              className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
            />
            <span className="text-lg">%</span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <button
          onClick={handleClick}
          className="flex justify-center rounded-lg border px-8 py-2 hover:bg-slate-800/50"
        >
          Calculate
        </button>
      </div>
      {data && (
        <div className="mt-8 flex w-full flex-col items-center border-t border-slate-600 pt-8">
          <div className="text-xl">Policy for age 60-{data.age}</div>
          <span>age: {data?.age}</span>
          <span>PV DB Claim: {Math.round(data?.cumulativeDeathClaims)}</span>
          <span>
            PV WB Claim: {Math.round(data?.cumulativeWithdrawalClaims)}
          </span>
          <span>PV RC: {Math.round(data?.cumulativeRiderCharges)}</span>
          <span>PV Fund Fees: {Math.round(data?.cumulativeFundFees)}</span>

          <div className="mt-4">
            <CSVDownloadButton data={data.policyRecords} />
          </div>
        </div>
      )}
    </div>
  );
};
