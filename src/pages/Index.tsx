
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedVillages from "@/components/FeaturedVillages";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import HostSection from "@/components/HostSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedVillages />
        <Features />
        <Testimonials />
        <HostSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
