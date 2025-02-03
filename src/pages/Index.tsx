import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Testimonial from "@/components/Testimonial";
import { ArrowRight, Leaf } from "lucide-react";
import EnergyChart from "@/components/EnergyChart";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Great!",
      description: "Let's get you started on your energy-saving journey.",
    });
    navigate("/energy-form");
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "This platform helped me reduce my energy bills by 30%. The insights are incredibly valuable!",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content: "The data visualization makes it easy to understand our energy consumption patterns.",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Emma Davis",
      role: "Environmental Consultant",
      content: "A must-have tool for anyone serious about reducing their carbon footprint.",
      image: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-[#F5F9F6] to-[#E8F5E9] opacity-90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-left space-y-6">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-green-700 font-semibold">EnergyTrack</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-green-800">
              Track Your Energy,
              <br />
              Save the Planet
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Monitor your energy consumption, reduce your carbon footprint, and save money with our intuitive tracking tools.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={handleGetStarted}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md"
              >
                Get Started
              </Button>
              <p className="text-sm text-gray-500">Start your free trial. No credit card required.</p>
            </div>

            <div className="flex gap-4 pt-8">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Leaf className="h-5 w-5" />
                Save up to 30% on bills
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Leaf className="h-5 w-5" />
                Reduce CO2 emissions
              </div>
            </div>
          </div>

          {/* Grid Pattern */}
          <div className="hidden md:grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-green-200 via-green-100 to-blue-100 p-4 flex items-center justify-center"
              >
                <Leaf className="h-8 w-8 text-white" />
              </div>
            ))}
          </div>
        </div>
      </section>
        
        {/* Energy Usage Graph Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-green-800 mb-4">Your Energy Usage</h2>
              <p className="text-gray-600">Track and analyze your monthly energy consumption</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <EnergyChart />
            </div>
          </div>
        </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 transform transition-all duration-300 hover:scale-105">
              <div className="bg-green-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Real-time Tracking</h3>
              <p className="text-gray-600">Monitor your energy consumption in real-time with detailed analytics.</p>
            </div>
            <div className="text-center p-6 transform transition-all duration-300 hover:scale-105">
              <div className="bg-green-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Smart Insights</h3>
              <p className="text-gray-600">Get personalized recommendations to optimize your energy usage.</p>
            </div>
            <div className="text-center p-6 transform transition-all duration-300 hover:scale-105">
              <div className="bg-green-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Environmental Impact</h3>
              <p className="text-gray-600">Track your carbon footprint reduction and environmental contribution.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#e6f4ea]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-green-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community of environmentally conscious users today.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={handleGetStarted} 
                variant="secondary" 
                className="bg-white text-green-600 hover:bg-green-50"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
};

export default Index;
