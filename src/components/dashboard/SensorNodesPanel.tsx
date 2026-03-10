import { motion } from "framer-motion";
import { Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { sensorNodes } from "@/data/mockData";

const statusConfig = {
  online: { icon: Wifi, color: "text-success", bg: "bg-success/10", label: "Online" },
  offline: { icon: WifiOff, color: "text-muted-foreground", bg: "bg-muted", label: "Offline" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", label: "Warning" },
};

const SensorNodesPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-lg p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Sensor Nodes</h3>
        <span className="text-xs text-muted-foreground">
          {sensorNodes.filter((n) => n.status === "online").length}/{sensorNodes.length} online
        </span>
      </div>
      <div className="space-y-2.5">
        {sensorNodes.map((node) => {
          const config = statusConfig[node.status];
          const Icon = config.icon;
          return (
            <div key={node.id} className="flex items-center gap-3 p-2.5 rounded-md bg-secondary/50 hover:bg-secondary transition-colors">
              <div className={`p-1.5 rounded ${config.bg}`}>
                <Icon className={`h-3.5 w-3.5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-foreground">{node.name}</p>
                  <span className={`text-[10px] ${config.color}`}>{config.label}</span>
                </div>
                <p className="text-[10px] text-muted-foreground truncate">{node.location}</p>
              </div>
              {node.status !== "offline" && (
                <div className="text-right">
                  <p className="text-xs font-mono font-medium text-foreground">AQI {node.lastReading.aqi}</p>
                  <p className="text-[10px] text-muted-foreground">PM2.5: {node.lastReading.pm25}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SensorNodesPanel;
