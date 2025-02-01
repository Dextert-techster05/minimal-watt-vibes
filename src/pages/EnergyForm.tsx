import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

interface Appliance {
  id: string;
  name: string;
  power: string;
  usage: string;
}

const EnergyForm = () => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    // Section 1: General Information
    userType: "household",
    location: "",
    buildingSize: "",
    occupants: "",
    
    // Section 2: Energy Sources
    energySources: [] as string[],
    energyProvider: "",
    
    // Section 3: Appliances
    appliances: [] as Appliance[],
    
    // Section 4: Usage Patterns
    peakUsageTime: "",
    highConsumptionSeason: "",
    
    // Section 5: Summary
    monthlyBill: "",
  });

  const addAppliance = () => {
    setFormData({
      ...formData,
      appliances: [
        ...formData.appliances,
        { id: Date.now().toString(), name: "", power: "", usage: "" },
      ],
    });
  };

  const removeAppliance = (id: string) => {
    setFormData({
      ...formData,
      appliances: formData.appliances.filter((app) => app.id !== id),
    });
  };

  const updateAppliance = (id: string, field: keyof Appliance, value: string) => {
    setFormData({
      ...formData,
      appliances: formData.appliances.map((app) =>
        app.id === id ? { ...app, [field]: value } : app
      ),
    });
  };

  const sections = [
    {
      title: "General Information",
      fields: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>User Type</Label>
            <RadioGroup
              value={formData.userType}
              onValueChange={(value) =>
                setFormData({ ...formData, userType: value })
              }
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="household" id="household" />
                <Label htmlFor="household">Household</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enterprise" id="enterprise" />
                <Label htmlFor="enterprise">Enterprise</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Location</Label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Enter your location"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Building Size (sq ft)</Label>
            <Input
              type="number"
              value={formData.buildingSize}
              onChange={(e) =>
                setFormData({ ...formData, buildingSize: e.target.value })
              }
              placeholder="e.g., 2000"
              className="mt-1"
            />
          </div>

          <div>
            <Label>
              {formData.userType === "household"
                ? "Number of Residents"
                : "Number of Employees"}
            </Label>
            <Input
              type="number"
              value={formData.occupants}
              onChange={(e) =>
                setFormData({ ...formData, occupants: e.target.value })
              }
              placeholder="Enter number of people"
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Energy Sources",
      fields: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Energy Sources (Check all that apply)</Label>
            <div className="space-y-2">
              {["Electricity", "Gas", "Solar", "Other"].map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox
                    id={source.toLowerCase()}
                    checked={formData.energySources.includes(source)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({
                          ...formData,
                          energySources: [...formData.energySources, source],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          energySources: formData.energySources.filter(
                            (s) => s !== source
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor={source.toLowerCase()}>{source}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Energy Provider</Label>
            <Input
              type="text"
              value={formData.energyProvider}
              onChange={(e) =>
                setFormData({ ...formData, energyProvider: e.target.value })
              }
              placeholder="Enter your energy provider"
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Appliances",
      fields: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Appliances and Equipment</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAppliance}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Appliance
              </Button>
            </div>
            {formData.appliances.map((appliance) => (
              <div
                key={appliance.id}
                className="grid grid-cols-4 gap-4 items-center"
              >
                <Input
                  placeholder="Name"
                  value={appliance.name}
                  onChange={(e) =>
                    updateAppliance(appliance.id, "name", e.target.value)
                  }
                />
                <Input
                  placeholder="Power (watts)"
                  value={appliance.power}
                  onChange={(e) =>
                    updateAppliance(appliance.id, "power", e.target.value)
                  }
                />
                <Input
                  placeholder="Usage (hrs/day)"
                  value={appliance.usage}
                  onChange={(e) =>
                    updateAppliance(appliance.id, "usage", e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeAppliance(appliance.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Usage Patterns",
      fields: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Peak Usage Times</Label>
            <RadioGroup
              value={formData.peakUsageTime}
              onValueChange={(value) =>
                setFormData({ ...formData, peakUsageTime: value })
              }
              className="flex flex-col space-y-2"
            >
              {["Morning", "Afternoon", "Evening", "24/7"].map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <RadioGroupItem value={time.toLowerCase()} id={time.toLowerCase()} />
                  <Label htmlFor={time.toLowerCase()}>{time}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>High Consumption Season</Label>
            <RadioGroup
              value={formData.highConsumptionSeason}
              onValueChange={(value) =>
                setFormData({ ...formData, highConsumptionSeason: value })
              }
              className="flex flex-col space-y-2"
            >
              {["Summer", "Winter", "Spring", "Fall"].map((season) => (
                <div key={season} className="flex items-center space-x-2">
                  <RadioGroupItem value={season.toLowerCase()} id={season.toLowerCase()} />
                  <Label htmlFor={season.toLowerCase()}>{season}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "Summary",
      fields: (
        <div className="space-y-6">
          <div>
            <Label>Average Monthly Energy Bill ($)</Label>
            <Input
              type="number"
              value={formData.monthlyBill}
              onChange={(e) =>
                setFormData({ ...formData, monthlyBill: e.target.value })
              }
              placeholder="Enter your average monthly bill"
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSection === sections.length - 1) {
      toast({
        title: "Form submitted successfully!",
        description: "Your energy consumption data has been recorded.",
      });
      console.log("Form data:", formData);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-green-800">
            {sections[currentSection].title}
          </CardTitle>
          <div className="flex justify-center space-x-2 text-sm text-gray-500">
            Step {currentSection + 1} of {sections.length}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {sections[currentSection].fields}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={previousSection}
                disabled={currentSection === 0}
              >
                Previous
              </Button>
              {currentSection === sections.length - 1 ? (
                <Button type="submit">Submit</Button>
              ) : (
                <Button type="button" onClick={nextSection}>
                  Next
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyForm;