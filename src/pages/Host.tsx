import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, IndianRupee, Home, Users, Heart, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Host = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleBecomeHost = () => {
    if (!user) {
      // Redirect to register if not logged in
      navigate('/register');
    } else if (profile?.role === 'host') {
      // Already a host, go to dashboard
      navigate('/host/dashboard');
    } else {
      // Guest user wanting to become host, go to profile to upgrade
      navigate('/profile');
    }
  };

  const benefits = [
    {
      icon: IndianRupee,
      title: "Earn Extra Income",
      description: "Generate sustainable income for your family and community by sharing your culture and traditions."
    },
    {
      icon: Users,
      title: "Meet Global Travelers",
      description: "Connect with people from around the world and share your local knowledge and experiences."
    },
    {
      icon: Heart,
      title: "Preserve Culture",
      description: "Help preserve and share your cultural traditions with the next generation of travelers."
    },
    {
      icon: Home,
      title: "Flexible Hosting",
      description: "Host on your own schedule and decide how many guests you want to welcome."
    }
  ];

  const requirements = [
    "A clean, safe accommodation for guests",
    "Willingness to share local culture and traditions",
    "Basic communication skills in English (or local tourist language)",
    "Commitment to providing authentic experiences",
    "Respect for guests' privacy and comfort"
  ];

  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description: "Tell us about yourself, your village, and what makes your location special."
    },
    {
      number: "2",
      title: "List Your Space",
      description: "Add photos and details about your accommodation and the experiences you offer."
    },
    {
      number: "3",
      title: "Set Your Availability",
      description: "Choose when you're available to host and set your preferred rates."
    },
    {
      number: "4",
      title: "Welcome Guests",
      description: "Start hosting travelers and earning income while sharing your culture."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-village-500 to-earth-500 text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Become a Host
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Share your village's unique culture with travelers from around the world 
                while earning sustainable income for your community.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-village-600 hover:bg-white/90 font-medium px-8"
                onClick={handleBecomeHost}
              >
                {!user 
                  ? 'Start Hosting Today'
                  : profile?.role === 'host' 
                    ? 'Go to Dashboard' 
                    : 'Upgrade to Host'
                }
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Become a Host?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <benefit.icon className="h-12 w-12 mx-auto mb-4 text-village-500" />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 rounded-full bg-village-500 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Host Requirements</h2>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-2">
                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-lg mb-4">
                        "Hosting with VillageConnect has transformed our family's life. We've been able to 
                        send our children to better schools while sharing our beautiful culture with visitors 
                        from around the world. It's more than just income – it's cultural exchange."
                      </blockquote>
                      <cite className="font-medium">— Maria Santos, Host in Guatemala</cite>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                        alt="Host testimonial" 
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Hosting?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of hosts worldwide who are sharing their culture and earning sustainable income.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="font-medium px-8" onClick={handleBecomeHost}>
                  {!user 
                    ? 'Get Started Now'
                    : profile?.role === 'host' 
                      ? 'Go to Dashboard' 
                      : 'Become a Host Now'
                  }
                </Button>
                <Button size="lg" variant="outline" className="font-medium px-8">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Host;
