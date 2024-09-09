"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  RefreshCwIcon,
} from "lucide-react";
import { format, parseISO } from "date-fns";

// Mock log data (replace this with your actual API call)
import { mockLogs } from "../constants/index";

const severityColors = {
  INFO: "bg-blue-500",
  WARNING: "bg-yellow-500",
  ERROR: "bg-red-500",
};

export default function Component() {
  const [logs, setLogs] = useState(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [hostFilter, setHostFilter] = useState("ALL");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const logsPerPage = 9;

  const hosts = Array.from(new Set(logs.map((log) => log.host)));

  useEffect(() => {
    // Apply filters
    let filtered = logs.filter((log) => {
      const logDate = parseISO(log.timestamp); // Ensure date is parsed consistently
      const matchesSearch =
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity =
        severityFilter === "ALL" || log.severity === severityFilter;
      const matchesHost = hostFilter === "ALL" || log.host === hostFilter;
      const matchesDateRange =
        (!startDate || logDate >= startDate) &&
        (!endDate || logDate <= endDate);
      return (
        matchesSearch && matchesSeverity && matchesHost && matchesDateRange
      );
    });

    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [logs, searchTerm, severityFilter, hostFilter, startDate, endDate]);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Router-Sensor Network Logs</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Severities</SelectItem>
              <SelectItem value="INFO">Info</SelectItem>
              <SelectItem value="WARNING">Warning</SelectItem>
              <SelectItem value="ERROR">Error</SelectItem>
            </SelectContent>
          </Select>

          <Select value={hostFilter} onValueChange={setHostFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select host" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Hosts</SelectItem>
              {hosts.map((host) => (
                <SelectItem key={host} value={host}>
                  {host}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "End date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Timestamp</TableHead>
            <TableHead className="w-[120px]">Severity</TableHead>
            <TableHead className="w-[150px]">Host</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{format(parseISO(log.timestamp), "Pp")}</TableCell>
              <TableCell>
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${severityColors[log.severity as keyof typeof severityColors]}`}
                ></span>
                {log.severity}
              </TableCell>
              <TableCell>{log.host}</TableCell>
              <TableCell className="max-w-xl truncate">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto font-normal">
                      {log.message}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Log Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Timestamp:</span>
                        <span className="col-span-3">
                          {format(parseISO(log.timestamp), "Pp")}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Severity:</span>
                        <span className="col-span-3">{log.severity}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Host:</span>
                        <span className="col-span-3">{log.host}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Message:</span>
                        <span className="col-span-3">{log.message}</span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-around items-center mt-4">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {Math.ceil(filteredLogs.length / logsPerPage)}
        </span>
        <Button
          variant="outline"
          disabled={currentPage === Math.ceil(filteredLogs.length / logsPerPage)}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
