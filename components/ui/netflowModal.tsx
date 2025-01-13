"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import cls from "./netflowmodal.module.css";
import axios from "axios";
import { getNetFlowById } from "@/serverActions";
import { netflow } from "@/app/constants/netflow";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  srcIP: string;
  destIP: string;
}

const NetflowModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  srcIP,
  destIP,
}) => {
  const [option, setOption] = useState("src");
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const fetchfnc = async () => {
      const response = await getNetFlowById(option === "src" ? srcIP : destIP);
      const filterData = netflow.filter((e) =>
        option === "src" ? srcIP === e.src_ip : destIP === e.dst_ip
      );
      setData(filterData);
    };

    fetchfnc();
  }, [srcIP, option, destIP]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold text-black">
              IP Information
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-700 mt-2">
            Here are the details of Netflow data based on the provided IPs:
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-100 p-4 rounded-md flex flex-col item-center w-full">
          <div className="flex gap-4 w-full mb-4 justify-center">
            <p className="text-gray-700 ">
              <span className="font-medium text-black">Source IP:</span> {srcIP}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-black">Destination IP:</span>{" "}
              {destIP}
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              className="bg-black px-4 py-2 text-sm font-medium text-white font-mono rounded-md w-fit"
              onClick={() => {
                setOption((prev) => (prev === "src" ? "dest" : "src"));
              }}
            >
              check stats of {option === "src" ? "source" : "destination"}
            </button>
          </div>
        </div>

        {/* Line chart for packets and errors */}
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="timestamp"
                tick={{ fill: "#555" }}
                label={{ value: "Time", position: "bottom", offset: -5 }} // Adding margin to X-axis label
              />
              <YAxis
                tick={{ fill: "#555" }}
                label={{
                  value: "Count",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                }} // Adding margin to Y-axis label
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #ccc",
                  color: "#333",
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ color: "#333" }}
              />
              <Line
                type="monotone"
                dataKey="in_bytes"
                stroke="#4bff91"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, stroke: "#00ffcc" }}
                className={`${cls.glowlinegreen}`}
              />
              <Line
                type="monotone"
                dataKey="out_bytes"
                stroke="#ff4d4d"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, stroke: "#ff9999" }}
                className={`${cls.glowlinered}`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NetflowModal;
