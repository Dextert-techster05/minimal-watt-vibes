import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Testimonial from "@/components/Testimonial";
import { ArrowRight, Leaf } from "lucide-react";
import EnergyChart from "@/components/EnergyChart";

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
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background with natural gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#a8e6cf] via-[#7dcea0] to-[#3d8168] opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-2/3 h-full">
          <div className="relative h-full">
            <div className="absolute bottom-0 right-0 w-full h-full bg-[url('/lovable-uploads/6a129ea6-37f2-4547-b59a-4485053d463d.png')] bg-contain bg-no-repeat bg-right-bottom opacity-30"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-2xl space-y-8">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-2 mb-16">
              <Leaf className="h-8 w-8 text-white" />
              <span className="text-white font-semibold text-xl">EnergyTrack</span>
            </div>
            
            {/* Hero Content */}
            <h1 className="text-6xl font-bold leading-tight text-white">
              Track Your Energy,
              <br />
              Save Our Planet
            </h1>
            
            <p className="text-xl text-white/90 max-w-xl leading-relaxed">
              Monitor your energy consumption, reduce your carbon footprint, and save money with our intuitive tracking tools.
            </p>
            
            <div className="flex gap-4 items-center">
              <Button 
                onClick={handleGetStarted}
                className="bg-[#4ade80] hover:bg-[#22c55e] text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
              >
                Get Started
              </Button>
              <p className="text-sm text-white/80">No credit card required</p>
            </div>

            <div className="flex gap-6 pt-8">
              <div className="flex items-center gap-2 text-white">
                <Leaf className="h-5 w-5" />
                Save up to 30% on bills
              </div>
              <div className="flex items-center gap-2 text-white">
                <Leaf className="h-5 w-5" />
                Reduce CO2 emissions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Usage Graph Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3d8168] mb-4">Your Energy Usage</h2>
            <p className="text-gray-600">Track and analyze your monthly energy consumption</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <EnergyChart />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3d8168]">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 transform transition-all duration-300 hover:scale-105">
              <div className="bg-[#a8e6cf]/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-[#3d8168]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#3d8168]">Real-time Tracking</h3>
              <p className="text-gray-600">Monitor your energy consumption in real-time with detailed analytics.</p>
            </div>
            <div className="text-center p-6 transform transition-all duration-300 hover:scale-105">
              <div className="bg-[#a8e6cf]/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-[#3d8168]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#3d8168]">Smart Insights</h3>
              <p className="text-gray-600">Get personalized recommendations to optimize your energy usage.</p>
            </div>
            <div className="text-center p-6 transform transition-all duration-300 hover:scale-105">
              <div className="bg-[#a8e6cf]/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-[#3d8168]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#3d8168]">Environmental Impact</h3>
              <p className="text-gray-600">Track your carbon footprint reduction and environmental contribution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#a8e6cf]/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3d8168]">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#3d8168]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join our community of environmentally conscious users today.
          </p>
          <Button 
            onClick={handleGetStarted} 
            className="bg-white text-[#3d8168] hover:bg-gray-100 px-8 py-6 text-lg rounded-full mx-auto"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;