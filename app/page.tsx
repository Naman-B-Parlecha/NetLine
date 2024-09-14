"use client";
import React, { useState } from "react";
import Console from "./components/Console/Console";
import Navbar from "./components/NavBar";
import ButtonGroup from "./components/Network/ButtonGroup";
import NetworkGraph from "./components/Network/NetworkVisualizer.jsx";
import { nodes, nodelinks, logs, snmpData } from "./constants/index";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAdjacency, setShowAdjacency] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdjacencyCheck = () => {
    setShowAdjacency(true);
  };

  const resetAdjacencyCheck = () => {
    setShowAdjacency(false);
    setSelectedNode(null);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    router.refresh();
  };

  // write the fetch function here and then send it to both the network graph and console if any changes happen then it will work like refresh key

  return (
    <main className="flex h-screen w-full">
      <section className="w-3/4 bg-gray-300/20 p-4">
        <h1 className="text-3xl font-bold font-mono pb-4">
          Current Network State
        </h1>
        <NetworkGraph
          key={refreshKey}
          nodesData={nodes}
          linksData={nodelinks}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          showAdjacency={showAdjacency}
        />
        <ButtonGroup
          onAdjacencyCheck={handleAdjacencyCheck}
          onResetAdjacenyCheck={resetAdjacencyCheck}
          showAdjacency={showAdjacency}
          handleRefresh={handleRefresh}
        />
      </section>
      <Console logs={snmpData} />
    </main>
  );
}
