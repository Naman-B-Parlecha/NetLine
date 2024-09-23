import React from "react";
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

const data = [
  { name: "09:00", packets: 1, errors: 3 },
  { name: "09:30", packets: 2, errors: 4 },
  { name: "09:55", packets: 3, errors: 2 },
  { name: "10:30", packets: 4, errors: 4 },
  { name: "11:00", packets: 5, errors: 1 },
  { name: "11:30", packets: 2, errors: 0 },
  { name: "12:00", packets: 7, errors: 2 },
  { name: "12:30", packets: 5, errors: 3 },
  { name: "1:00 pm", packets: 3, errors: 6 },
  { name: "1:30 pm", packets: 4, errors: 2 },
  { name: "2:00 pm", packets: 6, errors: 4 },
  { name: "2:30 pm", packets: 2, errors: 6 },
  { name: "3:00 pm", packets: 1, errors: 1 },
];

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

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-gray-700">
            <span className="font-medium text-black">Source IP:</span> {srcIP}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-medium text-black">Destination IP:</span>{" "}
            {destIP}
          </p>
        </div>

        {/* Line chart for packets and errors */}
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "#555" }} 
                label={{ value: 'Time', position: 'bottom', offset: -5 }} // Adding margin to X-axis label
              />
              <YAxis 
                tick={{ fill: "#555" }} 
                label={{ value: 'Count', angle: -90, position: 'insideLeft', offset: 10 }} // Adding margin to Y-axis label
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
                dataKey="packets"
                stroke="#4bff91"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, stroke: "#00ffcc" }}
                className={`${cls.glowlinegreen}`}
              />
              <Line
                type="monotone"
                dataKey="errors"
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
