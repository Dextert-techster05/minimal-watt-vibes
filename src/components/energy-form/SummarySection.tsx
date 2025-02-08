
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SummarySectionProps {
  formData: {
    monthlyBill: string;
  };
  setFormData: (data: any) => void;
}

const SummarySection = ({ formData, setFormData }: SummarySectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-lg font-medium text-gray-700">Average Monthly Energy Bill (₹)</Label>
        <Input
          type="number"
          value={formData.monthlyBill}
          onChange={(e) =>
            setFormData({ ...formData, monthlyBill: e.target.value })
          }
          placeholder="Enter your average monthly bill"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
};

export default SummarySection;
