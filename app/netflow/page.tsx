"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { netflow } from "../constants/netflow";

// Utility function to accumulate the last 25 values per src_ip-dst_ip pair
const accumulateData = (data: any[]) => {
  // Consider only the last 50 objects from the data
  const recentData = data.slice(-100);
  
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
  const aggregatedData = Array.from(resultMap.entries()).map(([key, values]) => {
    const totalInBytes = values.reduce((sum: number, v: any) => sum + v.in_bytes, 0);
    const totalOutBytes = values.reduce((sum: number, v: any) => sum + v.out_bytes, 0);

    const [src, dst_ip] = key.split("-");
    return { source: src, target: dst_ip, value: (totalInBytes + totalOutBytes) }; // Total data flow
  });

  console.log(aggregatedData);

  return aggregatedData;
};


export default function RouterDataFlowHeatmap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const aggregatedData = accumulateData(netflow);

    if (svgRef.current) {
      const margin = { top: 50, right: 100, bottom: 100, left: 100 };
      const width = 600 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Get unique router names from aggregated data
      const routers = Array.from(
        new Set(aggregatedData.map((d) => d.source).concat(aggregatedData.map((d) => d.target)))
      );

      // Build X and Y scales
      const x = d3.scaleBand().range([0, width]).domain(routers).padding(0.01);
      const y = d3.scaleBand().range([height, 0]).domain(routers).padding(0.01);

      // Build color scale
      const maxDataValue = d3.max(aggregatedData, (d) => d.value) || 1; // Ensure domain is not zero
      console.log('Max Data Value:', maxDataValue); // Debugging statement

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
        .style("fill", (d) => {
          const fillColor = colorScale(d.value);
          console.log('Fill Color:', fillColor, 'Value:', d.value); // Debugging statement
          return fillColor;
        })
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

      // Add title
      // svg
      //   .append("text")
      //   .attr("x", width / 2)
      //   .attr("y", -margin.top / 2)
      //   .attr("text-anchor", "middle")
      //   .style("font-size", "16px")
      //   .style("font-weight", "bold")
      //   .text("Router Data Flow Heatmap");

      // Add X axis label
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Source Router");

      // Add Y axis label
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
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
  }, []);

  return (
    <div className="w-full max-h-screen overflow-hidden ">
      <Card className="w-full h-screen border-none outline-none">
        <CardHeader className="w-full">
          <CardTitle className="font-mono text-3xl">Router Data Flow Heatmap</CardTitle>
          <CardDescription>
            Visualizing data flow intensity between routers
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex justify-center items-center">
          <svg
            ref={svgRef}
            className="w-fit h-fit"
            aria-label="Router Data Flow Heatmap"
          ></svg>
        </CardContent>
      </Card>
    </div>
  );
}
