"use server";
import axios from "axios";

export async function getNetflowData() {
  try {
    const netflowData = await axios.get(`http://localhost:8000/netflow`);
    console.log(netflowData.data);
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
export async function getNetwork() {
  try {
    const nodes = await axios.get(`http://localhost:8000/network`);
    console.log(nodes.data);
    return nodes.data;
  } catch (error) {
    console.error("Error fetching nodes data:", error);
    return {
      nodes: [],
      connections: [],
    };
  }
}
