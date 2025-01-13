"use client";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { snmpData } from '@/app/constants';

const SocketComponent: any = ({ children }: any) => {
  useEffect(() => {
    // Connect to the WebSocket server (ensure you include http:// or ws://)
    const socket: any = io('ws://localhost:5000'); 

    // Listen for the 'message' event from the server
    socket.on("message", (data: any) => {
      snmpData.push({
        index: 1,
        timestamp: 'MKX',
        routerID: 'CHL RH H',
        consoleMessage: 'FKFKFKFK'
      });
      console.log(data); // Logs the data received from the server
    });

    // Send a message to the server
    socket.emit("client_message", { content: "Hello from the client!" });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
};

export default SocketComponent;
