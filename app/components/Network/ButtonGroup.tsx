"use client"
import React from "react";
import { useRouter } from "next/navigation";

const ButtonGroup = () => {
  const router = useRouter();
  const refreshHandler = () => {
    router.refresh();
  };
  const TroubleShooterHandler = () => {
  };
  const AdjacencyHandler = () => {
  };

  return (
    <div className="w-full flex gap-4 mt-4">
      <button
        onClick={AdjacencyHandler}
        className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      >
        Check Adjacent Nodes
      </button>
      <button
        onClick={refreshHandler}
        className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      >
        Refresh page
      </button>
      <button
        onClick={TroubleShooterHandler}
        className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      >
        Troubleshoot
      </button>
    </div>
  );
};

export default ButtonGroup;
