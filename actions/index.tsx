"use server";
import axios from "axios";

export async function getNetflowData() {
  try {
    const netflowData = await axios.get(`http://localhost:8000/netflow`);
    console.log(netflowData.data);
    return netflowData.data;
  } catch (error) {
    console.error("Error fetching netflow data:", error);
    return []; // Return an empty array in case of error
  }
}
export async function getSysLog() {
  try {
    const SysLog = await axios.get(`http://localhost:8000/syslog`);
    console.log(SysLog.data);
    return SysLog.data;
  } catch (error) {
    console.error("Error fetching syslog data:", error);
    return []; // Return an empty array in case of error
  }
}
export async function getNodes() {
  try {
    const nodes = await axios.get(`${process.env.NEXT_BASE_URL}/nodes`);
    console.log(nodes.data);
    return nodes.data;
  } catch (error) {
    console.error("Error fetching nodes data:", error);
    return []; // Return an empty array in case of error
  }
}
export async function getConnections() {
  try {
    const connections = await axios.get(`${process.env.NEXT_BASE_URL}/connections`);
    console.log(connections.data);
    return connections.data;
  } catch (error) {
    console.error("Error fetching connections data:", error);
    return []; // Return an empty array in case of error
  }
}
