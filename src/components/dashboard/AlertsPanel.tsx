import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, Info, Check } from "lucide-react";
import { alerts } from "@/data/mockData";
import { useState } from "react";

const severityConfig = {
  critical: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30" },
  warning: { icon: AlertCircle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
  info: { icon: Info, color: "text-info", bg: "bg-info/10", border: "border-info/30" },
};

const AlertsPanel = () => {
  const [alertList, setAlertList] = useState(alerts);

  const acknowledge = (id: string) => {
    setAlertList((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  };

  const timeAgo = (ts: string) => {
    const mins = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass rounded-lg p-5 lg:col-span-2"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">AI Alerts & Autonomous Actions</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive font-medium">
          {alertList.filter((a) => !a.acknowledged).length} active
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
        {alertList.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className={`rounded-md border p-3 ${config.border} ${alert.acknowledged ? "opacity-50" : ""}`}
            >
              <div className="flex items-start gap-2.5">
                <div className={`p-1.5 rounded ${config.bg} mt-0.5`}>
                  <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground">{alert.title}</p>
                    <span className="text-[10px] text-muted-foreground ml-2 whitespace-nowrap">{timeAgo(alert.timestamp)}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{alert.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-primary font-medium">{alert.source}</span>
                    {!alert.acknowledged && (
                      <button
                        onClick={() => acknowledge(alert.id)}
                        className="text-[10px] flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Check className="h-3 w-3" /> Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AlertsPanel;
