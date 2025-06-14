
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-xl text-village-500">Village<span className="text-earth-500">Connect</span></span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting travelers with authentic village experiences around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Discover</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/villages" className="text-foreground/70 hover:text-foreground text-sm">
                  Villages
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="text-foreground/70 hover:text-foreground text-sm">
                  Experiences
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-foreground/70 hover:text-foreground text-sm">
                  Local Guides
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-foreground/70 hover:text-foreground text-sm">
                  Cultural Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Hosting</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/host" className="text-foreground/70 hover:text-foreground text-sm">
                  Become a Host
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-foreground/70 hover:text-foreground text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/host-guidelines" className="text-foreground/70 hover:text-foreground text-sm">
                  Hosting Guidelines
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-foreground/70 hover:text-foreground text-sm">
                  Host Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-foreground/70 hover:text-foreground text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/trust" className="text-foreground/70 hover:text-foreground text-sm">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/70 hover:text-foreground text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-foreground/70 hover:text-foreground text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2023 VillageConnect. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link to="/terms" className="text-foreground/70 hover:text-foreground">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-foreground/70 hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-foreground/70 hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
