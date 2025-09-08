import { Button } from "@/components/ui/button";
import { PixelCard } from "@/components/PixelCard";
import { Link } from "react-router-dom";
import { Copy, ArrowLeft } from "lucide-react";

export default function BattleCreate() {
  // Placeholder UUID for demo
  const battleId = "a7b8c9d0-e1f2-3456-7890-abcdef123456";

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b-4 border-border bg-card/90 backdrop-blur-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-pixel text-xl text-gradient-primary">PIXEL REALM</h1>
          <Button variant="pixel-outline" size="sm" asChild>
            <Link to="/battle">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Battle
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full">
          <PixelCard variant="glow" className="text-center">
            <h1 className="font-pixel text-3xl md:text-4xl mb-8 text-gradient-secondary">
              Create a Battle
            </h1>
            
            <p className="font-cyber text-lg mb-8 text-muted-foreground">
              Your battle has been created! Share this ID with your opponent.
            </p>

            {/* Battle ID Display */}
            <PixelCard variant="accent" className="mb-8">
              <h3 className="font-pixel text-lg mb-4 text-accent">Battle ID</h3>
              <div className="bg-muted/30 border-2 border-border p-4 mb-4 font-mono text-sm md:text-base text-foreground break-all">
                {battleId}
              </div>
              
              <Button variant="pixel" size="lg" className="w-full">
                <Copy className="w-5 h-5 mr-2" />
                <span className="font-pixel">Copy ID</span>
              </Button>
            </PixelCard>

            <div className="space-y-4">
              <p className="font-cyber text-sm text-muted-foreground">
                Waiting for opponent to join...
              </p>
              
              <div className="pixel-loading h-2 bg-muted/30 border-2 border-border"></div>
              
              <Button variant="pixel-outline" size="lg" asChild>
                <Link to="/battle">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Battle Arena
                </Link>
              </Button>
            </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}