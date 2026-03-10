import { Plane, Wrench, Fuel, TrendingDown, DollarSign, ShieldCheck } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricCard from "@/components/dashboard/MetricCard";
import EngineHealthChart from "@/components/dashboard/EngineHealthChart";
import FlightPredictionsPanel from "@/components/dashboard/FlightPredictionsPanel";
import MaintenancePredictionsPanel from "@/components/dashboard/MaintenancePredictionsPanel";
import FleetStatusPanel from "@/components/dashboard/FleetStatusPanel";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import AgentActivityPanel from "@/components/dashboard/AgentActivityPanel";
import AIChatWidget from "@/components/dashboard/AIChatWidget";
import { fleetStats } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard title="Fleet Active" value={`${fleetStats.inFlight}/${fleetStats.totalAircraft}`} icon={Plane} status="good" trend="stable" trendValue="100%" delay={0} />
          <MetricCard title="Avg Engine Health" value={`${fleetStats.avgEngineHealth}%`} icon={ShieldCheck} status={fleetStats.avgEngineHealth > 85 ? "good" : "moderate"} trend="down" trendValue="2%" delay={1} />
          <MetricCard title="In Maintenance" value={fleetStats.maintenance + fleetStats.grounded} icon={Wrench} status={fleetStats.grounded > 0 ? "moderate" : "good"} trend="up" trendValue="1" trendPositive={false} delay={2} />
          <MetricCard title="Fuel Saved" value="84.2K" unit="L" icon={Fuel} status="good" trend="up" trendValue="12%" trendPositive={true} delay={3} />
          <MetricCard title="Delays Prevented" value={fleetStats.predictedDelaysSaved} icon={TrendingDown} status="good" trend="up" trendValue="8%" trendPositive={true} delay={4} />
          <MetricCard title="Cost Saved" value="$1.24M" icon={DollarSign} status="good" trend="up" trendValue="15%" trendPositive={true} delay={5} />
        </div>

        {/* Engine Health Chart + Flight Predictions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EngineHealthChart />
          <FlightPredictionsPanel />
        </div>

        {/* Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AlertsPanel />
          <AgentActivityPanel />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MaintenancePredictionsPanel />
          <FleetStatusPanel />
        </div>
      </main>

      <AIChatWidget />
    </div>
  );
};

export default Index;
