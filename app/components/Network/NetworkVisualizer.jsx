"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
const NetworkGraph = ({
  nodesData,
  linksData,
  selectedNode,
  setSelectedNode,
  showAdjacency,
}) => {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: {},
  });

  useEffect(() => {
    const width = 900;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation(nodesData)
      .force(
        "link",
        d3.forceLink(linksData).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(20));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(linksData)
      .join("line")
      .attr("stroke-width", 2)
      .attr("stroke", "#aaa");

    const node = svg
      .append("g")
      .selectAll("image")
      .data(nodesData)
      .join("image")
      .attr("href", (d) => {
        if (d.type === "router") return "/router.png";
        if (d.type === "pc") return "/pc.png";
        if (d.type === "server") return "/server.png";
      })
      .attr("width", 30)
      .attr("height", 30)
      .attr("x", (d) => d.x - 20)
      .attr("y", (d) => d.y - 20)
      .style("cursor", "pointer")
      .call(drag(simulation))
      .on("click", (event, d) => {
        if (showAdjacency) {
          setSelectedNode(d.id);
        }
      })
      .on("mouseover", (event, d) => {
        const [x, y] = d3.pointer(event);
        setTooltip({
          show: true,
          x: x + 20, // Adjust this offset to position the tooltip closer or farther
          y: y - 20,
          content: { id: d.id, name: d.name, type: d.type },
        });
      })
      .on("mouseout", () => {
        setTooltip((prev) => ({ ...prev, show: false }));
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("x", (d) => d.x - 20).attr("y", (d) => d.y - 20);
    });

    if (showAdjacency && selectedNode !== null) {
      link
        .attr("stroke", (d) =>
          d.source.id === selectedNode || d.target.id === selectedNode
            ? "red"
            : "#aaa"
        )
        .attr("stroke-width", (d) =>
          d.source.id === selectedNode || d.target.id === selectedNode ? 2 : 2
        );

      node.attr("opacity", (d) =>
        d.id === selectedNode ||
        linksData.some(
          (link) =>
            (link.source.id === selectedNode && link.target.id === d.id) ||
            (link.target.id === selectedNode && link.source.id === d.id)
        )
          ? 1
          : 0.5
      );
    }
  }, [nodesData, linksData, selectedNode, showAdjacency]);

  const drag = (simulation) => {
    return d3
      .drag()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
  };

  return (
    <div className="relative">
      <svg ref={svgRef}></svg>
      {tooltip.show && (
        <div
          className="absolute bg-gray-800 text-white text-sm p-2 rounded shadow-lg"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          <div>ID: {tooltip.content.id}</div>
          <div>Name: {tooltip.content.name}</div>
          <div>Type: {tooltip.content.type}</div>
        </div>
      )}
    </div>
  );
};

export default NetworkGraph;
