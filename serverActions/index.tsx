"use server";
import axios from "axios";

export async function getNetflowData() {
  try {
    const netflowData = await axios.get(`https://infra-net-line.vercel.app/netflow`);
    console.log(netflowData.data);
    return netflowData.data;
  } catch (error) {
    console.error("Error fetching netflow data:", error);
    return [];
  }
}

export async function getSysLog() {
  try {
    const SysLog = await axios.get(`https://infra-net-line.vercel.app/syslog`);
    console.log(SysLog.data);
    return SysLog.data;
  } catch (error) {
    console.error("Error fetching syslog data:", error);
    return [];
  }
}

export async function getNetworkMonitoring() {
  try {
    const networkMonitoring = await axios.get(`https://infra-net-line.vercel.app/networkMonitoring`);
    console.log(networkMonitoring.data);
    return networkMonitoring.data;
  } catch (error) {
    console.error("Error fetching syslog data:", error);
    return [];
  }
}

// integrate tmr in airport
export async function getNetwork(selectedVersion: number | null) {
  try {
    let nodes = await axios.get(
      `https://infra-net-line.vercel.app/network/${selectedVersion}`  
    );
    console.log("NETWORK DATA:",nodes['data']);
    // for(let i=0; i<nodes['data']['interfaces'].length; i++){
    //   if (nodes.data['interfaces'][i]['ip'] !== null){
    //     const node_id = nodes.data['interfaces'][i]['node_id']
    //     if(nodes['data'][node_id]['interfaces']){
    //       nodes['data'][node_id]['interfaces'].push(nodes.data['interfaces'][i]);
    //     }
    //     else{
    //       nodes['data'][node_id]['interfaces']=[(nodes.data['interfaces'][i])];
    //     }
    //   }
    // }
    // console.log('Final Network')
    // console.log(JSON.parse(nodes.data))
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
    const versions = await axios.get(`https://infra-net-line.vercel.app/versions`);
    console.log("version ->", versions.data);
    let list: any = [];
    versions.data.map((item: any) => {
      list.unshift({ id: item.version });
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
//     const nodes = await axios.get(`https://infra-net-line.vercel.app/network`);
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
    const netflowData = await axios.get(`https://infra-net-line.vercel.app/netflow/${id}`);
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
