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
    <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-12 w-12">
            <img src={image} alt={name} className="rounded-full" />
          </Avatar>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        <p className="text-gray-600">{content}</p>
      </CardContent>
    </Card>
  );
};

export default Testimonial;