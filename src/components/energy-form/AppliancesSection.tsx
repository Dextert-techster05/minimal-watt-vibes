
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Appliance {
  id: string;
  name: string;
  power: string;
  usage: string;
}

interface AppliancesSectionProps {
  formData: {
    appliances: Appliance[];
  };
  setFormData: (data: any) => void;
}

const AppliancesSection = ({ formData, setFormData }: AppliancesSectionProps) => {
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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-medium text-gray-700">Appliances and Equipment</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAppliance}
            className="hover:bg-primary/5 hover:text-primary transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Appliance
          </Button>
        </div>
        <div className="space-y-4">
          {formData.appliances.map((appliance) => (
            <div
              key={appliance.id}
              className="grid grid-cols-4 gap-4 items-center p-4 rounded-lg border bg-white/50 backdrop-blur-sm animate-fade-in"
            >
              <Input
                placeholder="Name"
                value={appliance.name}
                onChange={(e) =>
                  updateAppliance(appliance.id, "name", e.target.value)
                }
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <Input
                placeholder="Power (watts)"
                value={appliance.power}
                onChange={(e) =>
                  updateAppliance(appliance.id, "power", e.target.value)
                }
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <Input
                placeholder="Usage (hrs/day)"
                value={appliance.usage}
                onChange={(e) =>
                  updateAppliance(appliance.id, "usage", e.target.value)
                }
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeAppliance(appliance.id)}
                className="hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliancesSection;
