
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe, Users, Award } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Villages Connected", value: "500+", icon: Globe },
    { label: "Happy Travelers", value: "10K+", icon: Users },
    { label: "Host Families", value: "2K+", icon: Heart },
    { label: "Countries", value: "25+", icon: Award },
  ];

  const values = [
    {
      title: "Authentic Connections",
      description: "We believe in genuine cultural exchange that benefits both travelers and host communities.",
      icon: Heart,
    },
    {
      title: "Sustainable Tourism",
      description: "Our platform promotes responsible travel that preserves local traditions and environments.",
      icon: Globe,
    },
    {
      title: "Community Empowerment",
      description: "We empower rural communities by providing economic opportunities through cultural tourism.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                About VillageConnect
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Bridging cultures, preserving traditions, and creating meaningful connections 
                between travelers and rural communities around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  VillageConnect was born from a simple belief: that authentic travel experiences 
                  happen when visitors connect directly with local communities. We're dedicated to 
                  creating a platform where rural villages can share their unique cultures, 
                  traditions, and ways of life with the world.
                </p>
                <p className="text-muted-foreground">
                  Every booking through VillageConnect directly supports local families and communities, 
                  helping preserve traditional ways of life while providing sustainable economic opportunities.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                  alt="Village community" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-village-500" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <value.icon className="h-12 w-12 mx-auto mb-4 text-village-500" />
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p>
                  VillageConnect was founded in 2020 by a team of passionate travelers who 
                  experienced firsthand the transformative power of staying with local families 
                  in rural communities. After witnessing how tourism could either exploit or 
                  empower these communities, we knew there had to be a better way.
                </p>
                <p>
                  We started with a simple question: What if tourism could be a force for good? 
                  What if travelers could experience authentic culture while directly supporting 
                  the communities they visit?
                </p>
                <p>
                  Today, VillageConnect partners with villages across 25+ countries, ensuring 
                  that every experience is authentic, sustainable, and beneficial for both 
                  travelers and local communities. We're not just a booking platform – we're 
                  a bridge between cultures, a protector of traditions, and a catalyst for 
                  positive change.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
