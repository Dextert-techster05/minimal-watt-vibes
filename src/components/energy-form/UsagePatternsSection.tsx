
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UsagePatternsSectionProps {
  formData: {
    peakUsageTime: string;
    highConsumptionSeason: string;
  };
  setFormData: (data: any) => void;
}

const UsagePatternsSection = ({ formData, setFormData }: UsagePatternsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-medium text-gray-700">Peak Usage Times</Label>
        <RadioGroup
          value={formData.peakUsageTime}
          onValueChange={(value) =>
            setFormData({ ...formData, peakUsageTime: value })
          }
          className="grid grid-cols-2 gap-4"
        >
          {["Morning", "Afternoon", "Evening", "24/7"].map((time) => (
            <div
              key={time}
              className="relative flex items-center space-x-2 rounded-lg border p-4 hover:bg-gray-50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
            >
              <RadioGroupItem value={time.toLowerCase()} id={time.toLowerCase()} />
              <Label htmlFor={time.toLowerCase()} className="flex-1 cursor-pointer">{time}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-medium text-gray-700">High Consumption Season</Label>
        <RadioGroup
          value={formData.highConsumptionSeason}
          onValueChange={(value) =>
            setFormData({ ...formData, highConsumptionSeason: value })
          }
          className="grid grid-cols-2 gap-4"
        >
          {["Summer", "Winter", "Spring", "Fall"].map((season) => (
            <div
              key={season}
              className="relative flex items-center space-x-2 rounded-lg border p-4 hover:bg-gray-50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
            >
              <RadioGroupItem value={season.toLowerCase()} id={season.toLowerCase()} />
              <Label htmlFor={season.toLowerCase()} className="flex-1 cursor-pointer">{season}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default UsagePatternsSection;
