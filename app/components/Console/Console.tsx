"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/app/lib/timeFormatter";
import {
  Loader2,
  Terminal,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import styles from "./console.module.css";
import { Box } from "@mui/material";

interface DataItem {
  consoleMessage: string;
  timestamp: string;
  index: number;
  routerID: string;
}

export default function Console({
  logs,
  loading,
}: {
  logs: DataItem[];
  loading: boolean;
}) {
  const [data, setData] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const fetchData = async () => {
    // Fetch implementation remains the same
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const getMessageType = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("error") || lowerMessage.includes("down"))
      return "error";
    if (lowerMessage.includes("up") || lowerMessage.includes("recovered"))
      return "success";
    if (lowerMessage.includes("warning") || lowerMessage.includes("exceeded"))
      return "warning";
    return "info";
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card className="w-1/4 border-l-2 rounded-none border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="h-5 w-5" />
            <CardTitle>Console</CardTitle>
          </div>
          <Badge variant="secondary" className="font-mono text-xs">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Box
            className={`h-[calc(100vh-5.3rem)] overflow-auto ${styles.hideScrollbar}`}
            ref={consoleRef}
          
          >
            <div className={`flex flex-col space-y-2 ${styles.hideScrollbar}`}>
              {logs?.length > 0 &&
                logs.map((log) => {
                  const messageType = getMessageType(log.consoleMessage);
                  return (
                    <div
                      key={log.index}
                      className={`relative rounded-lg border bg-muted/40 p-4 text-sm ${
                        messageType === "error"
                          ? "border-destructive/60"
                          : messageType === "success"
                          ? "border-green-500/60"
                          : messageType === "warning"
                          ? "border-yellow-500/60"
                          : "border-blue-500/60"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        {getMessageIcon(messageType)}
                        <span className="font-mono text-xs text-muted-foreground">
                          {formatDate(log.timestamp)}
                        </span>
                      </div>
                      <div className="ml-6 font-mono">
                        <span className="font-semibold">{log.routerID}</span> -{" "}
                        {log.consoleMessage}
                      </div>
                    </div>
                  );
                })}
            </div>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
