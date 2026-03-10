import { Wind, Droplets, Thermometer, Gauge, Cloudy, Zap } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricCard from "@/components/dashboard/MetricCard";
import AirQualityChart from "@/components/dashboard/AirQualityChart";
import EnvironmentChart from "@/components/dashboard/EnvironmentChart";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import AgentActivityPanel from "@/components/dashboard/AgentActivityPanel";
import SensorNodesPanel from "@/components/dashboard/SensorNodesPanel";
import AIChatWidget from "@/components/dashboard/AIChatWidget";
import { latestReading } from "@/data/mockData";

const getAqiStatus = (aqi: number) => {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "poor";
  return "critical" as const;
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard title="AQI" value={latestReading.aqi} icon={Gauge} status={getAqiStatus(latestReading.aqi)} trend="down" trendValue="8%" />
          <MetricCard title="PM2.5" value={latestReading.pm25} unit="µg/m³" icon={Wind} status={latestReading.pm25 > 35 ? "poor" : "good"} trend="down" trendValue="12%" />
          <MetricCard title="PM10" value={latestReading.pm10} unit="µg/m³" icon={Cloudy} status={latestReading.pm10 > 50 ? "moderate" : "good"} trend="stable" trendValue="2%" />
          <MetricCard title="CO₂" value={latestReading.co2} unit="ppm" icon={Zap} status={latestReading.co2 > 800 ? "poor" : "good"} trend="up" trendValue="5%" />
          <MetricCard title="Temp" value={latestReading.temperature} unit="°C" icon={Thermometer} status="good" trend="stable" trendValue="0.2°" />
          <MetricCard title="Humidity" value={latestReading.humidity} unit="%" icon={Droplets} status={latestReading.humidity > 65 ? "moderate" : "good"} trend="down" trendValue="3%" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AirQualityChart />
          <EnvironmentChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AlertsPanel />
          <AgentActivityPanel />
          <SensorNodesPanel />
        </div>
      </main>

      <AIChatWidget />
    </div>
  );
};

export default Index;
