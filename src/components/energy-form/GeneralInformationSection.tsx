
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GeneralInformationProps {
  formData: {
    userType: string;
    location: string;
    buildingSize: string;
    occupants: string;
  };
  setFormData: (data: any) => void;
}

const GeneralInformationSection = ({ formData, setFormData }: GeneralInformationProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-medium text-gray-700">User Type</Label>
        <RadioGroup
          value={formData.userType}
          onValueChange={(value) =>
            setFormData({ ...formData, userType: value })
          }
          className="grid grid-cols-2 gap-4"
        >
          <div className="relative flex items-center space-x-2 rounded-lg border p-4 hover:bg-gray-50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
            <RadioGroupItem value="household" id="household" />
            <Label htmlFor="household" className="flex-1 cursor-pointer">Household</Label>
          </div>
          <div className="relative flex items-center space-x-2 rounded-lg border p-4 hover:bg-gray-50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
            <RadioGroupItem value="enterprise" id="enterprise" />
            <Label htmlFor="enterprise" className="flex-1 cursor-pointer">Enterprise</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-medium text-gray-700">Location</Label>
        <Input
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          placeholder="Enter your location"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-medium text-gray-700">Building Size (sq ft)</Label>
        <Input
          type="number"
          value={formData.buildingSize}
          onChange={(e) =>
            setFormData({ ...formData, buildingSize: e.target.value })
          }
          placeholder="e.g., 2000"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-medium text-gray-700">
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
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
};

export default GeneralInformationSection;
