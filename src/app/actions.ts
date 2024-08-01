"use server";

import type { PolicyParams, Policy } from "./components/policyForm";

const DEFAULT_INC_YEARS = 40;
const DEFAULT_FUND1_RETURN = 0.03;
const DEFAULT_FUND2_RETURN = 0.035;

export const fetchPolicyData = async (params: PolicyParams) => {
  const { incYears, fund1Return, fund2Return } = params;

  const response = await fetch(
    `http://localhost:5258/policy?incYears=${incYears ?? DEFAULT_INC_YEARS}&fund1Return=${fund1Return ?? DEFAULT_FUND1_RETURN}&fund2Return=${fund2Return ?? DEFAULT_FUND2_RETURN}`,
    {
      cache: "no-store",
    },
  );
  const data: Policy = (await response.json()) as Policy;
  return data;
};
