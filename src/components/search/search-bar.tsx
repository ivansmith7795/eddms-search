import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ onSearch, value, onChange }: SearchBarProps) {
  return (
    <div className="flex w-full max-w-2xl gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search documents..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
          onKeyDown={(e) => e.key === "Enter" && onSearch(value)}
        />
      </div>
      <Button onClick={() => onSearch(value)}>
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
}
