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

const dummyVersions = [
  { hash: "abc123", timestamp: "2023-06-01T12:00:00Z" },
  { hash: "def456", timestamp: "2023-06-02T14:30:00Z" },
  { hash: "ghi789", timestamp: "2023-06-03T09:15:00Z" },
];

export default function Home() {
  const router = useRouter();
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAdjacency, setShowAdjacency] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // will add this in airport

  // useEffect(() => {
  //   const fetchVersions = async () => {
  //     try {
  //       const versionData = await getNetworkVersions();
  //       setVersions(versionData);
  //       if (versionData.length > 0) {
  //         setSelectedVersion(versionData[0].hash);
  //       }
  //     } catch (err) {
  //       console.log("Error fetching versions:", err);
  //     }
  //   };

  //   fetchVersions();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("cutie", typeof selectedVersion);
        const response = await getNetwork(selectedVersion);
        // const response = await getNetwork(selectedVersion);
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
  }, [refreshKey, selectedVersion]);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        setLoading(true);

        const response = await getVersions();
        setVersions(response);
        if (response.length > 0) {
          setSelectedVersion(response[0].id);
        }
      } catch (err) {
        console.log("Error fetching version:", err);
        setVersions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, []);

  return (
    <main className="flex h-screen w-full">
      <section className="w-3/4 bg-gray-300/20 p-4">
        <div className="w-full flex justify-between align-baseline">
          <h1 className="text-3xl font-bold font-mono pb-4">
            Current Network State
          </h1>
          <VersionSelector
            isloading={loading}
            versions={versions}
            selectedVersion={selectedVersion}
            onVersionChange={setSelectedVersion}
          />
        </div>
        {loading ? (
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
      <Console loading={loading} key={refreshKey} logs={snmpData} />
    </main>
  );
}
