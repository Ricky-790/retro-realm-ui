import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PixelCard } from "@/components/PixelCard";
import { Link } from "react-router-dom";
import { Sword, Heart, Trophy, User, Package, ShoppingCart, Settings } from "lucide-react";
import petDog from "@/assets/pet-dog.png";

export default function Home() {
  const [showBottomBar, setShowBottomBar] = useState(false);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const threshold = 50; // px from bottom of screen
      const windowHeight = window.innerHeight;
      if (event.clientY > windowHeight - threshold) {
        setShowBottomBar(true);
      } else {
        setShowBottomBar(false);
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const actionButtons = [
    { icon: Sword, label: "Battle", color: "bg-destructive", href: "/battle" },
    //{ icon: Sword, label: "Battle Area", color: "bg-destructive", href: "/battlearea" },
    { icon: Heart, label: "Feed", color: "bg-success", href: "#" },
    { icon: Trophy, label: "Train", color: "bg-warning", href: "#" },
  ];

  const bottomNavItems = [
    { icon: User, label: "Profile", href: "#" },
    { icon: Package, label: "Inventory", href: "#" },
    { icon: ShoppingCart, label: "Shop", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b-4 border-border bg-card/90 backdrop-blur-sm p-4">
      <div className="container mx-auto flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-4">
          <h1 className="font-pixel text-xl text-gradient-primary">PIXEL REALM</h1>
            <Link 
            to="/leaderboard"
            className="font-pixel text-sm text-gradient-accent hover:underline"
            >
              Leaderboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-start">
              <span className="font-cyber text-sm text-muted-foreground">Player</span>
              <span className="font-cyber text-xs text-muted-foreground">Level 5</span>
            </div>
            <div className="w-12 h-12 bg-gradient-primary border-2 border-primary rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        {/* Pet Display */}
        <div className="flex-1">
          <PixelCard variant="glow" className="h-fit">
            <div className="text-center">
              <h2 className="font-pixel text-2xl mb-6 text-gradient-secondary">
                Your Pet: Pixel
              </h2>

              {/* Pet Container */}
              <div className="relative bg-muted/30 border-4 border-border p-8 mb-6 min-h-[300px] flex items-center justify-center">
                <img 
                  src={petDog} 
                  alt="Your pet" 
                  className="w-48 h-48 object-contain pixel-perfect"
                  style={{ imageRendering: 'pixelated' }}
                />

                {/* Pet Stats */}
                <div className="absolute top-4 left-4 space-y-2">
                  <div className="bg-card/90 border-2 border-border px-3 py-1">
                    <span className="font-pixel text-xs text-success">HP: 85/100</span>
                  </div>
                  <div className="bg-card/90 border-2 border-border px-3 py-1">
                    <span className="font-pixel text-xs text-warning">EXP: 240/500</span>
                  </div>
                </div>
              </div>

              <Button variant="pixel-outline" size="lg" asChild>
                <Link to="/create-character">
                  Customize Pet
                </Link>
              </Button>
            </div>
          </PixelCard>
        </div>

        {/* Action Buttons */}
        <div className="lg:w-80">
          <PixelCard className="mb-6">
            <h3 className="font-pixel text-lg mb-4 text-center text-gradient-accent">
              Actions
            </h3>

            <div className="space-y-3">
              {actionButtons.map((action, index) => (
                <Button
                  key={index}
                  variant="pixel"
                  size="lg"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={action.href}>
                    <action.icon className="w-5 h-5 mr-3" />
                    {action.label}
                  </Link>
                </Button>
              ))}
            </div>
          </PixelCard>

          {/* Quick Stats */}
          <PixelCard variant="accent">
            <h3 className="font-pixel text-lg mb-4 text-center text-accent">
              Stats
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-cyber text-sm">Battles Won</span>
                <span className="font-pixel text-sm text-primary">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-cyber text-sm">Tokens Earned</span>
                <span className="font-pixel text-sm text-secondary">1,250</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-cyber text-sm">Rank</span>
                <span className="font-pixel text-sm text-accent">#847</span>
              </div>
            </div>
          </PixelCard>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t-4 border-border p-4 transition-transform duration-300 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto">
          <div className="flex justify-around">
            {bottomNavItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="flex flex-col items-center space-y-1 p-2 hover:text-primary transition-colors"
              >
                <item.icon className="w-6 h-6" />
                <span className="font-pixel text-xs">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
