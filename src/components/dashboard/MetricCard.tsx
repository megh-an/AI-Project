import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  status?: "good" | "moderate" | "poor" | "critical";
}

const statusColors = {
  good: "text-success border-success/30 glow-primary",
  moderate: "text-warning border-warning/30",
  poor: "text-destructive border-destructive/30",
  critical: "text-destructive border-destructive/50 animate-pulse-glow",
};

const MetricCard = ({ title, value, unit, icon: Icon, trend, trendValue, status = "good" }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass rounded-lg p-5 ${statusColors[status]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className="p-2 rounded-md bg-secondary">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {trend && trendValue && (
        <div className="mt-2 flex items-center gap-1">
          <span className={`text-xs font-medium ${
            trend === "down" ? "text-success" : trend === "up" ? "text-destructive" : "text-muted-foreground"
          }`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </span>
          <span className="text-xs text-muted-foreground">vs last hour</span>
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
