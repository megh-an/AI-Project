import { motion } from "framer-motion";
import { Bot, CheckCircle, Clock } from "lucide-react";
import { agentActions } from "@/data/mockData";

const AgentActivityPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass rounded-lg p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-md bg-primary/10">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Agentic AI Activity</h3>
          <p className="text-[10px] text-muted-foreground">Autonomous actions taken by AI</p>
        </div>
      </div>
      <div className="space-y-3">
        {agentActions.map((action, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="mt-1">
              {action.status === "completed" ? (
                <CheckCircle className="h-3.5 w-3.5 text-success" />
              ) : (
                <Clock className="h-3.5 w-3.5 text-warning" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs text-foreground leading-relaxed">{action.action}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{action.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AgentActivityPanel;
