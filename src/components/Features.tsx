
import { Compass, Heart, Shield, UserCheck, Utensils, Users } from "lucide-react";

const features = [
  {
    icon: <Compass />,
    title: "Unique Destinations",
    description: "Discover hidden villages that offer authentic local experiences off the beaten path."
  },
  {
    icon: <Users />,
    title: "Local Community",
    description: "Connect with villagers and learn about their traditions, culture, and way of life."
  },
  {
    icon: <Utensils />,
    title: "Authentic Cuisine",
    description: "Taste traditional home-cooked meals prepared by local hosts using local ingredients."
  },
  {
    icon: <Heart />,
    title: "Cultural Immersion",
    description: "Participate in local festivals, crafts, and activities for a truly immersive experience."
  },
  {
    icon: <Shield />,
    title: "Verified Hosts",
    description: "All our hosts are personally verified to ensure quality and safety for all guests."
  },
  {
    icon: <UserCheck />,
    title: "Responsible Tourism",
    description: "Support local economies and sustainable practices that benefit village communities."
  }
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose VillageConnect</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform connects travelers with authentic village experiences, 
            supporting local communities while creating unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="feature-icon-wrapper mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
