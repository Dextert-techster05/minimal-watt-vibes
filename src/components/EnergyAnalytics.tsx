import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import EnergyChart from "@/components/EnergyChart";
import { Plug, Leaf, House, Sun, AlertTriangle } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

type EnergyData = Tables<"energy_consumption">;

interface EnergyAnalyticsProps {
  data: EnergyData | null;
}

const EnergyAnalytics = ({ data }: EnergyAnalyticsProps) => {
  const [carbonFootprint, setCarbonFootprint] = useState<number>(0);
  const [consumptionLevel, setConsumptionLevel] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [energyTips, setEnergyTips] = useState<string[]>([]);
  
  useEffect(() => {
    if (!data) return;

    // Calculate carbon footprint based on monthly bill and energy sources
    const calculateCarbonFootprint = () => {
      const monthlyBill = data.monthly_bill || 0;
      // Average CO2 emissions per kWh (in kg)
      const CO2_PER_KWH = 0.4;
      // Rough estimate: ₹8 per kWh
      const estimatedKwh = Number(monthlyBill) / 8;
      const footprint = estimatedKwh * CO2_PER_KWH;
      setCarbonFootprint(Math.round(footprint));
    };

    // Determine consumption level based on building size and monthly bill
    const determineConsumptionLevel = () => {
      const monthlyBill = Number(data.monthly_bill || 0);
      const buildingSize = Number(data.building_size || 0);
      const consumptionPerSqFt = buildingSize ? monthlyBill / buildingSize : 0;

      if (consumptionPerSqFt < 5) {
        setConsumptionLevel('low');
      } else if (consumptionPerSqFt < 10) {
        setConsumptionLevel('moderate');
      } else {
        setConsumptionLevel('high');
      }
    };

    // Generate energy-saving tips based on usage patterns
    const generateEnergyTips = () => {
      const tips: string[] = [];
      
      if (data.peak_usage_time === 'afternoon') {
        tips.push("Consider using natural light during peak afternoon hours to reduce electricity consumption.");
      }
      
      if (data.high_consumption_season === 'summer') {
        tips.push("Use ceiling fans along with AC to improve cooling efficiency and reduce energy costs.");
      }

      if (Number(data.monthly_bill) > 3000) {
        tips.push("Install energy-efficient LED bulbs to reduce electricity consumption by up to 75%.");
      }

      if (data.appliances && data.appliances.length > 0) {
        tips.push("Unplug electronic devices when not in use to avoid phantom power consumption.");
      }

      // Add some general tips if we have few specific ones
      if (tips.length < 3) {
        tips.push(
          "Set your AC temperature to 24°C for optimal energy efficiency.",
          "Regular maintenance of appliances can improve their energy efficiency.",
          "Consider installing solar panels to reduce your carbon footprint."
        );
      }

      setEnergyTips(tips.slice(0, 3)); // Show max 3 tips
    };

    calculateCarbonFootprint();
    determineConsumptionLevel();
    generateEnergyTips();
  }, [data]);

  if (!data) {
    return (
      <Card className="p-6">
        <CardContent className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Energy Data Available</h3>
          <p className="text-gray-600">Please submit your energy consumption details to view the analytics.</p>
        </CardContent>
      </Card>
    );
  }

  const energyIntensity = data.building_size 
    ? Math.round((Number(data.monthly_bill || 0) / Number(data.building_size)) * 100) / 100
    : 0;

  const getConsumptionLevelColor = () => {
    switch (consumptionLevel) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Monthly Energy Cost"
          value={`₹${data.monthly_bill || 0}`}
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
          value={`₹${energyIntensity}/sq ft`}
          icon={House}
        />
        <StatsCard
          title="Energy Sources"
          value={`${data.energy_sources?.length || 0} Active`}
          icon={Sun}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Consumption Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg border ${getConsumptionLevelColor()}`}>
              <p className="text-lg font-semibold capitalize">
                {consumptionLevel} Energy Consumption
              </p>
              <p className="text-sm mt-1">
                Based on your building size and monthly energy usage
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Saving Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {energyTips.map((tip, index) => (
                <Alert key={index}>
                  <AlertDescription>{tip}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
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