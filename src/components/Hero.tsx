
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <div className="relative">
      {/* Hero background */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      <div 
        className="relative h-[85vh] max-h-[700px] bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1519817914152-22d216bb9170?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80')` 
        }}
      >
        {/* Hero content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
                Experience Authentic Village Homestays
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Connect with local hosts for unique cultural experiences in villages around the world.
              </p>
              
              {/* Search form */}
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input 
                      type="text" 
                      placeholder="Where are you going?" 
                      className="w-full h-12"
                    />
                  </div>
                  <Button size="lg" className="h-12 px-8">
                    <Search className="h-4 w-4 mr-2" />
                    <span>Search</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
