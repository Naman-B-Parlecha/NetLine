import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuLoader2 } from "react-icons/lu";

interface VersionSelectorProps {
  versions: any[];
  selectedVersion: number | null;
  onVersionChange: (version: number) => void;
  isloading?: boolean;
}

const VersionSelector = ({
  versions,
  selectedVersion,
  onVersionChange,
}: VersionSelectorProps) => {
  console.log("here -> ", versions);

  const handleChange = (value: string) => {
    onVersionChange(parseFloat(value));
  };

  return (
    <div className="mb-4">
      <Select
        value={selectedVersion?.toString() || ""}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select a version" />
        </SelectTrigger>
        <SelectContent>
          {versions.map((version) => (
            <SelectItem key={version.id} value={version.id.toString()}>
              {version.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VersionSelector;
