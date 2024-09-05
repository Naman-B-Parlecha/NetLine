"use client";

import React, { useEffect, useState } from "react";

interface DataItem {
  id: number;
  message: string;
}

const Console = ({ count }: { count: number }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("xyz");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: DataItem[] = await response.json();
      setData(result);
      console.log("New data fetched:", result);
    } catch (err) {
      setError((err as Error).message);
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 15000);

    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <aside className="w-1/5 bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Console</h2>
      {/* {error && <p>Error: {error}</p>}
      {data && data.map((d) => <p key={d.id}>{d.message}</p>)} */}
      {count}
    </aside>
  );
};

export default Console;
