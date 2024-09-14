"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, FilterIcon, ClockIcon } from "lucide-react";
import { format } from "date-fns";
import { netflow } from "../constants/netflow";

// Utility function to accumulate the last 25 values per src_ip-dst_ip pair
const accumulateData = (data: any[], filters: FilterOptions) => {
  // Apply filters
  const filteredData = data.filter((d) => {
    const dataDate = new Date(d.timestamp);
    const filterDate = filters.timestamp ? new Date(filters.timestamp) : null;

    const timestampMatch =
      !filterDate ||
      (dataDate >= filterDate &&
        (!filters.time ||
          (dataDate.getHours() === filters.time.getHours() &&
            dataDate.getMinutes() === filters.time.getMinutes())));
    const srcIpMatch = !filters.src_ip || d.src_ip.includes(filters.src_ip);
    const dstIpMatch = !filters.dst_ip || d.dst_ip.includes(filters.dst_ip);
    return timestampMatch && srcIpMatch && dstIpMatch;
  });

  // Consider only the last 100 objects from the filtered data
  const recentData = filteredData.slice(-100);

  const resultMap = new Map();

  recentData.forEach((d) => {
    const key = `${d.src_ip}-${d.dst_ip}`;

    if (!resultMap.has(key)) {
      resultMap.set(key, []);
    }

    const values = resultMap.get(key);
    values.push(d);
    if (values.length > 25) {
      values.shift(); // Keep only the last 25 records per pair
    }

    resultMap.set(key, values);
  });

  // Aggregate in_bytes and out_bytes
  const aggregatedData = Array.from(resultMap.entries()).map(
    ([key, values]) => {
      const totalInBytes = values.reduce(
        (sum: number, v: any) => sum + v.in_bytes,
        0
      );
      const totalOutBytes = values.reduce(
        (sum: number, v: any) => sum + v.out_bytes,
        0
      );

      const [src, dst_ip] = key.split("-");
      return {
        source: src,
        target: dst_ip,
        value: totalInBytes + totalOutBytes,
      }; // Total data flow
    }
  );

  return aggregatedData;
};

interface FilterOptions {
  timestamp: Date | null;
  time: Date | null;
  src_ip: string;
  dst_ip: string;
}

export default function RouterDataFlowHeatmap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    timestamp: null,
    time: null,
    src_ip: "",
    dst_ip: "",
  });

  const updateHeatmap = () => {
    const aggregatedData = accumulateData(netflow, filters);

    if (svgRef.current) {
      d3.select(svgRef.current).selectAll("*").remove();

      const margin = { top: 0, right: 100, bottom: 100, left: 100 };
      const width = 600 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Get unique router names from aggregated data
      const routers = Array.from(
        new Set(
          aggregatedData
            .map((d) => d.source)
            .concat(aggregatedData.map((d) => d.target))
        )
      );

      // Build X and Y scales
      const x = d3.scaleBand().range([0, width]).domain(routers).padding(0.01);
      const y = d3.scaleBand().range([height, 0]).domain(routers).padding(0.01);

      // Build color scale
      const maxDataValue = d3.max(aggregatedData, (d) => d.value) || 1;
      const colorScale = d3
        .scaleSequential(d3.interpolateYlOrRd)
        .domain([0, maxDataValue]);

      // Create the heatmap cells
      svg
        .selectAll()
        .data(aggregatedData)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.source) || 0)
        .attr("y", (d) => y(d.target) || 0)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", (d) => colorScale(d.value))
        .attr("rx", 4)
        .attr("ry", 4);

      // Add X axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      svg.append("g").call(d3.axisLeft(y));

      // Add X axis label
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 20)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Source Router");

      // Add Y axis label
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Destination Router");

      // Add color legend
      const legendWidth = 20;
      const legendHeight = height;
      const legend = svg
        .append("g")
        .attr("transform", `translate(${width + 20}, 0)`);

      const legendScale = d3
        .scaleLinear()
        .domain([0, maxDataValue])
        .range([legendHeight, 0]);

      legend
        .selectAll("rect")
        .data(d3.range(legendHeight))
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i)
        .attr("width", legendWidth)
        .attr("height", 1)
        .style("fill", (d) => colorScale(legendScale.invert(d)));

      const legendAxis = d3
        .axisRight(legendScale)
        .tickSize(legendWidth)
        .ticks(5);

      legend
        .append("g")
        .attr("transform", `translate(${legendWidth}, 0)`)
        .call(legendAxis);

      // Add legend title
      legend
        .append("text")
        .attr("x", legendWidth / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Data Flow");
    }
  };

  useEffect(() => {
    updateHeatmap();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value as string }));
  };

  const handleApplyFilters = () => {
    updateHeatmap();
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const newTime = new Date();
    newTime.setHours(hours, minutes);
    setFilters((prevFilters) => ({ ...prevFilters, time: newTime }));
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <Card className="flex-grow border-none outline-none">
        <CardHeader className="pb-2">
          <CardTitle className="font-mono text-3xl">
            Router Data Flow Heatmap
          </CardTitle>
          <CardDescription>
            Visualizing data flow intensity between routers
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center h-full">
          <div className="w-full mb-4 flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="src_ip">Source IP</Label>
              <Input
                id="src_ip"
                name="src_ip"
                value={filters.src_ip}
                onChange={handleFilterChange}
                placeholder="e.g., 192.168.100"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="dst_ip">Destination IP</Label>
              <Input
                id="dst_ip"
                name="dst_ip"
                value={filters.dst_ip}
                onChange={handleFilterChange}
                placeholder="e.g., 74.125.250"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.timestamp ? (
                    format(filters.timestamp, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.timestamp || undefined}
                  onSelect={(date) =>
                    setFilters((prev) => ({ ...prev, timestamp: date || null }))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-4 w-4" />
              <Input
                type="time"
                value={filters.time ? format(filters.time, "HH:mm") : ""}
                onChange={handleTimeChange}
                className="w-[120px]"
              />
            </div>
            <Button onClick={handleApplyFilters} className="px-8">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="flex-grow w-full overflow-auto flex justify-center items-center px-8">
            <svg
              ref={svgRef}
              className="w-fit h-fit"
              aria-label="Router Data Flow Heatmap"
            ></svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
