interface Policy {
  age: number;
  fundFees: number;
}

export default async function PolicyItem({ id }: { id: string }) {
  const response = await fetch(
    `https://agam-api.azurewebsites.net/policyItem?years=60`,
  );
  const data: Policy = (await response.json()) as Policy;

  console.log(data);

  return (
    <div className="flex flex-col">
      <span>age: {data.age}</span>
      <span>fund fees: {data.fundFees}</span>
    </div>
  );
}
