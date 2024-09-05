"use client";
import React, { useState } from "react";
import Console from "./components/Console/Console";
import Navbar from "./components/NavBar";
import ButtonGroup from "./components/Network/ButtonGroup";
import NetworkGraph from "./components/Network/NetworkVisualizer.jsx";
import { nodes, links } from "./constants/index";
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
    setRefreshKey(prev => prev + 1);
    router.refresh();
  };

  return (
    <main className="flex h-screen">
      <Navbar />
      <section className="w-3/5 bg-white p-4">
        <h1 className="text-2xl font-bold underline">Current Network State</h1>
        <NetworkGraph
          key={refreshKey}
          nodesData={nodes}
          linksData={links}
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
      <Console count={refreshKey} />
    </main>
  );
}
