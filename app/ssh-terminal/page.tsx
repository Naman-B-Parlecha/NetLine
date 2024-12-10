"use client";

import React, { useState } from "react";

import { Terminal, Send } from "lucide-react";
import cls from "./customclass.module.css";
const SSHTerminal: React.FC = () => {
  const [routerDetails, setRouterDetails] = useState({
    host: "",

    port: "22",

    username: "",

    password: "",
  });

  const [commandHistory, setCommandHistory] = useState<
    {
      command: string;

      output: string;

      error?: boolean;
    }[]
  >([]);

  const [currentCommand, setCurrentCommand] = useState<string>("");

  const [connectionStatus, setConnectionStatus] =
    useState<string>("disconnected");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRouterDetails((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const connectToRouter = async () => {
    setConnectionStatus("connecting");

    try {
      const response = await fetch("/api/ssh/execute", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          ...routerDetails,
          command: "echo 'Connection Test'",
        }),
      });

      if (!response.ok) {
        throw new Error(`Connection failed: ${response.statusText}`);
      }

      setConnectionStatus("connected");

      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to connect");

      setConnectionStatus("error");
    }
  };

  const runCommand = async (e?: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow both Enter key and button click

    if (e && e.key !== "Enter") return;

    const trimmedCommand = currentCommand.trim();

    if (!trimmedCommand) return;

    try {
      const response = await fetch("/api/ssh/execute", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ ...routerDetails, command: trimmedCommand }),
      });

      const data = await response.json();

      // Update command history

      setCommandHistory((prev) => [
        ...prev,

        {
          command: trimmedCommand,

          output: response.ok ? data.output : data.error,

          error: !response.ok,
        },
      ]);

      // Clear current command

      setCurrentCommand("");
    } catch (error: any) {
      setCommandHistory((prev) => [
        ...prev,

        {
          command: trimmedCommand,

          output: error.message || "Unexpected error",

          error: true,
        },
      ]);
    }
  };

  return (
    <div
      className={`w-full   mx-auto p-4 h-screen overflow-auto ${cls.no_scrollbar}`}
    >
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        {/* Terminal Header */}

        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Terminal className="text-gray-400" size={16} />

            <span className="text-sm text-gray-400">SSH Terminal</span>
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                connectionStatus === "connected"
                  ? "bg-green-500"
                  : connectionStatus === "error"
                  ? "bg-red-500"
                  : "bg-gray-500"
              }`}
            />

            <span className="text-xs text-gray-400">
              {connectionStatus.charAt(0).toUpperCase() +
                connectionStatus.slice(1)}
            </span>
          </div>
        </div>

        {/* Terminal Output */}

        <div className="p-4 font-mono text-sm bg-gray-900 min-h-[500px] max-h-[500px] overflow-y-auto">
          {commandHistory.map((entry, index) => (
            <div
              key={index}
              className={`mb-2 ${
                entry.error ? "text-red-400" : "text-green-400"
              }`}
            >
              <div>
                <span className="text-purple-400">➜</span>{" "}
                <span className="text-gray-300">{entry.command}</span>
              </div>

              <div className="pl-4 text-white">{entry.output}</div>
            </div>
          ))}
        </div>

        {/* Command Input */}

        <div className="flex items-center p-4 bg-gray-800 border-t border-gray-700">
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runCommand(e)}
            placeholder={
              connectionStatus === "connected"
                ? "Enter command..."
                : "Connect first"
            }
            disabled={connectionStatus !== "connected"}
            className="flex-grow bg-transparent text-white outline-none"
          />

          <button
            onClick={() => runCommand()}
            disabled={connectionStatus !== "connected"}
            className="ml-2 text-gray-400 hover:text-white disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Connection Form */}

      <div className="mt-4 bg-gray-800 p-4 rounded">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="host"
            value={routerDetails.host}
            onChange={handleInputChange}
            placeholder="Hostname/IP"
            className="p-2 bg-gray-700 text-white rounded"
          />

          <input
            type="text"
            name="port"
            value={routerDetails.port}
            onChange={handleInputChange}
            placeholder="Port (default 22)"
            className="p-2 bg-gray-700 text-white rounded"
          />

          <input
            type="text"
            name="username"
            value={routerDetails.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="p-2 bg-gray-700 text-white rounded"
          />

          <input
            type="password"
            name="password"
            value={routerDetails.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="p-2 bg-gray-700 text-white rounded"
          />
        </div>

        <button
          onClick={connectToRouter}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Connect
        </button>
      </div>

      {/* Error Display */}

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SSHTerminal;
