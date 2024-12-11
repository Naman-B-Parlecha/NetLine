"use client";
import React, { useEffect, useState } from "react";
import Console from "../components/Console/Console";
import ButtonGroup from "../components/Network/ButtonGroup";
import NetworkGraph from "../components/Network/NetworkVisualizer";
import { snmpData } from "../constants/index";
import { useRouter } from "next/navigation";
import { getNetwork, getVersions } from "@/serverActions";
import { LuLoader2 } from "react-icons/lu";
import VersionSelector from "../components/Network/VersionSelector";

export default function Home() {
  const router = useRouter();
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAdjacency, setShowAdjacency] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [versions, setVersions] = useState<any[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);

  const handleAdjacencyCheck = () => {
    setShowAdjacency(true);
  };

  const resetAdjacencyCheck = () => {
    setShowAdjacency(false);
    setSelectedNode(null);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const versionResponse = await getVersions();
        setVersions(versionResponse);

        if (versionResponse.length > 0) {
          const initialVersion = versionResponse[0].id;
          setSelectedVersion(initialVersion);

          const networkResponse = await getNetwork(initialVersion);
          setNodes(networkResponse.nodes);
          setLinks(networkResponse.connections);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setVersions([]);
        setNodes([]);
        setLinks([]);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchInitialData();
  }, [refreshKey]);

  useEffect(() => {
    if (selectedVersion === null) return;

    const fetchNetwork = async () => {
      try {
        setIsLoading(true);
        const response = await getNetwork(selectedVersion);
        setNodes(response.nodes);
        setLinks(response.connections);
      } catch (err) {
        console.error("Error fetching network data:", err);
        setNodes([]);
        setLinks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNetwork();
  }, [selectedVersion]);

  return (
    <main className="flex h-screen w-full">
      <section className="w-3/4 bg-gray-300/20 p-4">
        <div className="w-full flex justify-between align-baseline">
          <h1 className="text-3xl font-bold font-mono pb-4">
            Current Network State
          </h1>
          <VersionSelector
            isloading={isLoading}
            versions={versions}
            selectedVersion={selectedVersion}
            onVersionChange={setSelectedVersion}
          />
        </div>
        {isLoading ? (
          <div className="w-full h-[30rem] flex justify-center items-center">
            <LuLoader2 className="animate-spin" size={30} />
          </div>
        ) : (
          <NetworkGraph
            key={refreshKey}
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
      <Console loading={isLoading} key={refreshKey} logs={snmpData} />
    </main>
  );
}
