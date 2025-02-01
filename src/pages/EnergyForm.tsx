import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const EnergyForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    monthlyUsage: "",
    peakHours: "",
    applianceCount: "",
    householdSize: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form submitted successfully!",
      description: "Your energy consumption data has been recorded.",
    });
    // Here you would typically send the data to a backend
    console.log("Form data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Energy Consumption Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Monthly Energy Usage (kWh)
              </label>
              <Input
                type="number"
                value={formData.monthlyUsage}
                onChange={(e) =>
                  setFormData({ ...formData, monthlyUsage: e.target.value })
                }
                placeholder="e.g., 500"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Peak Usage Hours
              </label>
              <Input
                type="number"
                value={formData.peakHours}
                onChange={(e) =>
                  setFormData({ ...formData, peakHours: e.target.value })
                }
                placeholder="e.g., 4"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Major Appliances
              </label>
              <Input
                type="number"
                value={formData.applianceCount}
                onChange={(e) =>
                  setFormData({ ...formData, applianceCount: e.target.value })
                }
                placeholder="e.g., 5"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Household Size
              </label>
              <Input
                type="number"
                value={formData.householdSize}
                onChange={(e) =>
                  setFormData({ ...formData, householdSize: e.target.value })
                }
                placeholder="e.g., 4"
                className="mt-1"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyForm;