
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HostSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Share Your Village with the World</h2>
            <p className="text-muted-foreground mb-6">
              As a host on VillageConnect, you can share your culture, traditions, and lifestyle with 
              travelers from around the world while earning additional income for your family and community.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-village-100 flex items-center justify-center text-village-600 mr-3 mt-0.5">
                  <span className="text-sm font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">List your space</h3>
                  <p className="text-sm text-muted-foreground">
                    Share photos and details about your home, village, and the cultural experiences you offer.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-village-100 flex items-center justify-center text-village-600 mr-3 mt-0.5">
                  <span className="text-sm font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Welcome guests</h3>
                  <p className="text-sm text-muted-foreground">
                    Host travelers in your home and share your traditions, cooking, and way of life.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-village-100 flex items-center justify-center text-village-600 mr-3 mt-0.5">
                  <span className="text-sm font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Earn income</h3>
                  <p className="text-sm text-muted-foreground">
                    Get paid for sharing your home and culture while supporting your local community.
                  </p>
                </div>
              </div>
            </div>
            
            <Link to="/host">
              <Button size="lg">Become a Host</Button>
            </Link>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559732277-7ac9f2b8b2f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Village host" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-sm font-medium">4.9 (124 reviews)</span>
                </div>
                <p className="text-sm font-medium">"Hosting has allowed me to share my culture and provide better education for my children."</p>
                <p className="text-xs text-muted-foreground mt-1">— Maya, Host in Bali</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostSection;
