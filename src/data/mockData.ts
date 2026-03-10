// Mock sensor data for Aersense AI dashboard

export interface SensorReading {
  timestamp: string;
  aqi: number;
  pm25: number;
  pm10: number;
  co2: number;
  temperature: number;
  humidity: number;
  voc: number;
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

export interface SensorNode {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "warning";
  lastReading: SensorReading;
}

const generateTimeSeriesData = (hours: number): SensorReading[] => {
  const data: SensorReading[] = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 3600000);
    data.push({
      timestamp: timestamp.toISOString(),
      aqi: Math.floor(40 + Math.random() * 80 + Math.sin(i / 4) * 20),
      pm25: Math.floor(8 + Math.random() * 35 + Math.sin(i / 3) * 10),
      pm10: Math.floor(15 + Math.random() * 50 + Math.sin(i / 5) * 15),
      co2: Math.floor(380 + Math.random() * 200 + Math.sin(i / 6) * 50),
      temperature: Math.round((20 + Math.random() * 8 + Math.sin(i / 8) * 3) * 10) / 10,
      humidity: Math.round((45 + Math.random() * 25 + Math.sin(i / 7) * 8) * 10) / 10,
      voc: Math.floor(50 + Math.random() * 150 + Math.sin(i / 4) * 30),
    });
  }
  return data;
};

export const timeSeriesData = generateTimeSeriesData(24);

export const latestReading: SensorReading = timeSeriesData[timeSeriesData.length - 1];

export const alerts: Alert[] = [
  {
    id: "1",
    severity: "critical",
    title: "PM2.5 Threshold Exceeded",
    message: "Sensor Node Alpha detected PM2.5 levels at 85 µg/m³, exceeding the 75 µg/m³ threshold. Agentic action: HVAC filtration boosted to max.",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    source: "Node Alpha",
    acknowledged: false,
  },
  {
    id: "2",
    severity: "warning",
    title: "CO₂ Rising Trend",
    message: "CO₂ levels trending upward across Zone B. Predicted to exceed 800ppm within 2 hours. Agentic action: Ventilation increase scheduled.",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    source: "Zone B Cluster",
    acknowledged: false,
  },
  {
    id: "3",
    severity: "info",
    title: "Sensor Calibration Complete",
    message: "Node Delta successfully recalibrated. All readings within expected ranges.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    source: "Node Delta",
    acknowledged: true,
  },
  {
    id: "4",
    severity: "warning",
    title: "VOC Anomaly Detected",
    message: "Unusual VOC spike detected at Node Gamma. AI analysis suggests possible cleaning chemical exposure. Monitoring active.",
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    source: "Node Gamma",
    acknowledged: true,
  },
];

export const sensorNodes: SensorNode[] = [
  {
    id: "alpha",
    name: "Node Alpha",
    location: "Building A - Floor 3",
    status: "warning",
    lastReading: { ...latestReading, aqi: 85, pm25: 42 },
  },
  {
    id: "beta",
    name: "Node Beta",
    location: "Building A - Floor 1",
    status: "online",
    lastReading: { ...latestReading, aqi: 42, pm25: 12 },
  },
  {
    id: "gamma",
    name: "Node Gamma",
    location: "Building B - Lab",
    status: "online",
    lastReading: { ...latestReading, aqi: 55, pm25: 18, voc: 210 },
  },
  {
    id: "delta",
    name: "Node Delta",
    location: "Outdoor Station",
    status: "online",
    lastReading: { ...latestReading, aqi: 68, pm25: 28 },
  },
  {
    id: "epsilon",
    name: "Node Epsilon",
    location: "Building C - Lobby",
    status: "offline",
    lastReading: { ...latestReading, aqi: 0, pm25: 0 },
  },
];

export const agentActions = [
  { time: "2 min ago", action: "Increased HVAC filtration in Zone A due to PM2.5 spike", status: "completed" },
  { time: "15 min ago", action: "Scheduled ventilation boost for Zone B (predictive)", status: "scheduled" },
  { time: "1 hr ago", action: "Sent calibration command to Node Delta", status: "completed" },
  { time: "2 hrs ago", action: "Generated daily air quality report", status: "completed" },
  { time: "3 hrs ago", action: "Adjusted CO₂ alert threshold based on occupancy data", status: "completed" },
];
