"use client";

import React, { useState, useRef, useEffect } from "react";
import cls from "./customclass.module.css";
import axios from "axios";

const SSHTerminal: React.FC = () => {
  const [commandHistory, setCommandHistory] = useState<
    { command: string; output: string; error?: boolean }[]
  >([]);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean;
    host?: string;
  }>({ connected: false });
  const terminalRef = useRef<HTMLDivElement>(null);

  const [routerDetails, setRouterDetails] = useState({
    host: "",
    port: "22",
  });

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const processCommand = async (command: string) => {
    const parts = command.trim().split(/\s+/);
    try {
      switch (parts[0]) {
        case "clear":
          setCommandHistory([]);
          return "";

        case "connect":
          if (parts.length !== 2) {
            throw new Error("Usage: connect <host>");
          }
          setRouterDetails({ host: parts[1], port: "22" });
          setConnectionStatus({ connected: true, host: parts[1] });
          return "Connection established successfully";

        case "disconnect":
          setConnectionStatus({ connected: false });
          return "Disconnected from host";

        default:
          if (!connectionStatus.connected) {
            throw new Error("Not connected. Use 'connect <host>'");
          }
          const response = await axios.post(
            `http://localhost:8000/ssh?ip=192.168.1.1&command=show ip interface brief`,
            {},
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
              },
            }
          );
          return response.data;
      }
    } catch (error: any) {
      return error.message || "Unexpected error";
    }
  };

  const runCommand = async () => {
    const trimmedCommand = currentCommand.trim();
    if (!trimmedCommand) return;

    // Add temporary "Loading..." message
    setCommandHistory((prev) => [
      ...prev,
      { command: trimmedCommand, output: "Loading...", error: false },
    ]);

    setCurrentCommand("");

    const output = await processCommand(trimmedCommand);

    // Replace "Loading..." with the actual output
    setCommandHistory((prev) => {
      const newHistory = [...prev];
      newHistory[newHistory.length - 1] = {
        command: trimmedCommand,
        output,
        error: output.includes("Error") || output.includes("failed"),
      };
      return newHistory;
    });
  };

  return (
    <div className="w-full h-screen bg-[#000022] overflow-hidden text-white font-mono p-4">
      <div className="flex space-x-2 mb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div
        style={{ backgroundColor: "#000022" }}
        ref={terminalRef}
        className={`h-[90vh] overflow-auto p-2 rounded ${cls.no_scrollbar}`}
      >
        <div className="mb-2">
          <span className="text-green-400">Welcome to SSH Terminal</span>
          <br />
          <span className="text-yellow-400">
            {connectionStatus.connected
              ? `Connected to ${connectionStatus.host}`
              : "Not connected"}
          </span>
        </div>

        {commandHistory.map((entry, index) => (
          <div
            key={index}
            className={`mb-1 ${
              entry.error
                ? "text-red-400"
                : entry.output === "Loading..."
                ? "text-blue-400"
                : "text-green-400"
            }`}
          >
            <span className="text-white">➜</span>{" "}
            <span className="text-gray-300">{entry.command}</span>
            <div className="pl-4 text-white">{entry.output}</div>
          </div>
        ))}

        <div className="flex items-center">
          <span className="text-green-400">
            {connectionStatus.connected ? `${connectionStatus.host}~` : "~"}
          </span>
          <span className="text-white mx-2">➜</span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runCommand()}
            placeholder={
              connectionStatus.connected
                ? "Enter command !!"
                : "Enter command (connect/disconnect)"
            }
            className="bg-transparent text-white outline-none flex-grow"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default SSHTerminal;
