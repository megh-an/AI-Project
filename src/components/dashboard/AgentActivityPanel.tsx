import { motion } from "framer-motion";
import { Bot, CheckCircle, Clock, Play } from "lucide-react";
import { agentActions } from "@/data/mockData";

const statusIcons = {
  completed: CheckCircle,
  scheduled: Clock,
  "in-progress": Play,
};

const statusColors = {
  completed: "text-success",
  scheduled: "text-warning",
  "in-progress": "text-info",
};

const AgentActivityPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="glass rounded-lg p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-md bg-primary/10 animate-pulse-glow">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Agentic AI Log</h3>
          <p className="text-[10px] text-muted-foreground">Autonomous decisions & actions</p>
        </div>
      </div>
      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
        {agentActions.map((action, idx) => {
          const StatusIcon = statusIcons[action.status];
          return (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-0.5">
                <StatusIcon className={`h-3.5 w-3.5 ${statusColors[action.status]}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-foreground leading-relaxed">{action.action}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground">{action.time}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{action.category}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AgentActivityPanel;
