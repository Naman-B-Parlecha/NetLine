"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { X } from "lucide-react";

const NetworkGraph = ({
  nodesData,
  linksData,
  selectedNode,
  setSelectedNode,
  showAdjacency,
}) => {
  const router = useRouter();
  const svgRef = useRef();
  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: {},
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedirect = (id) => {
    return router.push(`/network/${id}`);
  };

  const handleShutdown = (id) => {
    console.log("shuting down the system", selectedDevice?.id);
  };

  useEffect(() => {
    const width = 1000;
    const height = 800;

    // Check if the data is correct
    
    let formattedNodesData = []
    for (const node of nodesData ){
      let newInterfaces = []
      for (const iface of node?.interfaces) {
        if (iface.ip) {
          newInterfaces.push(iface)
        }
      }
      formattedNodesData.push({
        id: node?.id,
        type: node?.type,
        name: node?.name,
        interfaces: newInterfaces
      })
    }
    console.log("Nodes Data:", formattedNodesData);
    console.log("Links Data:", linksData);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    // svg
    // .append("image")
    // .attr("xlink:href", "/dotback.jpg")
    // .attr("x", 0)
    // .attr("y", 0)
    // .attr("width", width)
    // .attr("height", height);
    // Create a map for IP to Node ID
    const ipToNodeId = {};
    formattedNodesData.forEach((node) => {
      node.interfaces.forEach((iface) => {
        if (iface.ip) {
          ipToNodeId[iface.ip] = node.id;
        }
      });
    });

    // Format linksData to use Node IDs
    // const formattedLinks = linksData.map((link) => ({
    //   source: ipToNodeId[link.source],
    //   target: ipToNodeId[link.target],
    // }));

    let formattedLinks = []
    for (const link of linksData) {
      if (ipToNodeId[link.source] && ipToNodeId[link.target]) {
        formattedLinks.push({
          source: ipToNodeId[link.source],
          target: ipToNodeId[link.target]
        })
      }
    }

    // Verify the formatted links
    console.log("Formatted Links Data:", formattedLinks, "\n IptoNodeId: ", ipToNodeId);

      const simulation = d3
        .forceSimulation(formattedNodesData)
        .force(
          "link",
          d3.forceLink(formattedLinks).id((d) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-2000))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(20));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(formattedLinks)
      .join("line")
      .attr("stroke-width", 2)
      .attr("stroke", "#aaa");

    const node = svg
      .append("g")
      .selectAll("image")
      .data(formattedNodesData)
      .join("image")
      .attr("href", (d) => {
        switch (d.type) {
          case "pc":
            return "/pc.png";
          case "router":
            return "/newrouter.png";
          case "switch":
            return "/switch.png";
          default:
            return "";
        }
      })
      .attr("width", 50)
      .attr("height", 50)
      .attr("x", (d) => d.x - 40)
      .attr("y", (d) => d.y - 40)
      .style("cursor", "pointer")
      .call(drag(simulation))
      .on("click", (event, d) => {
        console.log(d.id);
        if (showAdjacency) {
          setSelectedNode(d.id);
        } else {
          setSelectedDevice({
            id: d.id,
            name: d.name,
            type: d.type,
            interfaces: d.interfaces,
          });
          handleClickOpen();
          // return router.push(`/network/${d.id}`)
        }
      })
      .on("mouseover", (event, d) => {
        const [x, y] = d3.pointer(event);
        setTooltip({
          show: true,
          x: x + 20,
          y: y - 20,
          content: {
            id: d.id,
            name: d.name,
            type: d.type,
            interfaces: d.interfaces,
          },
        });
      })
      .on("mouseout", () => {
        setTooltip((prev) => ({ ...prev, show: false }));
      });

    const labels = svg
      .append("g")
      .selectAll("text")
      .data(formattedNodesData)
      .join("text")
      .text((d) => d.name)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#333")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 40)
      .style("font-weight", "700"); // Position below the node

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("x", (d) => d.x - 30).attr("y", (d) => d.y - 30);

      labels.attr("x", (d) => d.x).attr("y", (d) => d.y + 30); // Keep labels updated
    });

    if (showAdjacency && selectedNode !== null) {
      link
        .attr("stroke", (d) =>
          d.source.id === selectedNode || d.target.id === selectedNode
            ? "red"
            : "#aaa"
        )
        .attr("stroke-width", (d) =>
          d.source.id === selectedNode || d.target.id === selectedNode ? 2 : 1
        );

      node.attr("opacity", (d) =>
        d.id === selectedNode ||
        linksData.some(
          (link) =>
            (link.source === selectedNode && link.target === d.id) ||
            (link.target === selectedNode && link.source === d.id)
        )
          ? 1
          : 0.5
      );
    }

    return () => {
      svg.selectAll("*").remove();
    };
  }, [nodesData, linksData, selectedNode, showAdjacency,setSelectedNode]);

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
    <div
      className="relative border-blue-500/20 border-2 rounded-xl bg-white"
      style={{
        backgroundImage: "url('/dotimage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <svg ref={svgRef}></svg>
      {tooltip.show && (
        <div
          className="absolute bg-gray-800/70 text-white text-sm p-4 rounded shadow-lg"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          <div>ID: {tooltip.content.id}</div>
          <div>Name: {tooltip.content.name}</div>
          <div>Type: {tooltip.content.type}</div>
          {tooltip.content.type === "router" && <div>
            Interfaces:
            {tooltip.content.interfaces &&
              tooltip.content.interfaces.length > 0 &&
              tooltip.content.interfaces.map((ifs, index) => (
                <div key={index} className="pl-4">
                  {ifs.name} : {ifs.ip}
                </div>
              ))}
          </div>}
        </div>
      )}
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogActions>
            <button
              className="p-0 m-0 border-none outline-none"
              onClick={handleClose}
            >
              <X className="p-0 m-0" />
            </button>
          </DialogActions>
          <DialogTitle id="alert-dialog-title">
            {"Your Devices Details"}
          </DialogTitle>
          <DialogContent className="w-[30rem]">
            <DialogContentText id="alert-dialog-description">
              <Typography>ID: {selectedDevice?.id}</Typography>
              <Typography>Name: {selectedDevice?.name}</Typography>
              <Typography>Type: {selectedDevice?.type}</Typography>
              {selectedDevice?.type === "router" && <div>
                Interfaces:
                {selectedDevice?.interfaces &&
                  selectedDevice?.interfaces.length > 0 &&
                  selectedDevice?.interfaces.map((ifs, index) => (
                    <Typography key={index} className="pl-4">
                      {ifs.name} : {ifs.ip}
                    </Typography>
                  ))}
              </div>}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="pb-4">
            <Button
              size="small"
              onClick={() => {
                handleRedirect(selectedDevice?.id);
              }}
            >
              Check Performance
            </Button>
            <Button
              size="small"
              onClick={handleShutdown}
              variant="contained"
              className="bg-red-500"
            >
              Shutdown device
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default NetworkGraph;
