"use client";

import { Progress } from "@/components/ui/progress";
export function AvailabilityStats(data: { data: any[] }) {
  console.log(data);
  return (
    <div className="space-y-4">
      {data.data.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-black" />{" "}
              <span className="text-black">{item.label}</span>{" "}
            </div>
            <span className="text-blue-500">{item.value}%</span>{" "}
          </div>
          <Progress value={item.value} className="h-2 bg-gray-200" />{" "}
        </div>
      ))}
    </div>
  );
}
