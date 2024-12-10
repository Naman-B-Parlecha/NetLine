"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Interface 1",
    total: 1200,
  },
  {
    name: "Interface 2",
    total: 900,
  },
  {
    name: "Interface 3",
    total: 700,
  },
];

export function NetworkStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        {/* X-Axis */}
        <XAxis
          dataKey="name"
          stroke="#888888" // Blue axis text
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        {/* Y-Axis */}
        <YAxis
          stroke="#888888" // Blue axis text
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        {/* Bars */}
        <Bar
          dataKey="total"
          fill="#3b82f6" // Blue bars
          radius={[4, 4, 0, 0]} // Rounded top corners
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
