import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Testimonial from "@/components/Testimonial";
import { ArrowRight, Leaf, TreePine, Sprout } from "lucide-react";

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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-white to-[#F2FCE2] opacity-90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-left space-y-8">
            <div className="flex gap-4 animate-fade-in">
              <Leaf className="h-12 w-12 text-green-600 animate-bounce" />
              <TreePine className="h-12 w-12 text-green-700 animate-pulse" />
              <Sprout className="h-12 w-12 text-green-500 animate-bounce" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-700">
                Track Your Energy,
              </span>
              <br />
              <span className="text-green-600">Save Our Planet</span>
            </h1>
            
            <p className="text-xl text-green-700 max-w-xl animate-fade-in delay-100">
              Join thousands of eco-conscious users who are making a difference with our sustainable energy tracking platform.
            </p>
            
            <Button 
              onClick={handleGetStarted}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in delay-200"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Image */}
          <div className="hidden md:block relative animate-fade-in delay-300">
            <img
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e"
              alt="Sustainable energy concept"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 object-cover w-full max-w-lg mx-auto"
            />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-100 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-50 rounded-full opacity-50 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
                <TreePine className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Smart Insights</h3>
              <p className="text-gray-600">Get personalized recommendations to optimize your energy usage.</p>
            </div>
            <div className="text-center p-6 transform transition-all duration-300 hover:scale-105">
              <div className="bg-green-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Environmental Impact</h3>
              <p className="text-gray-600">Track your carbon footprint reduction and environmental contribution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
          <form onSubmit={handleGetStarted} className="max-w-md mx-auto flex gap-4">
            <Button type="button" onClick={handleGetStarted} variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
