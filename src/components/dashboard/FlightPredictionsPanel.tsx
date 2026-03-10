import { motion } from "framer-motion";
import { Plane, Clock, Fuel, Wind, ArrowRight } from "lucide-react";
import { flightPredictions } from "@/data/mockData";

const riskColors = {
  low: "text-success bg-success/10",
  medium: "text-warning bg-warning/10",
  high: "text-destructive bg-destructive/10",
};

const turbColors = {
  none: "text-success",
  light: "text-info",
  moderate: "text-warning",
  severe: "text-destructive",
};

const FlightPredictionsPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-lg p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Flight Predictions</h3>
          <p className="text-xs text-muted-foreground">AI-powered delay & route optimization</p>
        </div>
        <Plane className="h-4 w-4 text-primary" />
      </div>
      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {flightPredictions.map((flight) => (
          <div key={flight.flightId} className="rounded-md bg-secondary/50 p-3 hover:bg-secondary transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-primary">{flight.flightId}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  {flight.route.split(" → ")[0]} <ArrowRight className="h-3 w-3" /> {flight.route.split(" → ")[1]}
                </span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${riskColors[flight.delayRisk]}`}>
                {flight.delayRisk} risk
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-[11px]">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{flight.predictedDelay > 0 ? `+${flight.predictedDelay}m` : "On time"}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Fuel className="h-3 w-3" />
                <span>{flight.fuelEfficiency}%</span>
              </div>
              <div className={`flex items-center gap-1 ${turbColors[flight.turbulenceRisk]}`}>
                <Wind className="h-3 w-3" />
                <span className="capitalize">{flight.turbulenceRisk}</span>
              </div>
              <div className="text-muted-foreground text-right">
                FL{Math.round(flight.optimalAltitude / 100)}
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5 italic">{flight.weatherImpact}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FlightPredictionsPanel;
