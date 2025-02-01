import { Activity, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">EnergyTrack</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-sm font-medium text-gray-700 hover:text-primary">Dashboard</a>
            <a href="#analytics" className="text-sm font-medium text-gray-700 hover:text-primary">Analytics</a>
            <a href="#reports" className="text-sm font-medium text-gray-700 hover:text-primary">Reports</a>
          </nav>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;