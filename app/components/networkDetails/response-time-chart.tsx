"use client"

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    time: "00:00",
    value: 50,
  },
  {
    time: "03:00",
    value: 55,
  },
  {
    time: "06:00",
    value: 45,
  },
  {
    time: "09:00",
    value: 65,
  },
  {
    time: "12:00",
    value: 60,
  },
  {
    time: "15:00",
    value: 75,
  },
  {
    time: "18:00",
    value: 55,
  },
  {
    time: "21:00",
    value: 45,
  },
  {
    time: "24:00",
    value: 50,
  },
]

export function ResponseTimeChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="time"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}ms`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

