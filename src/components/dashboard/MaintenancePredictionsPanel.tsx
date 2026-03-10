import { motion } from "framer-motion";
import { Wrench, AlertTriangle, ShieldAlert, Info } from "lucide-react";
import { maintenancePredictions } from "@/data/mockData";

const severityConfig = {
  critical: { icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
  info: { icon: Info, color: "text-info", bg: "bg-info/10", border: "border-info/30" },
};

const MaintenancePredictionsPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass rounded-lg p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Predictive Maintenance</h3>
          <p className="text-xs text-muted-foreground">AI failure predictions & recommendations</p>
        </div>
        <Wrench className="h-4 w-4 text-primary" />
      </div>
      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {maintenancePredictions.map((pred) => {
          const config = severityConfig[pred.severity];
          const Icon = config.icon;
          return (
            <div key={pred.id} className={`rounded-md border p-3 ${config.border}`}>
              <div className="flex items-start gap-2.5">
                <div className={`p-1.5 rounded ${config.bg} mt-0.5`}>
                  <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground">{pred.component}</p>
                    <span className="text-[10px] font-mono text-muted-foreground">{pred.aircraft}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{pred.recommendedAction}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-muted-foreground">Confidence: <span className="text-foreground font-medium">{pred.confidence}%</span></span>
                      <span className="text-[10px] text-muted-foreground">Cost: <span className="text-foreground font-medium">${(pred.estimatedCost / 1000).toFixed(0)}k</span></span>
                    </div>
                  </div>
                  {/* Remaining life bar */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-muted-foreground">Remaining Life</span>
                      <span className={pred.remainingLife < 20 ? "text-destructive" : pred.remainingLife < 40 ? "text-warning" : "text-success"}>{pred.remainingLife}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pred.remainingLife < 20 ? "bg-destructive" : pred.remainingLife < 40 ? "bg-warning" : "bg-success"}`}
                        style={{ width: `${pred.remainingLife}%` }}
                      />
                    </div>
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

export default MaintenancePredictionsPanel;
