import React from "react";
import { ArrowRight } from "lucide-react";
import cls from "./customStyles.module.css";

interface NetworkSimulatorProps {
  srcIp: string;
  destIp: string;
  protocol: string;
  timestamp: string;
  bytes: string;
}

export default function Component({
  srcIp = "192.168.1.1",
  destIp = "10.0.0.1",
  protocol = "TCP",
  timestamp = "2023-06-15 14:30:00",
  bytes = "450",
}: NetworkSimulatorProps) {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold font-mono text-gray-900 mb-4">
        Router-Sensor Network Logs
      </h1>
      <div className={`flex flex-col gap-4 w-full h-[93%] overflow-auto ${cls.scroll}`}>
        <div className="p-4 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner ">
          <div className="text-xs text-gray-500 mb-2">{timestamp}</div>
          <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden p-4 bg-white">
            <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
              <h3 className="font-semibold text-lg">
                Source IP: <span className="font-normal">{srcIp}</span>
              </h3>
            </div>
            <div className="flex flex-col items-center mx-6 flex-grow">
              <span className="text-sm text-gray-500 mb-2">{protocol}</span>
              <div className="w-full h-1 bg-blue-500 relative">
                <ArrowRight className="w-8 h-8 text-blue-500 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 transition-transform duration-300 ease-in-out hover:translate-x-4" />
              </div>
              <span className="text-sm text-gray-500 mt-2">{bytes} bytes</span>
            </div>
            <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
              <h3 className="font-semibold text-lg">
                Destination IP: <span className="font-normal">{destIp}</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="p-4 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner ">
          <div className="text-xs text-gray-500 mb-2">{timestamp}</div>
          <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden p-4 bg-white">
            <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
              <h3 className="font-semibold text-lg">
                Source IP: <span className="font-normal">{srcIp}</span>
              </h3>
            </div>
            <div className="flex flex-col items-center mx-6 flex-grow">
              <span className="text-sm text-gray-500 mb-2">{protocol}</span>
              <div className="w-full h-1 bg-blue-500 relative">
                <ArrowRight className="w-8 h-8 text-blue-500 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 transition-transform duration-300 ease-in-out hover:translate-x-4" />
              </div>
              <span className="text-sm text-gray-500 mt-2">{bytes} bytes</span>
            </div>
            <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
              <h3 className="font-semibold text-lg">
                Destination IP: <span className="font-normal">{destIp}</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="p-4 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner ">
          <div className="text-xs text-gray-500 mb-2">{timestamp}</div>
          <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden p-4 bg-white">
            <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
              <h3 className="font-semibold text-lg">
                Source IP: <span className="font-normal">{srcIp}</span>
              </h3>
            </div>
            <div className="flex flex-col items-center mx-6 flex-grow">
              <span className="text-sm text-gray-500 mb-2">{protocol}</span>
              <div className="w-full h-1 bg-blue-500 relative">
                <ArrowRight className="w-8 h-8 text-blue-500 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 transition-transform duration-300 ease-in-out hover:translate-x-4" />
              </div>
              <span className="text-sm text-gray-500 mt-2">{bytes} bytes</span>
            </div>
            <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
              <h3 className="font-semibold text-lg">
                Destination IP: <span className="font-normal">{destIp}</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="p-4 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner ">
          <div className="text-xs text-gray-500 mb-2">{timestamp}</div>
          <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden p-4 bg-white">
            <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
              <h3 className="font-semibold text-lg">
                Source IP: <span className="font-normal">{srcIp}</span>
              </h3>
            </div>
            <div className="flex flex-col items-center mx-6 flex-grow">
              <span className="text-sm text-gray-500 mb-2">{protocol}</span>
              <div className="w-full h-1 bg-blue-500 relative">
                <ArrowRight className="w-8 h-8 text-blue-500 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 transition-transform duration-300 ease-in-out hover:translate-x-4" />
              </div>
              <span className="text-sm text-gray-500 mt-2">{bytes} bytes</span>
            </div>
            <div className="py-4 px-6 bg-gray-100 rounded-lg border border-black/20 text-gray-900">
              <h3 className="font-semibold text-lg">
                Destination IP: <span className="font-normal">{destIp}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
