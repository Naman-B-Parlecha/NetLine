"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const routes: {
  id: number;
  routeName: string;
  path: string;
  svg: React.ReactNode;
}[] = [
  {
    id: 1,
    routeName: "Network",
    path: "/network",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-network"
      >
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
        <path d="M12 12V8" />
      </svg>
    ),
  },
  {
    id: 2,
    routeName: "SysLog",
    path: "/syslog",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-logs"
      >
        <path d="M13 12h8" />
        <path d="M13 18h8" />
        <path d="M13 6h8" />
        <path d="M3 12h1" />
        <path d="M3 18h1" />
        <path d="M3 6h1" />
        <path d="M8 12h1" />
        <path d="M8 18h1" />
        <path d="M8 6h1" />
      </svg>
    ),
  },
  {
    id: 3,
    routeName: "Netflow",
    path: "/netflow",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chart-network"
      >
        <path d="m13.11 7.664 1.78 2.672" />
        <path d="m14.162 12.788-3.324 1.424" />
        <path d="m20 4-6.06 1.515" />
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <circle cx="12" cy="6" r="2" />
        <circle cx="16" cy="12" r="2" />
        <circle cx="9" cy="15" r="2" />
      </svg>
    ),
  },
  {
    id: 5,
    routeName: "Devices",
    path: "/devices",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-monitor-speaker"
      >
        <path d="M5.5 20H8" />
        <path d="M17 9h.01" />
        <rect width="10" height="16" x="12" y="4" rx="2" />
        <path d="M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" />
        <circle cx="17" cy="15" r="1" />
      </svg>
    ),
  },
  {
    id: 4,
    routeName: "SSH Terminal",
    path: "/ssh-terminal",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-terminal"
      >
        <path d="m4 10 4 4-4 4" />
        <path d="M12 18h8" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav
      className={`w-1/5 ${
        pathName.includes("ssh-terminal") ? "bg-[#000022]" : "bg-white"
      } p-4 flex flex-col gap-6 border-r-blue-500/20 border-r-2`}
    >
      <div className="w-full flex flex-row flex-nowrap items-center gap-2 p-2">
        <Image src={"/logo.png"} alt="logo" width={40} height={40} />
        <h1 className={`text-3xl font-bold ${pathName.includes("ssh-terminal") ? "text-white" : ""}`}>
          Net<span className="text-blue-500">Line</span>
        </h1>
      </div>
      <ul className="space-y-2 font-medium">
        {routes.map((route) => (
          <li key={route.id.toString()}>
            <Link
              href={route.path}
              className={`flex items-center p-4 text-gray-900 rounded-lg  group w-full ${
                pathName.includes(route.path)
                  ? "bg-blue-500 text-white hover:bg-blue-500/100"
                  : "hover:bg-blue-500/15"
              } ${pathName.includes("ssh-terminal") ? "text-white" : ""}`}
            >
              {route.svg}
              <span className="ms-3">{route.routeName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
