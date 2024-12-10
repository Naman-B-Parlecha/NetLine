// export const nodes = [
//     { id: 1, name: "Router 1", type: "router" },
//     { id: 2, name: "Router 2", type: "router" },
//     { id: 3, name: "Router 3", type: "router" },
//     { id: 4, name: "Router 4", type: "router" },
//     { id: 5, name: "Router 5", type: "router" },
//     { id: 6, name: "Router 6", type: "router" },
//     { id: 7, name: "Router 7", type: "router" },

//     // Cluster 1
//     { id: 8, name: "PC 1", type: "pc" },
//     { id: 9, name: "PC 2", type: "pc" },
//     { id: 10, name: "PC 3", type: "pc" },
//     { id: 11, name: "PC 4", type: "pc" },
//     { id: 12, name: "Server 1", type: "server" },

//     // Cluster 2
//     { id: 13, name: "PC 5", type: "pc" },
//     { id: 14, name: "PC 6", type: "pc" },
//     { id: 15, name: "PC 7", type: "pc" },
//     { id: 16, name: "PC 8", type: "pc" },
//     { id: 17, name: "Server 2", type: "server" },

//     // Cluster 3
//     { id: 18, name: "PC 9", type: "pc" },
//     { id: 19, name: "PC 10", type: "pc" },
//     { id: 20, name: "PC 11", type: "pc" },
//     { id: 21, name: "PC 12", type: "pc" },
//     { id: 22, name: "Server 3", type: "server" },

//     // Cluster 4
//     { id: 23, name: "PC 13", type: "pc" },
//     { id: 24, name: "PC 14", type: "pc" },
//     { id: 25, name: "PC 15", type: "pc" },
//     { id: 26, name: "PC 16", type: "pc" },
//     { id: 27, name: "Server 4", type: "server" },

//     // Cluster 5
//     { id: 28, name: "PC 17", type: "pc" },
//     { id: 29, name: "PC 18", type: "pc" },
//     { id: 30, name: "PC 19", type: "pc" },
//     { id: 31, name: "PC 20", type: "pc" },
//     { id: 32, name: "Server 5", type: "server" },

//     // Cluster 6
//     { id: 33, name: "PC 21", type: "pc" },
//     { id: 34, name: "PC 22", type: "pc" },
//     { id: 35, name: "PC 23", type: "pc" },
//     { id: 36, name: "PC 24", type: "pc" },
//     { id: 37, name: "Server 6", type: "server" },
// ];

export const nodes = [
    {
        id: 2,
        type: "pc",
        name: "Router 2",
        interfaces: [
            {
                ip: "192.168.108.2",
                name: "FastEthernet0/0"
            }
        ]
    },
    {
        id: 1,
        type: "pc",
        name: "Router 1",
        interfaces: [
            {
                ip: "192.168.100.5",
                name: "FastEthernet0/0"
            },
            {
                ip: "192.168.123.217",
                name: "FastEthernet0/1"
            },
            {
                ip: "192.168.108.1",
                name: "FastEthernet1/0"
            }
        ]
    }
]

const connections_pre = [
    {
        source: "192.168.108.1",
        target: "192.168.108.2"
    }
]

let links = [];

for (let i = 0; i < connections_pre.length; i++) {
    const connection = connections_pre[i];
    const source = nodes.find(node => node.interfaces.find(ifc => ifc.ip === connection.source)) || { id: "" };
    const target = nodes.find(node => node.interfaces.find(ifc => ifc.ip === connection.target)) || { id: "" };
    links.push({ source: source.id, target: target.id });
}

export const nodelinks = links;


// export const links = [
//     // Core Routers Connections
//     { source: 1, target: 2 },
//     { source: 2, target: 3 },
//     { source: 3, target: 4 },
//     { source: 4, target: 5 },
//     { source: 5, target: 6 },
//     { source: 6, target: 7 },
//     { source: 7, target: 1 },

//     // Cluster 1 Links
//     { source: 1, target: 8 },
//     { source: 1, target: 9 },
//     { source: 1, target: 10 },
//     { source: 1, target: 11 },
//     { source: 1, target: 12 },

//     // Cluster 2 Links
//     { source: 2, target: 13 },
//     { source: 2, target: 14 },
//     { source: 2, target: 15 },
//     { source: 2, target: 16 },
//     { source: 2, target: 17 },

//     // Cluster 3 Links
//     { source: 3, target: 18 },
//     { source: 3, target: 19 },
//     { source: 3, target: 20 },
//     { source: 3, target: 21 },
//     { source: 3, target: 22 },

//     // Cluster 4 Links
//     { source: 4, target: 23 },
//     { source: 4, target: 24 },
//     { source: 4, target: 25 },
//     { source: 4, target: 26 },
//     { source: 4, target: 27 },

//     // Cluster 5 Links
//     { source: 5, target: 28 },
//     { source: 5, target: 29 },
//     { source: 5, target: 30 },
//     { source: 5, target: 31 },
//     { source: 5, target: 32 },

//     // Cluster 6 Links
//     { source: 6, target: 33 },
//     { source: 6, target: 34 },
//     { source: 6, target: 35 },
//     { source: 6, target: 36 },
//     { source: 6, target: 37 },
// ];

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

export const snmpData = [
    {
        index: 1,
        timestamp: '2024-09-15T08:45:00Z',
        routerID: 'Router1',
        consoleMessage: 'SNMP trap: Interface FastEthernet0/1 link status changed to DOWN'
    },
    {
        index: 2,
        timestamp: '2024-09-15T08:50:00Z',
        routerID: 'Router1',
        consoleMessage: 'SNMP trap: Interface FastEthernet0/1 link status changed to UP'
    },
    {
        index: 3,
        timestamp: '2024-09-15T09:00:00Z',
        routerID: 'Router2',
        consoleMessage: 'SNMP trap: High collision rate detected on FastEthernet0/2'
    },
    {
        index: 4,
        timestamp: '2024-09-15T09:10:00Z',
        routerID: 'Router2',
        consoleMessage: 'SNMP trap: Interface FastEthernet0/2 link status changed to DOWN'
    },
    {
        index: 5,
        timestamp: '2024-09-15T09:15:00Z',
        routerID: 'Router1',
        consoleMessage: 'SNMP trap: CPU usage exceeded 90% on Router1'
    },
    {
        index: 6,
        timestamp: '2024-09-15T09:20:00Z',
        routerID: 'Router2',
        consoleMessage: 'SNMP trap: Interface FastEthernet0/3 link status changed to UP'
    },
    {
        index: 7,
        timestamp: '2024-09-15T09:25:00Z',
        routerID: 'Router1',
        consoleMessage: 'SNMP trap: Spanning Tree Protocol (STP) topology change detected on FastEthernet0/1'
    },
    {
        index: 8,
        timestamp: '2024-09-15T09:30:00Z',
        routerID: 'Router2',
        consoleMessage: 'SNMP trap: Interface FastEthernet0/2 has recovered and link is UP'
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

// id = id
// timestamp = timestamp1
// severity = number
// message = %system-config_type: description
// soruce = not there
// host = ip_address

// serverity and codes

// 1. **Emergency**
// 2. **Alert**
// 3. **Critical**
// 4. **Error**
// 5. **Warning**
// 6. **Notice**
// 7. **Informational**
// 8. **Debug**


export const sysLogData = [
    {
        "id": 1,
        "timestamp1": "1900-09-09T11:55:53",
        "timestamp2": "1900-03-01T09:52:13.577000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "SYS-CONFIG_I:Configured from console by console"
    },
    {
        "id": 2,
        "timestamp1": "1900-09-10T00:58:14",
        "timestamp2": "1900-03-01T13:22:17.520000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "SYS-CONFIG_I:Configured from console by console"
    },
    {
        "id": 3,
        "timestamp1": "1900-09-10T00:59:43",
        "timestamp2": "1900-03-01T13:23:53.416000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "SYS-CONFIG_I:Configured from console by console"
    },
    {
        "id": 4,
        "timestamp1": "1900-09-10T01:01:15",
        "timestamp2": "1900-03-01T13:25:25.324000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "SYS-CONFIG_I:Configured from console by console"
    },
    {
        "id": 5,
        "timestamp1": "1900-09-10T01:02:09",
        "timestamp2": "1900-03-01T13:26:19.388000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "LINK-CHANGED:Interface FastEthernet0/1, changed state to administratively down"
    },
    {
        "id": 6,
        "timestamp1": "1900-09-10T01:02:09",
        "timestamp2": "1900-03-01T13:26:20.300000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "SYS-CONFIG_I:Configured from console by console"
    },
    {
        "id": 7,
        "timestamp1": "1900-09-10T01:02:09",
        "timestamp2": "1900-03-01T13:26:20.388000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "LINEPROTO-UPDOWN:Line protocol on Interface FastEthernet0/1, changed state to down"
    },
    {
        "id": 8,
        "timestamp1": "1900-09-10T01:03:13",
        "timestamp2": "1900-03-01T13:27:23.636000",
        "ip_address": "192.168.100.5",
        "severity": "3",
        "message": "LINK-UPDOWN:Interface FastEthernet0/1, changed state to up"
    },
    {
        "id": 9,
        "timestamp1": "1900-09-10T01:03:14",
        "timestamp2": "1900-03-01T13:27:24.132000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "SYS-CONFIG_I:Configured from console by console"
    },
    {
        "id": 10,
        "timestamp1": "1900-09-10T01:03:14",
        "timestamp2": "1900-03-01T13:27:24.636000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "LINEPROTO-UPDOWN:Line protocol on Interface FastEthernet0/1, changed state to up"
    },
    {
        "id": 11,
        "timestamp1": "1900-09-10T15:01:42",
        "timestamp2": "1900-03-01T15:20:34.612000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "SYS-CONFIG_I:Configured from console by console"
    },
    {
        "id": 12,
        "timestamp1": "1900-09-10T15:08:55",
        "timestamp2": "1900-03-01T00:00:03.159000",
        "ip_address": "192.168.100.5",
        "severity": "6",
        "message": "SYS-LOGGINGHOST_STARTSTOP:Logging to host 192.168.100.1 started - CLI initiated"
    },
    {
        "id": 13,
        "timestamp1": "1900-09-10T15:08:57",
        "timestamp2": "1900-03-01T00:00:04.107000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "LINEPROTO-UPDOWN:Line protocol on Interface FastEthernet0/0, changed state to up"
    },
    {
        "id": 14,
        "timestamp1": "1900-09-10T15:08:57",
        "timestamp2": "1900-03-01T00:00:04.115000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "LINEPROTO-UPDOWN:Line protocol on Interface FastEthernet0/1, changed state to up"
    },
    {
        "id": 15,
        "timestamp1": "1900-09-10T15:08:57",
        "timestamp2": "1900-03-01T00:00:04.143000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "LINEPROTO-UPDOWN:Line protocol on Interface FastEthernet1/0, changed state to up"
    },
    {
        "id": 16,
        "timestamp1": "1900-09-10T15:09:58",
        "timestamp2": "1900-03-01T15:03:37.688000",
        "ip_address": "192.168.108.2",
        "severity": "5",
        "message": "SYS-CONFIG_I:Configured from console by console"
    },
    {
        "id": 17,
        "timestamp1": "1900-09-10T15:11:49",
        "timestamp2": "1900-03-01T00:02:49.635000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "DUAL-NBRCHANGE:IP-EIGRP(0) 100: Neighbor 192.168.108.2 (FastEthernet1/0) is down: holding time expired"
    },
    {
        "id": 18,
        "timestamp1": "1900-09-10T19:58:19",
        "timestamp2": "1900-03-01T03:00:28.975000",
        "ip_address": "192.168.100.5",
        "severity": "5",
        "message": "LINEPROTO-UPDOWN:Line protocol on Interface NVI0, changed state to up"
    },
    {
        "id": 19,
        "timestamp1": "1900-09-10T19:58:22",
        "timestamp2": "1900-03-01T03:00:35.435000",
        "ip_address": "192.168.100.5",
        "severity": "3",
        "message": "SYS-CPUHOG:Task is running for (2036)msecs, more than (2000)msecs (0/0),process = Exec."
    },
    {
        "id": 20,
        "timestamp1": "1900-09-10T19:58:22",
        "timestamp2": "1900-03-01T03:00:36.719000",
        "ip_address": "192.168.100.5",
        "severity": "3",
        "message": "SYS-CPUYLD:Task ran for (3320)msecs, more than (2000)msecs (0/0),process = Exec"
    }
]

export const NetworkDeviceMonitor = [
    {
        monitor: "GAIL-ROU-01GUJ",
        status: "up",
        ip: "10.1.1.1",
        type: "router",
        group: "SCADA > Gas Pipeline > Gujarat",
        osVersion: "Cisco IOS Software [3250]",
        systemDescription: "Cisco Catalyst 3750-24TS",
        model: "Catalyst 3750",
    },
    {
        monitor: "GAIL-ROU-02MH",
        status: "up",
        ip: "10.2.1.1",
        type: "router",
        group: "SCADA > Gas Pipeline > Maharashtra",
        osVersion: "Cisco IOS Software [3250]",
        systemDescription: "Cisco Catalyst 3750G-12S",
        model: "Catalyst 3750",
    },
    {
        monitor: "GAIL-ROU-03UP",
        status: "unreachable",
        ip: "192.168.10.2",
        type: "router",
        group: "SCADA > Gas Pipeline > Uttar Pradesh",
        osVersion: "Cisco IOS Software [3250]",
        systemDescription: "Cisco Catalyst 3750E-24TD",
        model: "Catalyst 3750",
    },
    {
        monitor: "GAIL-ROU-04RJ",
        status: "down",
        ip: "10.3.5.1",
        type: "router",
        group: "SCADA > Gas Pipeline > Rajasthan",
        osVersion: "Cisco IOS Software [3250]",
        systemDescription: "Cisco Catalyst 3750X-48P",
        model: "Catalyst 3750",
    },
    {
        monitor: "GAIL-ROU-05DL",
        status: "up",
        ip: "192.168.20.10",
        type: "router",
        group: "SCADA > Gas Pipeline > Delhi",
        osVersion: "Cisco IOS Software [3250]",
        systemDescription: "Cisco Catalyst 3750V2-48PS",
        model: "Catalyst 3750",
    },
    {
        monitor: "GAIL-ROU-06WB",
        status: "up",
        ip: "10.4.6.2",
        type: "router",
        group: "SCADA > Gas Pipeline > West Bengal",
        osVersion: "Cisco IOS Software [3250]",
        systemDescription: "Cisco Catalyst 3750-48TS",
        model: "Catalyst 3750",
    },
    {
        monitor: "GAIL-ROU-07KA",
        status: "unreachable",
        ip: "192.168.50.5",
        type: "router",
        group: "SCADA > Gas Pipeline > Karnataka",
        osVersion: "Cisco IOS Software [3250]",
        systemDescription: "Cisco Catalyst 3750E-48PD",
        model: "Catalyst 3750",
    },
    {
        monitor: "GAIL-ROU-08TN",
        status: "down",
        ip: "10.5.2.1",
        type: "router",
        group: "SCADA > Gas Pipeline > Tamil Nadu",
        osVersion: "Cisco IOS Software [3250]",
        systemDescription: "Cisco Catalyst 3750G-24T",
        model: "Catalyst 3750",
    },
    {
        monitor: "GAIL-ROU-09AP",
        status: "up",
        ip: "10.6.3.1",
        type: "router",
        group: "SCADA > Gas Pipeline > Andhra Pradesh",
        osVersion: "Cisco IOS Software [3250]",
        systemDescription: "Cisco Catalyst 3750-12S",
        model: "Catalyst 3750",
    },
    {
        monitor: "GAIL-ROU-10HR",
        status: "up",
        ip: "10.7.4.10",
        type: "router",
        group: "SCADA > Gas Pipeline > Haryana",
        osVersion: "Cisco IOS Software [3250]",
        systemDescription: "Cisco Catalyst 3750X-24T",
        model: "Catalyst 3750",
    },
];

