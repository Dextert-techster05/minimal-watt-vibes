import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Testimonial from "@/components/Testimonial";
import { ArrowRight, Leaf, TreePine, Sprout } from "lucide-react";

const Index = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "Thank you for joining us. Redirecting to the form...",
      });
      navigate("/energy-form");
    }
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
      <section className="bg-gradient-to-b from-[#e6f4ea] to-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6 gap-4">
            <Leaf className="h-12 w-12 text-green-500 animate-bounce" />
            <TreePine className="h-12 w-12 text-green-600 animate-pulse" />
            <Sprout className="h-12 w-12 text-green-400 animate-bounce" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
            Track Your Energy, Save Our Planet
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of eco-conscious users who are making a difference with our sustainable energy tracking platform.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email to get started"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
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
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white text-black"
            />
            <Button type="submit" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;