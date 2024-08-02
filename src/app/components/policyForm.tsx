"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { fetchPolicyData } from "../actions";
import { CSVDownloadButton } from "./csvDownload";
import { WithdrawalChart } from "./withdrawalChart";
import { ReductionChart } from "./reductionChart";
import { Fund2ReturnsChart } from "./fund2ReturnsChart";
import { AccountValueChart } from "./accountValueChart";
import { RiderDeathBenefitBaseChart } from "./riderDeathBenefitBaseChart";

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
  initialAge?: number;
  qxMultiplier?: number;
  fund1Return?: number;
  volatilityRate?: number;
  riskFreeRate?: number;
  fundFeeRate?: number;
  fund1Size?: number;
};

export const PolicyForm: React.FC = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState<Policy>();

  const [initialAge, setInitialAge] = useState<string>("60");
  const [mortalityMultiplier, setMortalityMultiplier] = useState<string>("1");

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
    if (
      !initialAge ||
      !mortalityMultiplier ||
      !fund1Return ||
      !volatilityRate ||
      !riskFreeRate ||
      !fundFeeRate ||
      !fund1Size
    ) {
      setError("One or more input field is empty/invalid");
      return;
    }
    if (parseFloat(initialAge) < 40 || parseFloat(initialAge) > 80) {
      setError("Please ensure starting age is between 40 and 80");
      return;
    }
    if (parseFloat(volatilityRate) < 0) {
      setError("Please ensure fund 2 volatility is at least 0%");
      return;
    }
    if (parseFloat(mortalityMultiplier) < 0) {
      setError("Please ensure mortalility multiplier is at least 0%");
      return;
    }
    if (parseFloat(fund1Return) < 0) {
      setError("Please ensure fund 1 return is at least 0%");
      return;
    }
    if (parseFloat(riskFreeRate) < 0) {
      setError("Please ensure risk free rate is at least 0%");
      return;
    }
    if (parseFloat(fundFeeRate) < 0) {
      setError("Please ensure fund fee rate is at least 0%");
      return;
    }

    setError("");
    mutation.mutate({
      initialAge: Math.round(parseInt(initialAge)),
      qxMultiplier: Math.round(parseInt(mortalityMultiplier)),
      fund1Return: parseFloat(fund1Return) / 100,
      volatilityRate: parseFloat(volatilityRate) / 100,
      riskFreeRate: parseFloat(riskFreeRate) / 100,
      fundFeeRate: parseFloat(fundFeeRate) / 100,
      fund1Size: parseFloat(fund1Size) / 100,
    });
  };

  const handleFundSize = (amount: string) => {
    const x = parseFloat(amount);
    if (x <= 100 && x >= 0) {
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
      <div className="flex w-full justify-center space-x-12">
        <div className="flex w-[150px] flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Starting Age</label>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                value={initialAge}
                onChange={(e) => setInitialAge(e.currentTarget.value)}
                className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Mortality Multiplier</label>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                step={0.1}
                value={mortalityMultiplier}
                onChange={(e) => setMortalityMultiplier(e.currentTarget.value)}
                className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex w-[150px] flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Fund 1 Return</label>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                step={0.1}
                value={fund1Return}
                onChange={(e) => setFund1Return(e.currentTarget.value)}
                className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
              />
              <span className="text-lg">%</span>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Fund 2 Volatility</label>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                step={0.1}
                value={volatilityRate}
                onChange={(e) => setFundVolatilityRate(e.currentTarget.value)}
                className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
              />
              <span className="text-lg">%</span>
            </div>
          </div>
        </div>

        <div className="flex w-[150px] flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Fund 1 Distribution</label>
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
            <label className="font-medium">Fund 2 Distribution</label>
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

        <div className="flex w-[150px] flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Risk Free Rate</label>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                step={0.1}
                value={riskFreeRate}
                onChange={(e) => setRiskFreeRate(e.currentTarget.value)}
                className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
              />
              <span className="text-lg">%</span>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Fund Fee Rate</label>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                step={0.01}
                value={fundFeeRate}
                onChange={(e) => setFundFeeRate(e.currentTarget.value)}
                className="w-[80px] rounded-lg bg-slate-600 px-3 py-1.5 text-lg text-white"
              />
              <span className="text-lg">%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-y-2">
        {error && <span className="text-red-300">{error}</span>}
        <button
          onClick={handleClick}
          className="flexjustify-center rounded-lg border px-8 py-2 hover:bg-slate-800/50"
        >
          Calculate
        </button>
      </div>

      {data && (
        <div className="mt-8 flex w-full flex-col items-center border-t border-slate-600 pt-8">
          <div className="flex w-full justify-evenly">
            <div className="flex w-full max-w-[300px] flex-col items-center justify-center">
              <h1 className="text-3xl font-bold">Results</h1>
              <span className="text-gray-400">100k initial premium</span>
              <div className="mt-4 flex w-full flex-col gap-y-2">
                <div className="flex w-full items-center">
                  <span className="text-lg">PV DB Claim:</span>
                  <span className="ml-auto text-2xl font-bold">
                    {Math.round(data?.cumulativeDeathClaims).toLocaleString()}
                  </span>
                </div>

                <div className="flex w-full items-center">
                  <span className="text-lg">PV WB Claim:</span>
                  <span className="ml-auto text-2xl font-bold">
                    {Math.round(
                      data?.cumulativeWithdrawalClaims,
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex w-full items-center">
                  <span className="text-lg">PV RC:</span>
                  <span className="ml-auto text-2xl font-bold">
                    {Math.round(data?.cumulativeRiderCharges).toLocaleString()}
                  </span>
                </div>

                <div className="flex w-full items-center">
                  <span className="text-lg">PV Fund Fees:</span>
                  <span className="ml-auto text-2xl font-bold">
                    {Math.round(data?.cumulativeFundFees).toLocaleString()}
                  </span>
                </div>

                <div className="mt-4 flex w-full justify-center">
                  <CSVDownloadButton data={data.policyRecords} />
                </div>
              </div>
            </div>

            <div className="flex w-full max-w-[650px]">
              <TabGroup>
                <TabList className="flex gap-x-3">
                  <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                    Account Value
                  </Tab>
                  <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                    Death Benefit Base
                  </Tab>
                  <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                    Fund 2 Returns
                  </Tab>
                  <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                    Withdrawals
                  </Tab>
                  <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                    Reductions
                  </Tab>
                </TabList>
                <TabPanels className="mt-3">
                  <TabPanel>
                    <AccountValueChart data={data} />
                  </TabPanel>
                  <TabPanel>
                    <RiderDeathBenefitBaseChart data={data} />
                  </TabPanel>
                  <TabPanel>
                    <Fund2ReturnsChart data={data} />
                  </TabPanel>
                  <TabPanel>
                    <WithdrawalChart data={data} />
                  </TabPanel>
                  <TabPanel>
                    <ReductionChart data={data} />
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
