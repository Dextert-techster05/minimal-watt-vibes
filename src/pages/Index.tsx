import { Zap, Battery, DollarSign, Leaf } from "lucide-react";
import Header from "@/components/Header";
import EnergyChart from "@/components/EnergyChart";
import StatsCard from "@/components/StatsCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Energy Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your energy consumption in real-time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Current Usage"
            value="2.4 kW"
            icon={Zap}
            trend="+12%"
            trendUp={true}
          />
          <StatsCard
            title="Battery Level"
            value="85%"
            icon={Battery}
            trend="+5%"
            trendUp={true}
          />
          <StatsCard
            title="Cost Today"
            value="$3.50"
            icon={DollarSign}
            trend="-8%"
            trendUp={false}
          />
          <StatsCard
            title="Carbon Saved"
            value="12.5 kg"
            icon={Leaf}
            trend="+18%"
            trendUp={true}
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Energy Consumption</h2>
          <EnergyChart />
        </div>
      </main>
    </div>
  );
};

export default Index;