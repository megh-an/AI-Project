import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { engineTimeSeriesData } from "@/data/mockData";

const chartData = engineTimeSeriesData.map((d) => ({
  time: new Date(d.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  "EGT (°C)": d.egt,
  "Vibration (IPS)": d.vibration,
  "Fuel Flow": Math.round(d.fuelFlow / 100),
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass rounded-md p-3 text-xs">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((entry: any, idx: number) => (
        <p key={idx} style={{ color: entry.color }} className="font-medium">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const EngineHealthChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-lg p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Engine Telemetry — N781AE</h3>
          <p className="text-xs text-muted-foreground">EGT, Vibration & Fuel Flow (24h)</p>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> EGT</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Vibration</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-info" /> Fuel Flow</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="gradEGT" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(175, 80%, 48%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(175, 80%, 48%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradVib" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradFuel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} tickLine={false} axisLine={false} interval={3} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="EGT (°C)" stroke="hsl(175, 80%, 48%)" fill="url(#gradEGT)" strokeWidth={2} />
          <Area type="monotone" dataKey="Vibration (IPS)" stroke="hsl(38, 92%, 55%)" fill="url(#gradVib)" strokeWidth={1.5} />
          <Area type="monotone" dataKey="Fuel Flow" stroke="hsl(200, 80%, 55%)" fill="url(#gradFuel)" strokeWidth={1.5} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default EngineHealthChart;
