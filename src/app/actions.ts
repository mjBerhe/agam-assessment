"use server";

import type { PolicyParams, Policy } from "./components/policyForm";

const DEFAULT_INC_YEARS = 40;
const DEFAULT_FUND1_RETURN = 0.03;
const DEFAULT_VOLATILITY_RATE = 0.16;
const DEFAULT_RISK_FREE_RATE = 0.03;
const DEFAULT_FUND_FEE_RATE = 0.0015;
const DEFAULT_FUND1_SIZE = 0.2;

export const fetchPolicyData = async (params: PolicyParams) => {
  const {
    incYears,
    fund1Return,
    volatilityRate,
    riskFreeRate,
    fundFeeRate,
    fund1Size,
  } = params;

  const baseURI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5258"
      : "https://agam-api.azurewebsites.net";

  const URI = `${baseURI}/policy?incYears=${incYears ?? DEFAULT_INC_YEARS}&fund1Return=${fund1Return ?? DEFAULT_FUND1_RETURN}&volatilityRate=${volatilityRate ?? DEFAULT_VOLATILITY_RATE}&riskFreeRate=${riskFreeRate ?? DEFAULT_RISK_FREE_RATE}&fundFeeRate=${fundFeeRate ?? DEFAULT_FUND_FEE_RATE}&fund1Size=${fund1Size ?? DEFAULT_FUND1_SIZE}`;
  console.log(URI);

  const response = await fetch(URI, {
    cache: "no-store",
  });
  const data: Policy = (await response.json()) as Policy;
  return data;
};
