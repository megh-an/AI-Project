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
    "I'm the **Aerosense AI Agent** — your aircraft predictive intelligence system. I monitor fleet health, predict failures, optimize flights, and take autonomous actions.\n\nI can help you with:\n- ✈️ Flight delay predictions & route optimization\n- 🔧 Predictive maintenance & failure forecasting\n- ⛽ Fuel efficiency analysis\n- 🌩️ Weather impact assessment\n- 🤖 Reviewing autonomous agent actions\n\nWhat would you like to know?",
  engine:
    "**Engine Health Analysis — Fleet Summary:**\n\n| Aircraft | Engine Health | Status |\n|----------|-------------|--------|\n| N781AE | 94% | ✅ Nominal |\n| N445BX | 88% | ⚠️ Monitor APU |\n| N923CF | 97% | ✅ Excellent |\n| N112DK | 72% | 🔴 Turbine blade fatigue |\n| N667EL | 91% | ✅ Good |\n| N334FM | 65% | 🔴 Hydraulic issue |\n\n**AI Recommendation:** N112DK requires immediate turbine blade replacement. I've already grounded the aircraft and initiated the maintenance protocol. Estimated repair time: 18 hours.",
  flight:
    "**Active Flight Predictions:**\n\n🟢 **SL-1042 (JFK→LAX):** On time, +12min buffer. Tailwind advantage at FL380.\n\n🔴 **SL-2087 (ORD→MIA):** High delay risk — 45min predicted. Thunderstorm cell detected.\n- **Agentic Action:** I've calculated an alternate route via FL320 that reduces the delay to 18min and avoids severe turbulence.\n\n🟢 **TO-0551 (SFO→NRT):** Optimal conditions. Jet stream aligned at FL410. Fuel savings estimated at 2,400L.\n\n🟡 **GW-8834 (LHR→DXB):** Moderate delay risk from Mediterranean headwinds. Monitoring.",
  maintenance:
    "**Predictive Maintenance Forecast:**\n\n🔴 **Critical — N112DK Turbine Blade #3:**\n- Predicted failure: March 15 (92% confidence)\n- Remaining life: 12%\n- Cost: $185,000\n- **Status:** Already grounded. Parts ordered.\n\n🔴 **Critical — N334FM Hydraulic Pump:**\n- Predicted failure: March 20 (87% confidence)\n- Remaining life: 8%\n- Cost: $42,000\n- **Agentic action:** Spare parts pre-positioned at base\n\n🟡 **Warning — N445BX APU Starter:**\n- Predicted failure: April 5 (78% confidence)\n- Remaining life: 35%\n- Scheduled for next C-check",
  fuel:
    "**Fuel Optimization Report (Today):**\n\n⛽ **Total fuel saved:** 84,200 L (fleet-wide, AI-optimized)\n\n**Per-flight optimizations:**\n- TO-0551: Saved 2,400L via jet stream routing\n- SL-1042: Saved 800L via optimal altitude selection\n- RJ-4421: Saved 350L via weight distribution optimization\n\n**Anomaly:** N445BX showing 8% higher fuel burn than model predicts. AI analysis suggests possible engine trim deviation. Recommendation: Ground inspection before next flight.\n\n**Monthly savings projection:** ~$340,000 in fuel costs",
  weather:
    "**Weather Impact Analysis:**\n\n🌩️ **Active Weather Systems:**\n\n1. **Thunderstorm cell — Central US (FL280-FL380)**\n   - Affects: SL-2087 (ORD→MIA)\n   - AI action: Rerouted below FL320\n   - Impact: +18min delay (reduced from +45min)\n\n2. **Headwind band — Mediterranean (40kt)**\n   - Affects: GW-8834 (LHR→DXB)\n   - AI action: Monitoring, may adjust altitude\n   - Impact: +28min estimated\n\n3. **Jet stream — North Pacific (favorable)**\n   - Benefits: TO-0551 (SFO→NRT)\n   - Fuel savings: ~2,400L\n\n**Forecast:** Conditions improving across all sectors by tomorrow 0600Z.",
  action:
    "**Autonomous Agent Actions (Last 4 hours):**\n\n✅ Grounded N112DK — turbine blade fatigue detected (5 min ago)\n✅ Rerouted SL-2087 around thunderstorm cell (15 min ago)\n✅ Generated fleet maintenance report (45 min ago)\n✅ Optimized TO-0551 fuel load for jet stream (1 hr ago)\n✅ Rescheduled N923CF maintenance to optimize costs (2 hrs ago)\n⏳ Pre-positioning parts for N334FM hydraulic repair (3 hrs ago)\n✅ Updated engine degradation models (4 hrs ago)\n\n**Decisions pending human approval:** None\n**Overrides in last 24h:** 0",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("engine") || lower.includes("health") || lower.includes("turbine")) return mockResponses.engine;
  if (lower.includes("flight") || lower.includes("delay") || lower.includes("route")) return mockResponses.flight;
  if (lower.includes("maintenance") || lower.includes("failure") || lower.includes("repair")) return mockResponses.maintenance;
  if (lower.includes("fuel") || lower.includes("efficiency") || lower.includes("consumption")) return mockResponses.fuel;
  if (lower.includes("weather") || lower.includes("turbulence") || lower.includes("storm")) return mockResponses.weather;
  if (lower.includes("action") || lower.includes("agent") || lower.includes("autonomous")) return mockResponses.action;
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] h-[540px] glass rounded-xl flex flex-col overflow-hidden shadow-2xl border border-border/50"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10 animate-pulse-glow">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Aerosense AI Agent</p>
                  <p className="text-[10px] text-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" /> Monitoring 6 aircraft
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-secondary transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

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
                      <Bot className="h-3 w-3 animate-spin" /> Analyzing fleet data...
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about flights, engines, maintenance..."
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
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {["Engine health?", "Flight delays", "Maintenance", "Fuel savings", "Weather", "Agent actions"].map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
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
