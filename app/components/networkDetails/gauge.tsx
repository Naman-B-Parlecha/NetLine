"use client"

export function Gauge({
  value,
  size = "large",
}: {
  value: number
  size?: "small" | "large"
}) {
  const dimensions = size === "small" ? 100 : 150
  const strokeWidth = size === "small" ? 8 : 12
  const radius = (dimensions - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative">
      <svg
        className="transform -rotate-90"
        width={dimensions}
        height={dimensions}
      >
        <circle
          className="text-muted-foreground/20"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={dimensions / 2}
          cy={dimensions / 2}
        />
        <circle
          className="text-primary transition-all duration-300 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (value / 100) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={dimensions / 2}
          cy={dimensions / 2}
        />
      </svg>
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center ${
          size === "small" ? "text-2xl" : "text-3xl"
        }`}
      >
        <span className="font-bold">{value}%</span>
        <span className="text-xs text-muted-foreground">Up</span>
      </div>
    </div>
  )
}

