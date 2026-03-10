// Aviation mock data for Aerosense AI

export interface Aircraft {
  id: string;
  tailNumber: string;
  model: string;
  airline: string;
  status: "in-flight" | "grounded" | "maintenance" | "ready";
  engineHealth: number; // 0-100
  nextMaintenance: string;
  totalFlightHours: number;
  cyclesSinceOverhaul: number;
}

export interface FlightPrediction {
  flightId: string;
  route: string;
  departure: string;
  arrival: string;
  predictedDelay: number; // minutes
  delayRisk: "low" | "medium" | "high";
  fuelEfficiency: number; // percentage
  turbulenceRisk: "none" | "light" | "moderate" | "severe";
  weatherImpact: string;
  optimalAltitude: number;
}

export interface EngineMetric {
  timestamp: string;
  egt: number; // Exhaust Gas Temp
  n1: number; // Fan speed %
  n2: number; // Core speed %
  oilPressure: number;
  oilTemp: number;
  vibration: number;
  fuelFlow: number;
}

export interface MaintenancePrediction {
  id: string;
  aircraft: string;
  component: string;
  predictedFailure: string;
  confidence: number;
  severity: "critical" | "warning" | "info";
  recommendedAction: string;
  estimatedCost: number;
  remainingLife: number; // percentage
}

export interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  source: string;
  acknowledged: boolean;
}

export interface AgentAction {
  time: string;
  action: string;
  status: "completed" | "scheduled" | "in-progress";
  category: string;
}

// Generate engine telemetry time series
const generateEngineData = (hours: number): EngineMetric[] => {
  const data: EngineMetric[] = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 3600000);
    data.push({
      timestamp: t.toISOString(),
      egt: Math.round(620 + Math.random() * 80 + Math.sin(i / 3) * 25),
      n1: Math.round((87 + Math.random() * 8 + Math.sin(i / 4) * 3) * 10) / 10,
      n2: Math.round((92 + Math.random() * 5 + Math.sin(i / 5) * 2) * 10) / 10,
      oilPressure: Math.round((45 + Math.random() * 15 + Math.sin(i / 6) * 5) * 10) / 10,
      oilTemp: Math.round(85 + Math.random() * 20 + Math.sin(i / 4) * 8),
      vibration: Math.round((0.8 + Math.random() * 1.2 + Math.sin(i / 3) * 0.3) * 100) / 100,
      fuelFlow: Math.round((2400 + Math.random() * 400 + Math.sin(i / 5) * 100)),
    });
  }
  return data;
};

export const engineTimeSeriesData = generateEngineData(24);

export const aircraft: Aircraft[] = [
  { id: "1", tailNumber: "N781AE", model: "Boeing 737-800", airline: "SkyLine Air", status: "in-flight", engineHealth: 94, nextMaintenance: "2026-03-18", totalFlightHours: 42350, cyclesSinceOverhaul: 1820 },
  { id: "2", tailNumber: "N445BX", model: "Airbus A320neo", airline: "SkyLine Air", status: "in-flight", engineHealth: 88, nextMaintenance: "2026-03-14", totalFlightHours: 38200, cyclesSinceOverhaul: 2450 },
  { id: "3", tailNumber: "N923CF", model: "Boeing 787-9", airline: "TransOcean", status: "ready", engineHealth: 97, nextMaintenance: "2026-04-02", totalFlightHours: 15800, cyclesSinceOverhaul: 680 },
  { id: "4", tailNumber: "N112DK", model: "Airbus A350-900", airline: "TransOcean", status: "maintenance", engineHealth: 72, nextMaintenance: "2026-03-10", totalFlightHours: 51200, cyclesSinceOverhaul: 3100 },
  { id: "5", tailNumber: "N667EL", model: "Boeing 777-300ER", airline: "GlobalWings", status: "in-flight", engineHealth: 91, nextMaintenance: "2026-03-22", totalFlightHours: 62400, cyclesSinceOverhaul: 1450 },
  { id: "6", tailNumber: "N334FM", model: "Embraer E195-E2", airline: "RegionalJet", status: "grounded", engineHealth: 65, nextMaintenance: "2026-03-11", totalFlightHours: 28900, cyclesSinceOverhaul: 3800 },
];

export const flightPredictions: FlightPrediction[] = [
  { flightId: "SL-1042", route: "JFK → LAX", departure: "14:30", arrival: "17:45", predictedDelay: 12, delayRisk: "low", fuelEfficiency: 94, turbulenceRisk: "light", weatherImpact: "Clear skies, tailwind 25kt", optimalAltitude: 38000 },
  { flightId: "SL-2087", route: "ORD → MIA", departure: "15:15", arrival: "19:20", predictedDelay: 45, delayRisk: "high", fuelEfficiency: 87, turbulenceRisk: "moderate", weatherImpact: "Thunderstorm cell at FL350", optimalAltitude: 32000 },
  { flightId: "TO-0551", route: "SFO → NRT", departure: "16:00", arrival: "19:30+1", predictedDelay: 0, delayRisk: "low", fuelEfficiency: 96, turbulenceRisk: "none", weatherImpact: "Optimal jet stream alignment", optimalAltitude: 41000 },
  { flightId: "GW-8834", route: "LHR → DXB", departure: "22:10", arrival: "06:45+1", predictedDelay: 28, delayRisk: "medium", fuelEfficiency: 91, turbulenceRisk: "light", weatherImpact: "Headwind 40kt over Mediterranean", optimalAltitude: 39000 },
  { flightId: "RJ-4421", route: "ATL → DFW", departure: "13:00", arrival: "14:30", predictedDelay: 8, delayRisk: "low", fuelEfficiency: 92, turbulenceRisk: "none", weatherImpact: "Clear conditions", optimalAltitude: 35000 },
];

export const maintenancePredictions: MaintenancePrediction[] = [
  { id: "1", aircraft: "N112DK", component: "Left Engine Turbine Blade #3", predictedFailure: "2026-03-15", confidence: 92, severity: "critical", recommendedAction: "Replace turbine blade assembly during current maintenance window", estimatedCost: 185000, remainingLife: 12 },
  { id: "2", aircraft: "N334FM", component: "Hydraulic Pump (System B)", predictedFailure: "2026-03-20", confidence: 87, severity: "critical", recommendedAction: "Immediate inspection and replacement of hydraulic pump seals", estimatedCost: 42000, remainingLife: 8 },
  { id: "3", aircraft: "N445BX", component: "APU Starter Motor", predictedFailure: "2026-04-05", confidence: 78, severity: "warning", recommendedAction: "Schedule replacement at next C-check", estimatedCost: 28000, remainingLife: 35 },
  { id: "4", aircraft: "N781AE", component: "Landing Gear Brake Assembly", predictedFailure: "2026-04-12", confidence: 74, severity: "warning", recommendedAction: "Monitor wear rate; replace if degradation exceeds 15%/week", estimatedCost: 65000, remainingLife: 42 },
  { id: "5", aircraft: "N667EL", component: "Cabin Pressure Controller", predictedFailure: "2026-05-01", confidence: 68, severity: "info", recommendedAction: "Include in next scheduled maintenance", estimatedCost: 15000, remainingLife: 58 },
];

export const alerts: Alert[] = [
  { id: "1", severity: "critical", title: "Engine Vibration Anomaly — N112DK", message: "AI detected abnormal vibration pattern in left engine (2.4 IPS vs 1.2 IPS baseline). Predictive model indicates 92% probability of turbine blade fatigue. Agentic action: Grounded aircraft, initiated maintenance protocol.", timestamp: new Date(Date.now() - 300000).toISOString(), source: "Engine Health AI", acknowledged: false },
  { id: "2", severity: "warning", title: "Delay Prediction — SL-2087", message: "Flight SL-2087 (ORD→MIA) predicted 45-min delay due to thunderstorm cell. AI has calculated alternate routing via FL320 to minimize impact to 18 min.", timestamp: new Date(Date.now() - 900000).toISOString(), source: "Flight Ops AI", acknowledged: false },
  { id: "3", severity: "warning", title: "Fuel Burn Deviation — N445BX", message: "N445BX showing 8% higher fuel consumption than predicted model. AI analysis: possible engine performance degradation or incorrect trim setting.", timestamp: new Date(Date.now() - 3600000).toISOString(), source: "Fuel Analytics AI", acknowledged: true },
  { id: "4", severity: "info", title: "Maintenance Window Optimized", message: "AI rescheduled N923CF maintenance from March 28 to April 2, avoiding peak demand period. Estimated savings: $12,400 in hangar costs.", timestamp: new Date(Date.now() - 7200000).toISOString(), source: "Maintenance AI", acknowledged: true },
];

export const agentActions: AgentAction[] = [
  { time: "5 min ago", action: "Grounded N112DK after detecting turbine blade fatigue signature", status: "completed", category: "Safety" },
  { time: "15 min ago", action: "Calculated alternate route for SL-2087 to avoid thunderstorm cell", status: "completed", category: "Flight Ops" },
  { time: "45 min ago", action: "Generated predictive maintenance report for fleet", status: "completed", category: "Maintenance" },
  { time: "1 hr ago", action: "Optimized fuel load for TO-0551 based on jet stream forecast", status: "completed", category: "Fuel" },
  { time: "2 hrs ago", action: "Rescheduled N923CF maintenance to optimize hangar utilization", status: "completed", category: "Planning" },
  { time: "3 hrs ago", action: "Pre-positioning spare parts for N334FM hydraulic repair", status: "scheduled", category: "Supply Chain" },
  { time: "4 hrs ago", action: "Updated fleet-wide engine degradation models with latest telemetry", status: "completed", category: "Analytics" },
];

export const fleetStats = {
  totalAircraft: aircraft.length,
  inFlight: aircraft.filter(a => a.status === "in-flight").length,
  ready: aircraft.filter(a => a.status === "ready").length,
  maintenance: aircraft.filter(a => a.status === "maintenance").length,
  grounded: aircraft.filter(a => a.status === "grounded").length,
  avgEngineHealth: Math.round(aircraft.reduce((sum, a) => sum + a.engineHealth, 0) / aircraft.length),
  predictedDelaysSaved: 127,
  fuelSavedLiters: 84200,
  maintenanceCostSaved: 1240000,
};
