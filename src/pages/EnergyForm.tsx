import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const EnergyForm = () => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    userType: "household",
    location: "",
    buildingSize: "",
    occupants: "",
    monthlyUsage: "",
    peakHours: "",
    applianceCount: "",
    householdSize: "",
  });

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
      title: "Energy Usage",
      fields: (
        <div className="space-y-6">
          <div>
            <Label>Monthly Energy Usage (kWh)</Label>
            <Input
              type="number"
              value={formData.monthlyUsage}
              onChange={(e) =>
                setFormData({ ...formData, monthlyUsage: e.target.value })
              }
              placeholder="e.g., 500"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Peak Usage Hours</Label>
            <Input
              type="number"
              value={formData.peakHours}
              onChange={(e) =>
                setFormData({ ...formData, peakHours: e.target.value })
              }
              placeholder="e.g., 4"
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
    { title: "Appliances & Equipment", fields: <div>Section 3 content</div> },
    { title: "Behavior & Habits", fields: <div>Section 4 content</div> },
    { title: "Goals & Preferences", fields: <div>Section 5 content</div> },
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