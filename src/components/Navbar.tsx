
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl text-village-500">Village<span className="text-earth-500">Connect</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/villages" className="text-foreground/80 hover:text-foreground transition-colors">
            Explore Villages
          </Link>
          <Link to="/experiences" className="text-foreground/80 hover:text-foreground transition-colors">
            Cultural Experiences
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About Us
          </Link>
          {profile?.role === 'host' && (
            <Link to="/host/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              My Dashboard
            </Link>
          )}
          {!user && (
            <Link to="/host" className="text-foreground/80 hover:text-foreground transition-colors">
              Become a Host
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || ''} />
                    <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{profile?.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground capitalize">
                      {profile?.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {profile?.role === 'host' && (
                  <DropdownMenuItem asChild>
                    <Link to="/host/dashboard" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[385px]">
            <div className="flex flex-col gap-8 pt-6">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <span className="font-bold text-xl text-village-500">Village<span className="text-earth-500">Connect</span></span>
              </Link>
              
              {user && (
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || ''} />
                    <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{profile?.full_name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{profile?.role}</p>
                  </div>
                </div>
              )}
              
              <nav className="flex flex-col gap-4">
                <Link 
                  to="/villages" 
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Explore Villages
                </Link>
                <Link 
                  to="/experiences" 
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Cultural Experiences
                </Link>
                <Link 
                  to="/about" 
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
                {profile?.role === 'host' && (
                  <Link 
                    to="/host/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="text-foreground/80 hover:text-foreground transition-colors"
                  >
                    My Dashboard
                  </Link>
                )}
                {!user && (
                  <Link 
                    to="/host" 
                    onClick={() => setIsOpen(false)}
                    className="text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Become a Host
                  </Link>
                )}
                {user && (
                  <Link 
                    to="/profile" 
                    onClick={() => setIsOpen(false)}
                    className="text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Profile
                  </Link>
                )}
              </nav>
              
              <div className="flex flex-col gap-2">
                {user ? (
                  <Button onClick={() => { signOut(); setIsOpen(false); }} variant="outline" className="w-full">
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
