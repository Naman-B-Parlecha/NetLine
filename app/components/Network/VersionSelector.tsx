import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Version {
  hash: string;
  timestamp: string;
}

interface VersionSelectorProps {
  versions: Version[];
  selectedVersion: string | null;
  onVersionChange: (version: string) => void;
}

const VersionSelector = ({
  versions,
  selectedVersion,
  onVersionChange,
}: VersionSelectorProps) => {
  return (
    <div className="mb-4">
      <Select value={selectedVersion || ""} onValueChange={onVersionChange}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select a version" />
        </SelectTrigger>
        <SelectContent>
          {versions.map((version) => (
            <SelectItem key={version.hash} value={version.hash}>
              {new Date(version.timestamp).toLocaleString()} -{" "}
              {version.hash.substring(0, 7)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VersionSelector;
