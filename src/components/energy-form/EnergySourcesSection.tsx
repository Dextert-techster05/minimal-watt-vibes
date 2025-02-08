
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface EnergySourcesSectionProps {
  formData: {
    energySources: string[];
    energyProvider: string;
  };
  setFormData: (data: any) => void;
}

const EnergySourcesSection = ({ formData, setFormData }: EnergySourcesSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-medium text-gray-700">Energy Sources (Check all that apply)</Label>
        <div className="grid grid-cols-2 gap-4">
          {["Electricity", "Gas", "Solar", "Other"].map((source) => (
            <div
              key={source}
              className="relative flex items-center space-x-2 rounded-lg border p-4 hover:bg-gray-50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
            >
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
              <Label htmlFor={source.toLowerCase()} className="flex-1 cursor-pointer">{source}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-medium text-gray-700">Energy Provider</Label>
        <Input
          type="text"
          value={formData.energyProvider}
          onChange={(e) =>
            setFormData({ ...formData, energyProvider: e.target.value })
          }
          placeholder="Enter your energy provider"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
};

export default EnergySourcesSection;
