
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Staying in a village homestay was the highlight of our trip. The warmth of our host family and the authentic experiences we had were incomparable to any hotel stay.",
    author: "Sarah Johnson",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    quote: "VillageConnect made it so easy to find and book a unique cultural experience. The local guides were knowledgeable and passionate about sharing their heritage.",
    author: "Raj Patel",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    quote: "As someone who values authentic travel, this platform has been a game-changer. I've made lifelong friends and gained insights into traditions I would have never discovered otherwise.",
    author: "Mei Lin",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    quote: "The opportunity to stay with a family in a mountain village gave us a completely different perspective. Our children learned so much about sustainability and traditional ways of living.",
    author: "Thomas Schmidt",
    location: "Berlin, Germany",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Travelers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from guests who have experienced authentic village connections through our platform.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-1">
                <Card className="h-full border bg-background">
                  <CardContent className="p-6 flex flex-col h-full">
                    <QuoteIcon className="h-8 w-8 text-village-500 mb-4" />
                    <p className="text-foreground mb-6 flex-1">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative inset-0 translate-y-0 mr-2" />
            <CarouselNext className="relative inset-0 translate-y-0 ml-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
