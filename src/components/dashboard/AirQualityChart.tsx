import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { timeSeriesData } from "@/data/mockData";

const chartData = timeSeriesData.map((d) => ({
  time: new Date(d.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  AQI: d.aqi,
  "PM2.5": d.pm25,
  "PM10": d.pm10,
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

const AirQualityChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-lg p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Air Quality Trends</h3>
          <p className="text-xs text-muted-foreground">Last 24 hours</p>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> AQI</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> PM2.5</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-info" /> PM10</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="gradAQI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(175, 80%, 48%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(175, 80%, 48%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPM25" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPM10" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} tickLine={false} axisLine={false} interval={3} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="AQI" stroke="hsl(175, 80%, 48%)" fill="url(#gradAQI)" strokeWidth={2} />
          <Area type="monotone" dataKey="PM2.5" stroke="hsl(38, 92%, 55%)" fill="url(#gradPM25)" strokeWidth={1.5} />
          <Area type="monotone" dataKey="PM10" stroke="hsl(200, 80%, 55%)" fill="url(#gradPM10)" strokeWidth={1.5} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default AirQualityChart;
