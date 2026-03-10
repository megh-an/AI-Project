import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  trendPositive?: boolean; // override: true = green for up
  status?: "good" | "moderate" | "poor" | "critical";
  delay?: number;
}

const statusColors = {
  good: "border-success/30",
  moderate: "border-warning/30",
  poor: "border-destructive/30",
  critical: "border-destructive/50 animate-pulse-glow",
};

const MetricCard = ({ title, value, unit, icon: Icon, trend, trendValue, trendPositive, status = "good", delay = 0 }: MetricCardProps) => {
  const trendColor = () => {
    if (!trend || trend === "stable") return "text-muted-foreground";
    if (trendPositive !== undefined) return trendPositive ? "text-success" : "text-destructive";
    return trend === "down" ? "text-success" : "text-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.05 }}
      className={`glass rounded-lg p-5 ${statusColors[status]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{title}</p>
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
          <span className={`text-xs font-medium ${trendColor()}`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </span>
          <span className="text-xs text-muted-foreground">vs yesterday</span>
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
