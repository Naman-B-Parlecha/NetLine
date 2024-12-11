"use client";
import React, { useState, useRef, useEffect } from "react";

const SSHTerminal: React.FC = () => {
  const [commandHistory, setCommandHistory] = useState<{ 
    command: string; 
    output: string; 
    error?: boolean;
  }[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean;
    host?: string;
    username?: string;
  }>({ connected: false });
  const terminalRef = useRef<HTMLDivElement>(null);

  const [routerDetails, setRouterDetails] = useState({
    host: "",
    port: "22",
    username: "",
    password: "",
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
        case "connect":
          if (parts.length !== 4) {
            throw new Error("Usage: connect <host> <username> <password>");
          }
          setRouterDetails({
            host: parts[1],
            port: "22",
            username: parts[2],
            password: parts[3],
          });

          const connectionResponse = await fetch("/api/ssh/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              ...routerDetails, 
              host: parts[1],
              username: parts[2],
              password: parts[3],
              command: "echo 'Connection successful'", 
            }),
          });

          if (!connectionResponse.ok) {
            throw new Error("Connection failed");
          }

          setConnectionStatus({ 
            connected: true, 
            host: parts[1], 
            username: parts[2], 
          });
          return "Connection established successfully";

        case "disconnect":
          setConnectionStatus({ connected: false });
          return "Disconnected from host";

        default:
          if (!connectionStatus.connected) {
            throw new Error("Not connected. Use 'connect <host> <username> <password>'");
          }

          const response = await fetch("/api/ssh/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...routerDetails, command }),
          });

          const data = await response.json();
          return response.ok ? data.output : data.error;
      }
    } catch (error: any) {
      return error.message || "Unexpected error";
    }
  };

  const runCommand = async () => {
    const trimmedCommand = currentCommand.trim();
    if (!trimmedCommand) return;

    const output = await processCommand(trimmedCommand);
    setCommandHistory(prev => [
      ...prev, 
      { 
        command: trimmedCommand, 
        output,
        error: output.includes("Error") || output.includes("failed"),
      }
    ]);
    setCurrentCommand("");
  };

  return (
    <div className="w-full h-screen bg-black text-white font-mono p-4">
      <div className="flex space-x-2 mb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div
      style={{ backgroundColor: '#000022' }} 
        ref={terminalRef}
        className="h-full overflow-y-auto p-2 rounded"
      >
        <div className="mb-2">
          <span className="text-green-400">Welcome to SSH Terminal</span>
          <br />
          <span className="text-yellow-400">
            {connectionStatus.connected 
              ? `Connected to ${connectionStatus.username}@${connectionStatus.host}` 
              : "Not connected"}
          </span>
        </div>

        {commandHistory.map((entry, index) => (
          <div 
            key={index} 
            className={`mb-1 ${entry.error ? 'text-red-400' : 'text-green-400'}`}
          >
            <span className="text-white">➜</span>{" "}
            <span className="text-gray-300">{entry.command}</span>
            <div className="pl-4 text-white">{entry.output}</div>
          </div>
        ))}

        <div className="flex items-center">
          <span className="text-green-400">
            {connectionStatus.connected 
              ? `${connectionStatus.username}@${connectionStatus.host}` 
              : ""}
          </span>
          <span className="text-white mx-2">➜</span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runCommand()}
            placeholder="Enter command (connect/disconnect)"
            className="bg-transparent text-white outline-none flex-grow"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default SSHTerminal;
