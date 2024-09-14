"use client";
import React, { useEffect, useState } from "react";
import Console from "./components/Console/Console";
import Navbar from "./components/NavBar";
import ButtonGroup from "./components/Network/ButtonGroup";
import NetworkGraph from "./components/Network/NetworkVisualizer";
import { snmpData } from "./constants/index";
import { useRouter } from "next/navigation";
import { getNetwork } from "../serverActions/index";
import { LuLoader2 } from "react-icons/lu";

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
    setRefreshKey((prev) => prev + 1); // Increment key to refresh components
  };

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getNetwork();
        console.log(response);
        setNodes(response.nodes);
        setLinks(response.connections);
      } catch (err) {
        console.log("Error fetching data:", err);
        setNodes([]);
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]); // Dependency on refreshKey to refetch data

  return (
    <main className="flex h-screen w-full">
      <section className="w-3/4 bg-gray-300/20 p-4">
        <h1 className="text-3xl font-bold font-mono pb-4">
          Current Network State
        </h1>
        {loading ? (
          <div className="w-full h-[30rem] flex justify-center items-center">
            <LuLoader2 className="animate-spin" size={30} />
          </div>
        ) : (
          <NetworkGraph
            key={refreshKey} // Refresh NetworkGraph when refreshKey changes
            nodesData={nodes}
            linksData={links}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            showAdjacency={showAdjacency}
          />
        )}
        <ButtonGroup
          onAdjacencyCheck={handleAdjacencyCheck}
          onResetAdjacenyCheck={resetAdjacencyCheck}
          showAdjacency={showAdjacency}
          handleRefresh={handleRefresh}
        />
      </section>
      <Console
        loading={loading}
        key={refreshKey} // Refresh Console when refreshKey changes
        logs={snmpData}
      />
    </main>
  );
}
