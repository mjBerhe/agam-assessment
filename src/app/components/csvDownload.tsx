"use client";

import CsvDownloader from "react-csv-downloader";
import type { PolicyRecords } from "./policyForm";

const columns = [
  {
    id: "year",
    displayName: "Year",
  },
  {
    id: "age",
    displayName: "Age",
  },
  {
    id: "contribution",
    displayName: "Contribution",
  },
  {
    id: "avPreFee",
    displayName: "AV Pre-Fee",
  },
  {
    id: "fund1PreFee",
    displayName: "Fund1 Pre-Fee",
  },
  {
    id: "fund2PreFee",
    displayName: "Fund2 Pre-Fee",
  },
  {
    id: "fundFees",
    displayName: "M&E/Fund Fees",
  },
  // {
  //   id: "onlyFundFees",
  //   displayname: "Fund Fees",
  // },
  {
    id: "avPreWithdrawal",
    displayName: "AV Pre-Withdrawal ",
  },
  {
    id: "fund1PreWithdrawal",
    displayName: "Fund1 Pre-Withdrawal",
  },
  {
    id: "fund2PreWithdrawal",
    displayName: "Fund2 Pre-Withdrawal",
  },
  {
    id: "withdrawalAmount",
    displayName: "Withdrawal Amount",
  },
  {
    id: "avPostWithdrawal",
    displayName: "AV Post-Withdrawal",
  },
  {
    id: "fund1PostWithdrawal",
    displayName: "Fund1 Post-Withdrawal",
  },
  {
    id: "fund2PostWithdrawal",
    displayName: "Fund2 Post-Withdrawal",
  },
  {
    id: "riderCharge",
    displayName: "Rider Charge",
  },
  {
    id: "avPostCharges",
    displayName: "AV Post-Charges",
  },
  {
    id: "fund1PostCharges",
    displayName: "Fund1 Post-Charges",
  },
  {
    id: "fund2PostCharges",
    displayName: "Fund2 Post-Charges",
  },
  {
    id: "deathPayments",
    displayName: "Death Payments",
  },
  {
    id: "avPostDeathClaims",
    displayName: "AV Post-Death Claims",
  },
  {
    id: "fund1PostDeathClaims",
    displayName: "Fund1 Post-Death Claims",
  },
  {
    id: "fund2PostDeathClaims",
    displayName: "Fund2 Post-Death Claims",
  },
  {
    id: "fund1PostRebalance",
    displayName: "Fund1 Post-Rebalance",
  },
  {
    id: "fund2PostRebalance",
    displayName: "Fund2 Post-Rebalance",
  },
  {
    id: "ropDeathBase",
    displayName: "ROP Death base",
  },
  {
    id: "narDeathClaims",
    displayName: "NAR Death base",
  },
  {
    id: "riderDeathBenefitBase",
    displayName: "Rider Death Benefit base",
  },
  {
    id: "riderWithdrawalBase",
    displayName: "Rider Withdrawal Base",
  },
  {
    id: "riderWithdrawalAmount",
    displayName: "Rider Withdrawal Amount",
  },
  {
    id: "riderCumulativeWithdrawal",
    displayName: "Rider Cumulative Withdrawal",
  },
  {
    id: "riderMaxAnnualWithdrawal",
    displayName: "Rider Maximum Annual Withdrawal",
  },
  {
    id: "riderMaxAnnualWithdrawalRate",
    displayName: "Rider Maximum Annual Withdrawal Rate",
  },
  {
    id: "eligibleStepUp",
    displayName: "Eligible Step-Up",
  },
  {
    id: "growthPhase",
    displayName: "Growth Phase",
  },
  {
    id: "withdrawalPhase",
    displayName: "Withdrawal Phase",
  },
  {
    id: "automaticPeriodicBenefitStatus",
    displayName: "Automatic Periodic Benefit Status",
  },
  {
    id: "lastDeath",
    displayName: "Last Death",
  },
  {
    id: "fund1Return",
    displayName: "Fund1 Return",
  },
  {
    id: "fund2Return",
    displayName: "Fund2 Return",
  },
  {
    id: "rebalanceIndicator",
    displayName: "Rebalance Indicator",
  },
  {
    id: "df",
    displayName: "DF",
  },
  {
    id: "qx",
    displayName: "qx",
  },
  {
    id: "finalDeathClaims",
    displayName: "Death Claims",
  },
  {
    id: "finalWithdrawalClaims",
    displayName: "Withdrawal Claims",
  },
  {
    id: "finalRiderCharges",
    displayName: "Rider Charges",
  },
  {
    id: "finalFundFees",
    displayName: "Fund Fees",
  },
  {
    id: "totalInterestCredited",
    displayName: "Total Interest Credited",
  },
];

export const CSVDownloadButton: React.FC<{ data: PolicyRecords }> = ({
  data,
}) => {
  const policyRecords = data;

  return (
    <div>
      <CsvDownloader
        columns={columns}
        datas={[...policyRecords] as []}
        filename="policyRecords"
        className="flex justify-center rounded-lg border px-8 py-2 hover:bg-slate-800/50"
      >
        Download as CSV
      </CsvDownloader>
    </div>
  );
};
