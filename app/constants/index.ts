export const nodes = [
    { id: 1, name: "Router 1", type: "router" },
    { id: 2, name: "Router 2", type: "router" },
    { id: 3, name: "Router 3", type: "router" },
    { id: 4, name: "Router 4", type: "router" },
    { id: 5, name: "Router 5", type: "router" },
    { id: 6, name: "Router 6", type: "router" },
    { id: 7, name: "Router 7", type: "router" },

    // Cluster 1
    { id: 8, name: "PC 1", type: "pc" },
    { id: 9, name: "PC 2", type: "pc" },
    { id: 10, name: "PC 3", type: "pc" },
    { id: 11, name: "PC 4", type: "pc" },
    { id: 12, name: "Server 1", type: "server" },

    // Cluster 2
    { id: 13, name: "PC 5", type: "pc" },
    { id: 14, name: "PC 6", type: "pc" },
    { id: 15, name: "PC 7", type: "pc" },
    { id: 16, name: "PC 8", type: "pc" },
    { id: 17, name: "Server 2", type: "server" },

    // Cluster 3
    { id: 18, name: "PC 9", type: "pc" },
    { id: 19, name: "PC 10", type: "pc" },
    { id: 20, name: "PC 11", type: "pc" },
    { id: 21, name: "PC 12", type: "pc" },
    { id: 22, name: "Server 3", type: "server" },

    // Cluster 4
    { id: 23, name: "PC 13", type: "pc" },
    { id: 24, name: "PC 14", type: "pc" },
    { id: 25, name: "PC 15", type: "pc" },
    { id: 26, name: "PC 16", type: "pc" },
    { id: 27, name: "Server 4", type: "server" },

    // Cluster 5
    { id: 28, name: "PC 17", type: "pc" },
    { id: 29, name: "PC 18", type: "pc" },
    { id: 30, name: "PC 19", type: "pc" },
    { id: 31, name: "PC 20", type: "pc" },
    { id: 32, name: "Server 5", type: "server" },

    // Cluster 6
    { id: 33, name: "PC 21", type: "pc" },
    { id: 34, name: "PC 22", type: "pc" },
    { id: 35, name: "PC 23", type: "pc" },
    { id: 36, name: "PC 24", type: "pc" },
    { id: 37, name: "Server 6", type: "server" },
];

export const links = [
    // Core Routers Connections
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
    { source: 4, target: 5 },
    { source: 5, target: 6 },
    { source: 6, target: 7 },
    { source: 7, target: 1 },

    // Cluster 1 Links
    { source: 1, target: 8 },
    { source: 1, target: 9 },
    { source: 1, target: 10 },
    { source: 1, target: 11 },
    { source: 1, target: 12 },

    // Cluster 2 Links
    { source: 2, target: 13 },
    { source: 2, target: 14 },
    { source: 2, target: 15 },
    { source: 2, target: 16 },
    { source: 2, target: 17 },

    // Cluster 3 Links
    { source: 3, target: 18 },
    { source: 3, target: 19 },
    { source: 3, target: 20 },
    { source: 3, target: 21 },
    { source: 3, target: 22 },

    // Cluster 4 Links
    { source: 4, target: 23 },
    { source: 4, target: 24 },
    { source: 4, target: 25 },
    { source: 4, target: 26 },
    { source: 4, target: 27 },

    // Cluster 5 Links
    { source: 5, target: 28 },
    { source: 5, target: 29 },
    { source: 5, target: 30 },
    { source: 5, target: 31 },
    { source: 5, target: 32 },

    // Cluster 6 Links
    { source: 6, target: 33 },
    { source: 6, target: 34 },
    { source: 6, target: 35 },
    { source: 6, target: 36 },
    { source: 6, target: 37 },
];

export const logs = [
    {
        event: "Pressure threshold exceeded at Node 12.",
        time: "2024-09-09T10:30:00Z",
        key: 1
    },
    {
        event: "Temperature sensors recalibrated successfully at Station 4.",
        time: "2024-09-09T11:00:00Z",
        key: 2
    },
    {
        event: "Data loss detected between Node 7 and Node 8.",
        time: "2024-09-09T11:30:00Z",
        key: 3
    },
    {
        event: "Power grid load balancing algorithm optimized for peak hours.",
        time: "2024-09-09T12:00:00Z",
        key: 4
    },
    {
        event: "Unexpected drop in flow rate at Pump 3.",
        time: "2024-09-09T12:30:00Z",
        key: 5
    },
    {
        event: "Pressure threshold exceeded at Node 12.",
        time: "2024-09-09T10:30:00Z",
        key: 6
    },
    {
        event: "Temperature sensors recalibrated successfully at Station 4.",
        time: "2024-09-09T11:00:00Z",
        key: 7
    },
    {
        event: "Data loss detected between Node 7 and Node 8.",
        time: "2024-09-09T11:30:00Z",
        key: 8
    },
    {
        event: "Power grid load balancing algorithm optimized for peak hours.",
        time: "2024-09-09T12:00:00Z",
        key: 9
    },
    {
        event: "Unexpected drop in flow rate at Pump 3.",
        time: "2024-09-09T12:30:00Z",
        key: 10
    }
];

export const mockLogs = [
    {
        id: 1,
        timestamp: "2023-09-08T14:30:24Z",
        severity: "INFO",
        message: "%SYS-6-LOGGINGHOST_STARTSTOP: Logging to host 192.168.100.1 started - CLI initiated",
        source: "Router1",
        host: "192.168.100.5"
    },
    {
        id: 2,
        timestamp: "2023-09-08T14:35:10Z",
        severity: "WARNING",
        message: "%LINEPROTO-4-ERROR: Line protocol on Interface FastEthernet0/1, changed state to down",
        source: "Router2",
        host: "192.168.100.6"
    },
    {
        id: 3,
        timestamp: "2023-09-08T14:40:05Z",
        severity: "ERROR",
        message: "%DUAL-5-NBRCHANGE: IP-EIGRP(0) 100: Neighbor 192.168.108.3 (FastEthernet1/1) is down: Manual intervention required",
        source: "Router3",
        host: "192.168.100.7"
    },
    {
        id: 4,
        timestamp: "2023-09-08T15:00:30Z",
        severity: "INFO",
        message: "%SYS-5-RESTART: System restarted at 15:00:30",
        source: "Router4",
        host: "192.168.100.8"
    },
    {
        id: 5,
        timestamp: "2023-09-08T18:30:22Z",
        severity: "WARNING",
        message: "%LINK-3-UPDOWN: Interface FastEthernet2/0, changed state to up",
        source: "Switch1",
        host: "192.168.100.9"
    },
    {
        id: 6,
        timestamp: "2023-09-08T19:05:15Z",
        severity: "ERROR",
        message: "%BGP-3-NEGOTIATION: BGP session with 192.168.200.1 failed: No response from peer",
        source: "Router5",
        host: "192.168.100.10"
    },
    {
        id: 7,
        timestamp: "2023-09-09T08:15:00Z",
        severity: "INFO",
        message: "%SYS-5-CONFIG_I: Configured from console by user admin",
        source: "Router1",
        host: "192.168.100.5"
    },
    {
        id: 8,
        timestamp: "2023-09-09T09:20:45Z",
        severity: "WARNING",
        message: "%CPU-2-HIGHUTIL: CPU usage exceeded 80% threshold",
        source: "Switch2",
        host: "192.168.100.11"
    },
    {
        id: 9,
        timestamp: "2023-09-09T10:05:30Z",
        severity: "ERROR",
        message: "%DISK-4-FULL: Disk space on device /dev/sda1 is 95% full",
        source: "Server1",
        host: "192.168.100.12"
    },
    {
        id: 10,
        timestamp: "2023-09-09T11:30:00Z",
        severity: "INFO",
        message: "%SYS-6-LOGGINGHOST_STOP: Logging to host 192.168.100.2 stopped - CLI initiated",
        source: "Router2",
        host: "192.168.100.6"
    }
];