"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Network,
  Router,
  Server,
  Workflow,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NetworkDeviceMonitor } from "../constants";

export default function NetworkMonitor() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  const filteredDevices = NetworkDeviceMonitor.filter((device) =>
    Object.values(device).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredDevices.length / rowsPerPage);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="w-screen p-4 h-screen overflow-auto">
      <div className="mb-4 flex justify-between items-baseline">
        <h1 className="text-2xl font-bold font-mono pb-4">Devices</h1>
        <Input
          placeholder="Search"
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">MONITOR</TableHead>
            <TableHead className="text-center">STATUS</TableHead>
            <TableHead className="text-center">IP</TableHead>
            <TableHead className="text-center">TYPE</TableHead>
            <TableHead className="text-center">GROUP</TableHead>
            <TableHead className="text-center">OS VERSION</TableHead>
            <TableHead className="text-center">SYSTEM DESCRIPTION</TableHead>
            <TableHead className="text-center">MODEL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedDevices.map((device) => (
            <TableRow key={device.ip}>
              <TableCell className="text-xs">{device.monitor}</TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={device.status === "up" ? "outline" : "destructive"}
                  className={
                    device.status === "unreachable"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : device.status === "up"
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-red-500 hover:bg-red-600"
                  }
                >
                  {device.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center text-xs">{device.ip}</TableCell>
              <TableCell className="text-center text-xs">
                {device.type === "switch" && (
                  <Network className="w-5 h-5 text-blue-500" />
                )}
                {device.type === "router" && (
                  <Router className="w-5 h-5 text-green-500" />
                )}
                {device.type === "server" && (
                  <Server className="w-5 h-5 text-purple-500" />
                )}
                {device.type === "workflow" && (
                  <Workflow className="w-5 h-5 text-orange-500" />
                )}
              </TableCell>
              <TableCell className="text-center text-xs">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  {device.group}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-center text-xs">
                {device.osVersion}
              </TableCell>
              <TableCell className="text-center text-xs">
                {device.systemDescription}
              </TableCell>
              <TableCell className="text-center text-xs">
                {device.model}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center space-x-2 fixed bottom-4 right-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  );
}
