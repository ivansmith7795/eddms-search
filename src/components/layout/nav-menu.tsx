import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export function NavMenu() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 rounded-full bg-card border border-border"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
      <div className="space-y-2 p-4">
        <Link to="/" className="block">
          <Button
            variant={location.pathname === "/" ? "default" : "ghost"}
            className={`w-full justify-start rounded-none h-14 ${isCollapsed ? "px-0 justify-center" : "px-4"}`}
          >
            <Search className={`h-4 w-4 ${isCollapsed ? "" : "mr-2"}`} />
            {!isCollapsed && "EDDMS Search"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
