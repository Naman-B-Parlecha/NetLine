import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuLoader2 } from "react-icons/lu";

// interface Version {
//   id: any
//   nodes
// }

interface VersionSelectorProps {
  versions: any[];
  selectedVersion: string | null;
  onVersionChange: (version: any) => void;
  isloading: boolean;
}

const VersionSelector = ({
  versions,
  selectedVersion,
  onVersionChange,
  isloading,
}: VersionSelectorProps) => {
  console.log("here -> ", versions);

  return (
    <div className="mb-4">
      <Select value={selectedVersion || ""} onValueChange={onVersionChange}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select a version" />
        </SelectTrigger>  
        <SelectContent>
          {versions.map((version) => (
            <SelectItem key={version.id} value={version.id}>
              {/* {new Date(version.timestamp).toLocaleString()} -{" "}
              {version.hash.substring(0, 7)} */}
              {version.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VersionSelector;
