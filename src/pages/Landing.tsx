import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { PixelCard } from "@/components/PixelCard";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";
import { useGlobalContext } from "../context";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-pixel text-4xl md:text-6xl lg:text-8xl mb-6 text-gradient-primary leading-tight">
            PIXEL REALM
          </h1>

          <p className="font-pixel text-lg md:text-2xl mb-8 text-gradient-secondary">
            Embark on an Epic Adventure
          </p>

          <p className="font-cyber text-lg md:text-xl mb-12 text-foreground max-w-2xl mx-auto leading-relaxed">
            Create your dream pet, battle legendary creatures, and explore a
            mystical world where pixel art meets Web3 technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/login">Start Adventure</Link>
            </Button>

            <Button variant="pixel-outline" size="xl" asChild>
              <Link to="/leaderboard">View Leaderboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="font-pixel text-3xl md:text-5xl text-center mb-16 text-gradient-accent">
            Game Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <PixelCard variant="glow" className="text-center">
              <div className="w-16 h-16 bg-gradient-primary mx-auto mb-4 border-4 border-primary"></div>
              <h3 className="font-pixel text-xl mb-4 text-primary">
                Create Pets
              </h3>
              <p className="font-cyber text-muted-foreground">
                Design unique pixel pets with countless customization options
              </p>
            </PixelCard>

            <PixelCard variant="accent" className="text-center">
              <div className="w-16 h-16 bg-gradient-secondary mx-auto mb-4 border-4 border-secondary"></div>
              <h3 className="font-pixel text-xl mb-4 text-secondary">
                Epic Battles
              </h3>
              <p className="font-cyber text-muted-foreground">
                Challenge other players in intense pixel combat
              </p>
            </PixelCard>

            <PixelCard variant="glow" className="text-center">
              <div className="w-16 h-16 bg-gradient-accent mx-auto mb-4 border-4 border-accent"></div>
              <h3 className="font-pixel text-xl mb-4 text-accent">
                Web3 Rewards
              </h3>
              <p className="font-cyber text-muted-foreground">
                Earn tokens and NFTs as you progress through the realm
              </p>
            </PixelCard>
          </div>
        </div>
      </section>
    </div>
  );
}
