import { Bell, Settings, RefreshCw } from "lucide-react";
import aersenseLogo from "@/assets/aersense-logo.png";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <img src={aersenseLogo} alt="Aerosense AI" className="h-9 w-9" />
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">Aerosense AI</h1>
          <p className="text-[10px] text-muted-foreground">Aircraft Predictive Intelligence Platform</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="mr-3 px-3 py-1.5 rounded-md bg-success/10 border border-success/20">
          <span className="text-[10px] text-success font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            AI Agent Active — All Systems Nominal
          </span>
        </div>
        <button className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <RefreshCw className="h-4 w-4" />
        </button>
        <button className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
        </button>
        <button className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
