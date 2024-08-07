import Link from "next/link";

import { PolicyForm } from "./components/policyForm";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      <div className="container flex flex-col items-center gap-12 px-4 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
          Agam Assessment
        </h1>
        <PolicyForm />
      </div>
    </main>
  );
}
