"use client";

import React, { useEffect, useRef, useState } from "react";
import cls from "./console.module.css";
import { formatDate } from "@/app/lib/timeFormatter";

interface DataItem {
  consoleMessage: string;
  timestamp: string;
  index: number;
  routerID: string;
}

const Console = ({ logs }: { logs: DataItem[] }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const fetchData = async () => {
    // try {
    //   const response = await fetch("xyz"); // Make sure "xyz" is a valid endpoint
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   const result: DataItem[] = await response.json();
    //   setData(result);
    //   console.log("New data fetched:", result);
    // } catch (err) {
    //   setError((err as Error).message);
    //   console.error("Failed to fetch data:", err);
    // }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 15000);

    return () => clearInterval(intervalId);
  }, []); // No dependencies, runs only once

  return (
    <aside className="w-1/4 bg-white p-3 border-l-2 border-blue-500/20">
      <h2 className="font-bold mb-4 text-2xl">Console</h2>
      <div
        className={`w-full flex flex-col gap-2 max-h-[40rem] overflow-auto ${cls["hidden-scrollbar"]}`}
        ref={consoleRef}
      >
        {logs?.length > 0 &&
          logs.map((l) => (
            <div
              key={l.index}
              className="bg-blue-500/95 text-white w-full p-2 rounded-md whitespace-pre-line"
            >
              {`${formatDate(l.timestamp)} : \n${l.routerID} - ${
                l.consoleMessage
              }`}
            </div>
          ))}
      </div>
    </aside>
  );
};

export default Console;
