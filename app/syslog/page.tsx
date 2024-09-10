"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuLoader2 } from "react-icons/lu";
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
import { CalendarIcon, FilterIcon, RefreshCwIcon } from "lucide-react";
import { format, parseISO } from "date-fns";

// Mock log data (replace this with your actual API call)
import { mockLogs } from "../constants/index";
import { useRouter } from "next/navigation";

const severityColors = {
  INFO: "bg-blue-500",
  WARNING: "bg-yellow-500",
  ERROR: "bg-red-500",
};

export default function Component() {
  const router = useRouter();
  const [logs, setLogs] = useState(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [hostFilter, setHostFilter] = useState("ALL");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [logsPerPage, setLogsPerPage] = useState<number>(9);
  const [loading, setLoading] = useState(false); // Add a loading state

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

  useEffect(() => {
    setLogsPerPage((prev) => (prev === 6 ? 9 : 6));
  }, [showFilters]);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [refreshKey, setRefreshKey] = useState(0); // State to force refresh

  const handleRefresh = () => {
    setLoading(true); // Set loading to true when refresh starts
    setInterval(() => {
      setLoading(false); // Set loading to false after 2 seconds
      setRefreshKey((prevKey) => prevKey + 1); // Increment key to force a rerender
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold font-mono">
          Router-Sensor Network Logs
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
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
          <div className="flex flex-row gap-4">
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
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center">
          <LuLoader2 className="animate-spin" size={25} />
        </div>
      ) : (
        <Table key={refreshKey}>
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
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      severityColors[
                        log.severity as keyof typeof severityColors
                      ]
                    }`}
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
                        <p className="text-sm text-muted-foreground">
                          Source: {log.source}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Message: {log.message}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-around items-center">
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
          disabled={
            currentPage === Math.ceil(filteredLogs.length / logsPerPage)
          }
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
