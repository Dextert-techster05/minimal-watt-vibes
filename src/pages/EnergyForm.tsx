
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import EnergyAnalytics from "@/components/EnergyAnalytics";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Json } from "@/integrations/supabase/types";
import GeneralInformationSection from "@/components/energy-form/GeneralInformationSection";
import EnergySourcesSection from "@/components/energy-form/EnergySourcesSection";
import AppliancesSection from "@/components/energy-form/AppliancesSection";
import UsagePatternsSection from "@/components/energy-form/UsagePatternsSection";
import SummarySection from "@/components/energy-form/SummarySection";

interface Appliance {
  id: string;
  name: string;
  power: string;
  usage: string;
}

const EnergyForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentSection, setCurrentSection] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userType: "household",
    location: "",
    buildingSize: "",
    occupants: "",
    energySources: [] as string[],
    energyProvider: "",
    appliances: [] as Appliance[],
    peakUsageTime: "",
    highConsumptionSeason: "",
    monthlyBill: "",
  });

  const { data: energyData, isLoading: isLoadingData } = useQuery({
    queryKey: ['energyData'],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user.id) {
        throw new Error("No authenticated user found");
      }

      const { data, error } = await supabase
        .from('energy_consumption')
        .select('*')
        .eq('user_id', session.session.user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const validateCurrentSection = () => {
    switch (currentSection) {
      case 0:
        if (!formData.location || !formData.buildingSize || !formData.occupants) {
          toast({
            title: "Validation Error",
            description: "Please fill in all fields before proceeding.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 1:
        if (formData.energySources.length === 0 || !formData.energyProvider) {
          toast({
            title: "Validation Error",
            description: "Please select at least one energy source and provide your energy provider.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (formData.appliances.length === 0) {
          toast({
            title: "Validation Error",
            description: "Please add at least one appliance.",
            variant: "destructive",
          });
          return false;
        }
        const invalidAppliance = formData.appliances.some(
          app => !app.name || !app.power || !app.usage
        );
        if (invalidAppliance) {
          toast({
            title: "Validation Error",
            description: "Please fill in all fields for each appliance.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        if (!formData.peakUsageTime || !formData.highConsumptionSeason) {
          toast({
            title: "Validation Error",
            description: "Please select both peak usage time and high consumption season.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 4:
        if (!formData.monthlyBill) {
          toast({
            title: "Validation Error",
            description: "Please enter your average monthly energy bill.",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentSection()) return;

    if (currentSection === sections.length - 1) {
      try {
        setIsSubmitting(true);
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user.id) {
          throw new Error("No authenticated user found");
        }

        const appliancesJson = formData.appliances.map(app => ({
          name: app.name,
          power: app.power,
          usage: app.usage
        })) as Json[];

        const energyConsumptionData = {
          user_id: session.session.user.id,
          building_size: Number(formData.buildingSize),
          occupants: Number(formData.occupants),
          energy_sources: formData.energySources,
          energy_provider: formData.energyProvider,
          appliances: appliancesJson,
          peak_usage_time: formData.peakUsageTime,
          high_consumption_season: formData.highConsumptionSeason,
          monthly_bill: Number(formData.monthlyBill),
        };

        const { error } = await supabase
          .from('energy_consumption')
          .upsert(energyConsumptionData);

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Your energy consumption data has been saved.",
        });

        await queryClient.invalidateQueries({ queryKey: ['energyData'] });
        setShowForm(false);
      } catch (error: any) {
        console.error("Error saving energy data:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to save energy data",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentSection(currentSection + 1);
    }
  };

  const sections = [
    {
      title: "General Information",
      component: <GeneralInformationSection formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Energy Sources",
      component: <EnergySourcesSection formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Appliances",
      component: <AppliancesSection formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Usage Patterns",
      component: <UsagePatternsSection formData={formData} setFormData={setFormData} />,
    },
    {
      title: "Summary",
      component: <SummarySection formData={formData} setFormData={setFormData} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {!showForm ? (
        <div className="max-w-7xl mx-auto space-y-8">
          {isLoadingData ? (
            <Card className="backdrop-blur-sm bg-white/80">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium text-gray-600">Loading your energy analytics report...</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="backdrop-blur-sm bg-white/80">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center text-green-800">
                    Your Energy Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EnergyAnalytics data={energyData} />
                </CardContent>
              </Card>
              
              <Button
                onClick={() => {
                  setShowForm(true);
                  setCurrentSection(0);
                }}
                className="w-full max-w-md mx-auto block"
              >
                Update Energy Information
              </Button>
            </>
          )}
        </div>
      ) : (
        <Card className="max-w-2xl mx-auto backdrop-blur-sm bg-white/80 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-green-800">
              {sections[currentSection].title}
            </CardTitle>
            <div className="flex justify-center space-x-2 text-sm text-gray-500">
              <div className="flex space-x-1">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentSection
                        ? "bg-primary w-4"
                        : index < currentSection
                        ? "bg-primary/40"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {sections[currentSection].component}

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => currentSection > 0 && setCurrentSection(currentSection - 1)}
                  disabled={currentSection === 0 || isSubmitting}
                  className="hover:bg-primary/5 transition-colors"
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {currentSection === sections.length - 1 ? "Submitting..." : "Processing..."}
                    </>
                  ) : (
                    currentSection === sections.length - 1 ? "Submit" : "Next"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnergyForm;
