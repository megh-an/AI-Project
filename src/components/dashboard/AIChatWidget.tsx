import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, MessageSquare, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const mockResponses: Record<string, string> = {
  default:
    "I'm the **Aersense AI Agent**. I monitor air quality across all sensor nodes, predict trends, and take autonomous actions to maintain optimal conditions.\n\nI can help you with:\n- 📊 Current air quality analysis\n- 🔮 Predictive trend forecasting\n- 🤖 Reviewing autonomous actions taken\n- ⚠️ Alert investigation & response\n\nWhat would you like to know?",
  air: "Based on current sensor data:\n\n| Metric | Value | Status |\n|--------|-------|--------|\n| AQI | 62 | Moderate |\n| PM2.5 | 18 µg/m³ | Acceptable |\n| CO₂ | 520 ppm | Normal |\n\n**Trend:** AQI has been gradually improving over the past 3 hours. I've proactively increased ventilation in Zone A where I detected a PM2.5 micro-spike 5 minutes ago.",
  predict:
    "**24-Hour Air Quality Forecast:**\n\n🟢 **Next 6 hours:** AQI expected to stay between 45-65 (Good-Moderate)\n🟡 **6-12 hours:** Slight increase predicted due to morning traffic patterns, AQI may reach 75\n🟢 **12-24 hours:** Return to baseline expected\n\n**Autonomous Actions Planned:**\n1. Pre-emptive ventilation boost at 7:00 AM\n2. HEPA filter activation if PM2.5 exceeds 35 µg/m³",
  action:
    "**Recent Autonomous Actions (Last 4 hours):**\n\n✅ Increased HVAC filtration in Zone A (2 min ago)\n⏳ Scheduled ventilation boost for Zone B (15 min ago)\n✅ Sent calibration command to Node Delta (1 hr ago)\n✅ Generated daily air quality report (2 hrs ago)\n\nAll actions were within my authorized parameters. No human override was needed.",
  alert:
    "**Active Alert Analysis:**\n\n🔴 **Critical:** PM2.5 threshold exceeded at Node Alpha\n- Root cause: External construction activity detected\n- My response: Boosted HVAC filtration, closed intake vents\n- ETA to resolution: ~45 minutes\n\n🟡 **Warning:** CO₂ rising in Zone B\n- Root cause: High occupancy + reduced ventilation\n- My response: Scheduled ventilation increase\n- Predicted resolution: 2 hours",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("air") || lower.includes("quality") || lower.includes("aqi") || lower.includes("pm")) return mockResponses.air;
  if (lower.includes("predict") || lower.includes("forecast") || lower.includes("trend")) return mockResponses.predict;
  if (lower.includes("action") || lower.includes("autonomous") || lower.includes("agent")) return mockResponses.action;
  if (lower.includes("alert") || lower.includes("warning") || lower.includes("critical")) return mockResponses.alert;
  return mockResponses.default;
};

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: mockResponses.default },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(userMsg.content);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg glow-primary hover:scale-105 transition-transform"
          >
            <MessageSquare className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[520px] glass rounded-xl flex flex-col overflow-hidden shadow-2xl border border-border/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Aersense AI Agent</p>
                  <p className="text-[10px] text-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" /> Active & Monitoring
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-secondary transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-xs prose-invert max-w-none [&_table]:text-[10px] [&_th]:px-2 [&_td]:px-2 [&_p]:my-1 [&_li]:my-0.5 [&_h1]:text-sm [&_h2]:text-xs [&_h3]:text-xs">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-lg px-3 py-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Bot className="h-3 w-3 animate-spin" />
                      Analyzing...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask the AI agent..."
                  className="flex-1 bg-secondary rounded-md px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={send}
                  disabled={!input.trim()}
                  className="p-2 rounded-md bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex gap-1.5 mt-2">
                {["Air quality?", "Predictions", "Agent actions", "Alerts"].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="text-[10px] px-2 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
