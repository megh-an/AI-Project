import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { timeSeriesData } from "@/data/mockData";

const chartData = timeSeriesData.map((d) => ({
  time: new Date(d.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  "Temp (°C)": d.temperature,
  "Humidity (%)": d.humidity,
  "CO₂ (ppm)": Math.round(d.co2 / 10),
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

const EnvironmentChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-lg p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Environmental Conditions</h3>
          <p className="text-xs text-muted-foreground">Temperature, Humidity & CO₂</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} tickLine={false} axisLine={false} interval={3} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="Temp (°C)" stroke="hsl(0, 72%, 55%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Humidity (%)" stroke="hsl(200, 80%, 55%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="CO₂ (ppm)" stroke="hsl(152, 60%, 45%)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default EnvironmentChart;
