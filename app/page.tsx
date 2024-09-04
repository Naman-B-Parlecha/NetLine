"use client";
import React, { useState } from "react";
import Console from "./components/Console/Console";
import Navbar from "./components/NavBar";
import ButtonGroup from "./components/Network/ButtonGroup";
import NetworkGraph from "./components/Network/NetworkVisualizer.jsx";
import { nodes, links } from "./constants/index";
export default function Home() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAdjacency, setShowAdjacency] = useState(false);

  const handleAdjacencyCheck = () => {
    setShowAdjacency(true);
  };

  const resetAdjacencyCheck = () => {
    setShowAdjacency(false);
    setSelectedNode(null);
  };
  return (
    <main className="flex h-screen">
      <Navbar />
      <section className="w-3/5 bg-white p-4">
        <h1 className="text-2xl font-bold underline">Current Network State</h1>
        <NetworkGraph
          nodesData={nodes}
          linksData={links}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          showAdjacency={showAdjacency}
          resetAdjacencyCheck={resetAdjacencyCheck}
        />
        <ButtonGroup />
      </section>
      <Console />
    </main>
  );
}
