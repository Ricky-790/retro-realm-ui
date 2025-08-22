import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/leaderboard", label: "Leaderboard" }
  ];

  return (
    <header className="border-b-4 border-border bg-card/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary border-2 border-primary"></div>
          <span className="font-pixel text-xl text-gradient-primary">PIXEL REALM</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "font-cyber font-medium transition-colors hover:text-primary",
                location.pathname === item.href 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Button variant="hero" size="lg" asChild>
          <Link to="/login">Play Now</Link>
        </Button>
      </div>
    </header>
  );
}