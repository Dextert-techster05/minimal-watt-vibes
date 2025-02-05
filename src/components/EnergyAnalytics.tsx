import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import EnergyChart from "@/components/EnergyChart";
import { Plug, Leaf, House, Sun } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type EnergyData = Tables<"energy_consumption">;

interface EnergyAnalyticsProps {
  data: EnergyData;
}

const EnergyAnalytics = ({ data }: EnergyAnalyticsProps) => {
  const [carbonFootprint, setCarbonFootprint] = useState<number>(0);
  
  useEffect(() => {
    // Calculate carbon footprint based on monthly bill and energy sources
    const calculateCarbonFootprint = () => {
      const monthlyBill = data.monthly_bill || 0;
      // Average CO2 emissions per kWh (in kg)
      const CO2_PER_KWH = 0.4;
      // Rough estimate: $0.12 per kWh
      const estimatedKwh = Number(monthlyBill) / 0.12;
      const footprint = estimatedKwh * CO2_PER_KWH;
      setCarbonFootprint(Math.round(footprint));
    };

    calculateCarbonFootprint();
  }, [data]);

  const energyIntensity = data.building_size 
    ? Math.round((Number(data.monthly_bill || 0) / Number(data.building_size)) * 100) / 100
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Monthly Energy Cost"
          value={`$${data.monthly_bill || 0}`}
          icon={Plug}
          trend="+12%"
          trendUp={false}
        />
        <StatsCard
          title="Carbon Footprint"
          value={`${carbonFootprint} kg CO₂`}
          icon={Leaf}
          trend="-5%"
          trendUp={true}
        />
        <StatsCard
          title="Energy Intensity"
          value={`$${energyIntensity}/sq ft`}
          icon={House}
        />
        <StatsCard
          title="Energy Sources"
          value={`${data.energy_sources?.length || 0} Active`}
          icon={Sun}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <EnergyChart />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Peak Usage Time</h4>
                <p className="text-lg font-semibold">{data.peak_usage_time || "Not specified"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">High Consumption Season</h4>
                <p className="text-lg font-semibold">{data.high_consumption_season || "Not specified"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Building Occupants</h4>
                <p className="text-lg font-semibold">{data.occupants || "Not specified"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appliances Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.appliances?.map((appliance: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">{appliance.name}</h4>
                    <p className="text-sm text-gray-500">{appliance.usage} hrs/day</p>
                  </div>
                  <p className="text-sm font-medium">{appliance.power}W</p>
                </div>
              ))}
              {(!data.appliances || data.appliances.length === 0) && (
                <p className="text-sm text-gray-500">No appliances specified</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnergyAnalytics;