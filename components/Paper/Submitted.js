import React from "react";
import { useRouter } from "next/router";

export default function Submitted() {
  const router = useRouter();
    const { student } = router.query;
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-700 p-8 rounded-lg">
      <h1 className="text-4xl font-bold text-zinc-100">Paper Submitted</h1>
      <button
        className="bg-zinc-100 text-zinc-700 font-bold py-2 px-4 rounded mt-6"
        onClick={() => router.push(`/student`)}
      >
        Go Back
      </button>
    </div>
  );
}
