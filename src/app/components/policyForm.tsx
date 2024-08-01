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
}[];

export type PolicyParams = {
  incYears?: number;
  fund1Return?: number;
  fund2Return?: number;
};

export const PolicyForm: React.FC = () => {
  const [data, setData] = useState<Policy>();

  const [fund1Return, setFund1Return] = useState<string>("3");
  const [fund2Return, setFund2Return] = useState<string>("3");

  const mutation = useMutation({
    mutationFn: (params: PolicyParams) => fetchPolicyData({ ...params }),
    onSuccess: (data) => setData(data),
  });

  const handleClick = () => {
    mutation.mutate({
      fund1Return: parseFloat(fund1Return) / 100,
      fund2Return: parseFloat(fund1Return) / 100,
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full justify-center gap-x-12">
        <div className="flex flex-col gap-y-2">
          <label className="text-lg font-medium">Fund 1 Return</label>
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
          <label className="text-lg font-medium">Fund 2 Return</label>
          <div className="flex items-center gap-x-2">
            <input
              type="number"
              value={fund2Return}
              onChange={(e) => setFund2Return(e.currentTarget.value)}
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

          <div className="mt-4">
            <CSVDownloadButton data={data.policyRecords} />
          </div>
        </div>
      )}
    </div>
  );
};
