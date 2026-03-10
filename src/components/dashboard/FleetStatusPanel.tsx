import { motion } from "framer-motion";
import { Plane, Wrench, AlertOctagon, CheckCircle } from "lucide-react";
import { aircraft } from "@/data/mockData";

const statusConfig = {
  "in-flight": { icon: Plane, color: "text-success", bg: "bg-success/10", label: "In Flight" },
  ready: { icon: CheckCircle, color: "text-info", bg: "bg-info/10", label: "Ready" },
  maintenance: { icon: Wrench, color: "text-warning", bg: "bg-warning/10", label: "Maintenance" },
  grounded: { icon: AlertOctagon, color: "text-destructive", bg: "bg-destructive/10", label: "Grounded" },
};

const FleetStatusPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-lg p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Fleet Status</h3>
        <span className="text-xs text-muted-foreground">
          {aircraft.filter((a) => a.status === "in-flight").length}/{aircraft.length} active
        </span>
      </div>
      <div className="space-y-2.5">
        {aircraft.map((ac) => {
          const config = statusConfig[ac.status];
          const Icon = config.icon;
          return (
            <div key={ac.id} className="flex items-center gap-3 p-2.5 rounded-md bg-secondary/50 hover:bg-secondary transition-colors">
              <div className={`p-1.5 rounded ${config.bg}`}>
                <Icon className={`h-3.5 w-3.5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-mono font-bold text-foreground">{ac.tailNumber}</p>
                  <span className={`text-[10px] ${config.color}`}>{config.label}</span>
                </div>
                <p className="text-[10px] text-muted-foreground truncate">{ac.model} • {ac.airline}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-foreground">{ac.engineHealth}%</p>
                <p className="text-[10px] text-muted-foreground">Engine</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FleetStatusPanel;
