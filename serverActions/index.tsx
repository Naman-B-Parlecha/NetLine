"use server";
import { mockLogs, snmpmock } from "@/app/constants";
import axios from "axios";

export async function getNetflowData() {
  try {
    const netflowData = await axios.get(`http://localhost:8000/netflow`);
    // console.log(netflowData.data);
    return netflowData.data;
  } catch (error) {
    console.error("Error fetching netflow data:", error);
    return [];
  }
}

export async function getSysLog() {
  try {
    const SysLog = await axios.get(`http://localhost:8000/syslog`);
    console.log(SysLog.data);
    return SysLog.data;
  } catch (error) {
    console.error("Error fetching syslog data:", error);
    return [];
  }
}

// integrate tmr in airport
export async function getNetwork(selectedVersion: number | null) {
  try {
    const nodes = await axios.get(
      `http://localhost:8000/network/${selectedVersion}`
    );
    return nodes.data;
  } catch (error) {
    console.error("Error fetching nodes data:", error);
    return {
      nodes: [],
      connections: [],
    };
  }
}

export async function getVersions() {
  try {
    const versions = await axios.get(`http://localhost:8000/versions`);
    console.log("version ->", versions.data);
    let list: any = [];
    versions.data.map((item: any) => {
      list.push({ id: item.version });
    });

    console.log("inside ->", list);
    return list;
  } catch (error) {
    console.error("Error fetching nodes data:", error);
    return [];
  }
}

// export async function getNetwork() {
//   try {
//     const nodes = await axios.get(`http://localhost:8000/network`);
//     // console.log(nodes.data);
//     return nodes.data;
//   } catch (error) {
//     console.error("Error fetching nodes data:", error);
//     return {
//       nodes: [],
//       connections: [],
//     };
//   }
// }

export async function getNetFlowById(id: string) {
  try {
    const netflowData = await axios.get(`http://localhost:8000/netflow/${id}`);
    console.log(netflowData.data);
    const filterdata =
      netflowData.data.length > 25 ? netflowData.data.slice(-50) : [];
    const formattedData = filterdata.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));
    console.log("length ==== ", formattedData.length);
    return formattedData;
  } catch (error) {
    console.error("Error fetching netflow data:", error);
    return [];
  }
}

export async function getSyslogPrediction(ip: string) {
  try {
    const mockIndex = mockLogs.findIndex(
      (e) => e.host.toLowerCase() === ip.toLowerCase()
    );

    const ind = mockLogs[mockIndex];
    if (!ind) {
      return null;
    }

    const severityMap = {
      emergency: 1,
      alert: 2,
      critical: 3,
      error: 4,
      warning: 5,
      notice: 6,
      informational: 7,
      debug: 8,
    };

    const ser =
      severityMap[ind.severity.toLowerCase() as keyof typeof severityMap] || 1;

    const body = {
      event: ind.message.split(":")[0],
      message: ind.message.split(":")[1],
      ip: ip,
      severity: ser,
      recv_date: ind.timestamp,
    };

    const response = await axios.post(
      `http://localhost:8000/syslog/prediction`,
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    return {
      prediction: response.data.prediction,
      failure_probability: response.data.failure_probability * 100,
      non_failure_probability: response.data.non_failure_probability * 100,
    };
  } catch (error) {
    console.error("Error fetching syslog prediction data:", error);
    return null;
  }
}

export async function getSnmpPrediction(index: number) {
  // console.log("Fetching prediction for IP:", ip);
  try {
    const snmplog = snmpmock[index];

    // console.log(mockIndex);
    if (!snmplog) {
      console.warn("No logs found for IP:", index);
      return null;
    }

    // // console.log("API Request Body:", body);

    const response = await axios.post(
      `http://localhost:8000/snmp/prediction`,
      {
        inbound_octets: snmplog.inboundOctets,
        outbound_octets: snmplog.outboundOctets,
        inbound_errors: snmplog.inboundErrors,
        outbound_errors: snmplog.outboundErrors,
        interface_type: snmplog.interfaceType,
        admin_status: snmplog.adminStatus,
        oper_status: snmplog.operStatus,
      },
      // snmplog,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("API Response SNMP:", response.data);

    return {
      predicted_failure: response.data.predicted_failure,
      failure_probability: response.data.failure_probability * 100,
      non_failure_probability: response.data.non_failure_probability *  100,
    };
  } catch (error) {
    console.error("Error fetching syslog prediction data:", error);
    return null;
  }
}
