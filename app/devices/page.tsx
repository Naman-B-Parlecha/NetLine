"use client";

import { useEffect, useState } from "react";
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
import { RiskMeter } from "../components/RiskMeter";
import { getSnmpPrediction, getSyslogPrediction } from "@/serverActions";
import { LuLoader2 } from "react-icons/lu";

interface PredictionProps {
  monitor: string;
  status: string;
  ip: string;
  type: string;
  group: string;
  osVersion: string;
  model: string;
  risk: number;
  downTimeCount: number;
  prediction: number;
  failure_probability: number;
  non_failure_probability: number;
}

export default function NetworkMonitor() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [devices, setDevices] = useState<PredictionProps[]>([]);
  const [snmpPred, setSnmpPred] = useState<any[]>([]);
  const rowsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const promises = NetworkDeviceMonitor.map(async (device) => {
          const response: any = await getSyslogPrediction(
            device.ip.toLocaleLowerCase()
          );
          return { ...device, ...response };
        });

        const results = await Promise.all(promises);
        setDevices(results);
      } catch (error) {
        console.error("Error fetching syslog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const promises = NetworkDeviceMonitor.map(async (device, index) => {
          const response: any = await getSnmpPrediction(index);
          return response;
        });

        const results = await Promise.all(promises);
        setSnmpPred(results);

        console.log("dsadsadsa", results);
      } catch (error) {
        console.error("Error fetching syslog data:", error);
      } finally {
        setLoading(false);
      }

      // await getSnmpPrediction(0);
    };

    fetchData();
  }, []);

  const filteredDevices = devices.filter((device) =>
    Object.values(device).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredDevices.length / rowsPerPage);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return loading ? (
    <div className="w-full h-[30rem] flex justify-center items-center">
      <LuLoader2 className="animate-spin" size={30} />
    </div>
  ) : (
    <div className="w-screen p-4 h-screen overflow-auto">
      <div className="mb-4 flex justify-between items-baseline">
        <h1 className="text-3xl font-bold font-mono pb-4">Devices</h1>
        <Input
          placeholder="Search"
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Table className="w-full">
            <TableHeader>
            <TableRow>
              <TableHead>HOSTNAME</TableHead>
              <TableHead className="text-center">STATUS</TableHead>
              <TableHead className="text-center">IP</TableHead>
              <TableHead className="text-center">TYPE</TableHead>
              <TableHead className="text-center">DOWNTIME</TableHead>
              <TableHead className="text-center">SYSLOG SHUTDOWN</TableHead>
              <TableHead className="text-center">RISK</TableHead>
              <TableHead className="text-center">SNMP SHUTDOWN</TableHead>
              <TableHead className="text-center">RISK</TableHead>
            </TableRow>
            </TableHeader>
          <TableBody>
            {paginatedDevices.map((device, index) => (
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
                <TableCell className="text-center text-xs">
                  {device.ip}
                </TableCell>
                <TableCell className="flex justify-center items-center text-xs">
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
                  {device.downTimeCount}
                </TableCell>
                <TableCell className="text-center text-xs">
                  {device.prediction === 0 ? "YES" : "NO"}
                </TableCell>
                <TableCell className="text-center text-xs">
                  <RiskMeter
                    value={Number(device.failure_probability.toFixed(2)) || 0}
                    className="w-full"
                  />
                </TableCell>
                <TableCell className="text-center text-xs">
                  {snmpPred[index] && snmpPred[index].predicted_failure === 0
                    ? "NO"
                    : "YES"}
                </TableCell>
                <TableCell className="text-center text-xs">
                  <RiskMeter
                    value={
                      snmpPred[index]
                        ? Number(
                            snmpPred[index].failure_probability.toFixed(2)
                          ) || 0
                        : 0
                    }
                    className="w-full"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
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
