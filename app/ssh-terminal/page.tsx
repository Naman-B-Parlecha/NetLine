"use client";

import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface ConnectionDetails {
  host: string;
  port: string;
  username: string;
  session: string;
}

const SSHTerminal: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('disconnected');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails>({
    host: '',
    port: '',
    username: '',
    session: '',
  });

  const getStatusColor = (): string => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-500';
      case 'connecting':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  useEffect(() => {
    const fetchConnectionDetails = async () => {
      setConnectionStatus('connecting');
      try {
        const response = await fetch('');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: ConnectionDetails = await response.json();

        setConnectionDetails(data);
        setConnectionStatus('connected');
      } catch (error: any) {
        setErrorMessage(error.message || 'Failed to connect');
        setConnectionStatus('error');
      }
    };

    fetchConnectionDetails();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Terminal size={16} className="text-gray-400" />
            <span className="text-sm text-gray-400">SSH Terminal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' : 'bg-gray-500'
              }`}
            />
            <span className={`text-xs ${getStatusColor()}`}>
              {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 font-mono text-sm text-green-400 bg-gray-900 min-h-96 max-h-[600px] overflow-y-auto"> {/* Increased height */}
          <div className="flex items-center space-x-2">
            <span className="text-purple-400">➜</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-400">$</span>
          </div>
          <div className="mt-2">
            <span className="text-green-400">
              {connectionStatus === 'connected'
                ? 'Connected to remote server...'
                : 'Attempting to connect...'}
            </span>
          </div>
          {connectionStatus === 'connected' && (
            <div className="mt-1">
              <span className="text-white">
                Last login: {new Date().toLocaleString()}
              </span>
            </div>
          )}
          <div className="mt-4 flex items-center">
            <span className="text-purple-400">➜</span>
            <span className="text-blue-400 mx-2">~</span>
            <span className="text-gray-400">$</span>
            <span className="ml-2 animate-pulse">█</span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      {/* Connection Info */}
      <div className="mt-4 text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <span>Host: {connectionDetails.host || 'Loading...'}</span>
          <span>Port: {connectionDetails.port || 'Loading...'}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span>Username: {connectionDetails.username || 'Loading...'}</span>
          <span>Session: #{connectionDetails.session || 'Loading...'}</span>
        </div>
      </div>
    </div>
  );
};

export default SSHTerminal;