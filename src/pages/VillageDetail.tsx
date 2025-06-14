
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Heart,
  Share
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVillage } from "@/hooks/useVillages";
import { useAccommodations } from "@/hooks/useAccommodations";
import { getVillageImageUrl } from "@/utils/storage";

const VillageDetail = () => {
  const { id } = useParams();
  const { data: village, isLoading: villageLoading, error: villageError } = useVillage(id || "");
  const { data: accommodations, isLoading: accommodationsLoading } = useAccommodations(id);
  
  const [selectedDates, setSelectedDates] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2
  });

  if (villageLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-6"></div>
            <div className="h-96 bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (villageError || !village) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <Link to="/villages" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to villages
          </Link>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">Village not found</p>
            <Link to="/villages">
              <Button>Browse all villages</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Sample images for carousel
  const images = village.hero_image ? [
    getVillageImageUrl(village.hero_image),
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80",
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1730&q=80",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  ] : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Village header */}
        <div className="container py-8">
          <Link to="/villages" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to villages
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold">{village.name}</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
          
          <div className="flex items-center text-sm mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{village.state || 'Unknown State'}</span>
            {village.profiles?.full_name && (
              <>
                <span className="mx-2">•</span>
                <span>Hosted by {village.profiles.full_name}</span>
              </>
            )}
          </div>
          
          {/* Village images */}
          {images.length > 0 && (
            <div className="mb-12">
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={image} 
                        alt={`${village.name} - image ${index + 1}`} 
                        className="rounded-lg w-full aspect-[16/9] object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Village info */}
            <div className="md:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-6">
                  <div className="mb-8">
                    <h3 className="text-xl font-medium mb-4">About this village</h3>
                    <p className="text-muted-foreground mb-6">
                      {village.description || 'No description available for this village.'}
                    </p>
                    {village.nightly_price && (
                      <p className="text-lg font-semibold">Starting from ${village.nightly_price}/night</p>
                    )}
                    {village.guide_fee && (
                      <p className="text-sm text-muted-foreground mt-2">Guide fee: ${village.guide_fee}</p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="accommodations" className="mt-6">
                  <h3 className="text-xl font-medium mb-4">Available Accommodations</h3>
                  
                  {accommodationsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse border rounded-lg p-4">
                          <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : accommodations && accommodations.length > 0 ? (
                    <div className="space-y-4">
                      {accommodations.map((accommodation) => (
                        <Card key={accommodation.id}>
                          <CardContent className="p-4">
                            <h4 className="font-medium text-lg mb-2">{accommodation.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{accommodation.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm">
                                <span>Type: {accommodation.type.replace('_', ' ')}</span>
                                <span>Max guests: {accommodation.max_guests}</span>
                                <span className="font-medium">${accommodation.price_per_night}/night</span>
                              </div>
                              <Button size="sm">Book Now</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No accommodations available at this time.</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking card */}
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div>
                      <span className="text-xl">Explore {village.name}</span>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Discover accommodations and experiences in this unique village
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Check-in</label>
                      <Input 
                        type="date" 
                        value={selectedDates.checkIn}
                        onChange={(e) => setSelectedDates({...selectedDates, checkIn: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Check-out</label>
                      <Input 
                        type="date" 
                        value={selectedDates.checkOut}
                        onChange={(e) => setSelectedDates({...selectedDates, checkOut: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Guests</label>
                      <Input 
                        type="number" 
                        min="1" 
                        max="10" 
                        value={selectedDates.guests}
                        onChange={(e) => setSelectedDates({...selectedDates, guests: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full mb-4">Search Accommodations</Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Find the perfect stay in {village.name}
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VillageDetail;