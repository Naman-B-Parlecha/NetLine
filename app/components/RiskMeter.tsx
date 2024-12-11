"use client"

import * as React from "react"
import { Progress } from "@/components/ui/riskProgress"

interface RiskMeterProps {
  value: number
  className?: string
}

export function RiskMeter({ value, className }: RiskMeterProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className={`relative ${className}`}>
      <div className="h-2 w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full" />
      <Progress
        value={progress}
        className="absolute top-0 left-0 h-2 w-full bg-transparent"
      />
      <div
        className="absolute top-0 h-2 w-1 -ml-0.5 bg-black"
        style={{ left: `${progress}%` }}
      />
      <span
        className="absolute top-2 -ml-2 text-sm font-medium"
        style={{ left: `${progress}%` }}
      >
        {progress}%
      </span>
    </div>
  )
}

