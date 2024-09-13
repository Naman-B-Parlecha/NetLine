// import React from "react";
// import { ArrowRight } from "lucide-react";
// import cls from "./customStyles.module.css";

// interface NetworkSimulatorProps {
//   srcIp: string;
//   destIp: string;
//   protocol: string;
//   timestamp: string;
//   bytes: string;
// }

// export default function Component({
//   srcIp = "192.168.1.1",
//   destIp = "10.0.0.1",
//   protocol = "TCP",
//   timestamp = "2023-06-15 14:30:00",
//   bytes = "450",
// }: NetworkSimulatorProps) {
//   return (
//     <div className="w-full p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold font-mono text-gray-900 mb-4">
//         Router-Sensor Network Logs
//       </h1>
//       <div className={`flex flex-col gap-4 w-full h-[93%] overflow-auto ${cls.scroll}`}>
//         <div className="p-4 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner ">
//           <div className="text-xs text-gray-500 mb-2">{timestamp}</div>
//           <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden p-4 bg-white">
//             <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
//               <h3 className="font-semibold text-lg">
//                 Source IP: <span className="font-normal">{srcIp}</span>
//               </h3>
//             </div>
//             <div className="flex flex-col items-center mx-6 flex-grow">
//               <span className="text-sm text-gray-500 mb-2">{protocol}</span>
//               <div className="w-full h-1 bg-blue-500 relative">
//                 <ArrowRight className="w-8 h-8 text-blue-500 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 transition-transform duration-300 ease-in-out hover:translate-x-4" />
//               </div>
//               <span className="text-sm text-gray-500 mt-2">{bytes} bytes</span>
//             </div>
//             <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
//               <h3 className="font-semibold text-lg">
//                 Destination IP: <span className="font-normal">{destIp}</span>
//               </h3>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner ">
//           <div className="text-xs text-gray-500 mb-2">{timestamp}</div>
//           <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden p-4 bg-white">
//             <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
//               <h3 className="font-semibold text-lg">
//                 Source IP: <span className="font-normal">{srcIp}</span>
//               </h3>
//             </div>
//             <div className="flex flex-col items-center mx-6 flex-grow">
//               <span className="text-sm text-gray-500 mb-2">{protocol}</span>
//               <div className="w-full h-1 bg-blue-500 relative">
//                 <ArrowRight className="w-8 h-8 text-blue-500 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 transition-transform duration-300 ease-in-out hover:translate-x-4" />
//               </div>
//               <span className="text-sm text-gray-500 mt-2">{bytes} bytes</span>
//             </div>
//             <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
//               <h3 className="font-semibold text-lg">
//                 Destination IP: <span className="font-normal">{destIp}</span>
//               </h3>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner ">
//           <div className="text-xs text-gray-500 mb-2">{timestamp}</div>
//           <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden p-4 bg-white">
//             <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
//               <h3 className="font-semibold text-lg">
//                 Source IP: <span className="font-normal">{srcIp}</span>
//               </h3>
//             </div>
//             <div className="flex flex-col items-center mx-6 flex-grow">
//               <span className="text-sm text-gray-500 mb-2">{protocol}</span>
//               <div className="w-full h-1 bg-blue-500 relative">
//                 <ArrowRight className="w-8 h-8 text-blue-500 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 transition-transform duration-300 ease-in-out hover:translate-x-4" />
//               </div>
//               <span className="text-sm text-gray-500 mt-2">{bytes} bytes</span>
//             </div>
//             <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
//               <h3 className="font-semibold text-lg">
//                 Destination IP: <span className="font-normal">{destIp}</span>
//               </h3>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner ">
//           <div className="text-xs text-gray-500 mb-2">{timestamp}</div>
//           <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden p-4 bg-white">
//             <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
//               <h3 className="font-semibold text-lg">
//                 Source IP: <span className="font-normal">{srcIp}</span>
//               </h3>
//             </div>
//             <div className="flex flex-col items-center mx-6 flex-grow">
//               <span className="text-sm text-gray-500 mb-2">{protocol}</span>
//               <div className="w-full h-1 bg-blue-500 relative">
//                 <ArrowRight className="w-8 h-8 text-blue-500 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 transition-transform duration-300 ease-in-out hover:translate-x-4" />
//               </div>
//               <span className="text-sm text-gray-500 mt-2">{bytes} bytes</span>
//             </div>
//             <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
//               <h3 className="font-semibold text-lg">
//                 Destination IP: <span className="font-normal">{destIp}</span>
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

// Mock data - replace this with your actual router data flow data
const mockData = [
  { source: "Router1", target: "Router2", value: 150 },
  { source: "Router1", target: "Router3", value: 80 },
  { source: "Router1", target: "Router4", value: 45 },
  { source: "Router2", target: "Router1", value: 130 },
  { source: "Router2", target: "Router3", value: 95 },
  { source: "Router2", target: "Router4", value: 60 },
  { source: "Router3", target: "Router1", value: 75 },
  { source: "Router3", target: "Router2", value: 100 },
  { source: "Router3", target: "Router4", value: 30 },
  { source: "Router4", target: "Router1", value: 40 },
  { source: "Router4", target: "Router2", value: 55 },
  { source: "Router4", target: "Router3", value: 250 },
];

export default function RouterDataFlowHeatmap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 500 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Get unique router names
      const routers = Array.from(new Set(mockData.map((d) => d.source)));

      // Build X and Y scales
      const x = d3.scaleBand().range([0, width]).domain(routers).padding(0.01);

      const y = d3.scaleBand().range([height, 0]).domain(routers).padding(0.01);

      // Build color scale
      const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateYlOrRd)
        .domain([0, d3.max(mockData, (d) => d.value) || 0]);

      // Create the heatmap cells
      svg
        .selectAll()
        .data(mockData)
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

      // Add title
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Router Data Flow Heatmap");

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
        .domain(colorScale.domain())
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
    <div className="w-full max-h-screen overflow-hidden">
      <Card className="w-full max-w-3xl h-screen border-none outline-none">
        <CardHeader>
          <CardTitle>Router Data Flow Heatmap</CardTitle>
          <CardDescription>
            Visualizing data flow intensity between routers
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <svg
            ref={svgRef}
            className="w-full h-screen"
            aria-label="Router Data Flow Heatmap"
          ></svg>
        </CardContent>
      </Card>
    </div>
  );
}
