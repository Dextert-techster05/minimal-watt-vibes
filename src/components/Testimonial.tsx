import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

const Testimonial = ({ name, role, content, image }: TestimonialProps) => {
  return (
    <Card className="transform transition-all duration-500 hover:scale-105 hover:shadow-xl bg-white/80 backdrop-blur-sm border-green-100 hover:border-green-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-12 w-12 ring-2 ring-green-100 ring-offset-2">
            <img src={image} alt={name} className="rounded-full" />
          </Avatar>
          <div>
            <h4 className="font-semibold text-green-800">{name}</h4>
            <p className="text-sm text-green-600">{role}</p>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
};

export default Testimonial;