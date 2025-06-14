
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-village-500 to-earth-500 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Village Life?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Connect with local hosts, discover authentic experiences, and create memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/villages">
              <Button size="lg" variant="secondary" className="font-medium px-8">
                Explore Villages
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" className="bg-white text-village-600 hover:bg-white/90 font-medium px-8">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;