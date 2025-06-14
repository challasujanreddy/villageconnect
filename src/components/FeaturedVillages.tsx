
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { useVillages } from "@/hooks/useVillages";
import { getVillageImageUrl } from "@/utils/storage";

const FeaturedVillages = () => {
  const { villages, loading } = useVillages();

  const featuredVillages = villages?.slice(0, 4) || [];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Villages</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover handpicked villages that offer unique cultural experiences, 
              authentic homestays, and unforgettable local connections.
            </p>
          </div>
          <Link to="/villages">
            <Button variant="ghost" className="group">
              View all villages
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVillages.map((village) => (
              <Link to={`/villages/${village.id}`} key={village.id}>
                <Card className="village-card h-full group">
                  <div className="overflow-hidden">
                    <img 
                      src={getVillageImageUrl(village.hero_image)} 
                      alt={village.name} 
                      className="village-card-image group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 flex-1">
                    <div className="flex items-center mb-2 text-sm">
                      <MapPin className="mr-1 h-3 w-3" />
                      <span className="text-muted-foreground">{village.state || 'Unknown State'}</span>
                    </div>
                    <h3 className="font-medium text-lg">{village.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{village.description}</p>
                    {village.nightly_price && (
                      <p className="text-sm font-medium mt-2">${village.nightly_price}/night</p>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 mt-auto">
                    <Button variant="outline" size="sm" className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedVillages;
