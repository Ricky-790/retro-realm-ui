import { Button } from "@/components/ui/button";
import { PixelCard } from "@/components/PixelCard";
import { Link, useNavigate } from "react-router-dom";
import { Sword, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Battle() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  // Simulate backend API call to create a battle
  const handleCreateBattle = async () => {
    setIsCreating(true);
    toast({
      title: "Creating Battle...",
      description: "Setting up your battle room",
    });

    // Simulate API delay
    setTimeout(() => {
      // Generate dummy battle ID
      const battleId = Math.random().toString(36).substring(2, 15);
      
      toast({
        title: "Battle Created!",
        description: `Battle ID: ${battleId}`,
      });

      // Redirect to battle room
      navigate(`/battle/${battleId}`);
      setIsCreating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b-4 border-border bg-card/90 backdrop-blur-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-pixel text-xl text-gradient-primary">PIXEL REALM</h1>
          <Button variant="pixel-outline" size="sm" asChild>
            <Link to="/home">Back to Home</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full">
          <PixelCard variant="glow" className="text-center">
            <h1 className="font-pixel text-4xl md:text-6xl mb-8 text-gradient-primary">
              Battle Arena
            </h1>
            
            <p className="font-cyber text-lg mb-12 text-muted-foreground">
              Choose your battle mode and engage in epic pixel combat!
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Button 
                variant="hero" 
                size="xl" 
                className="h-24 flex-col" 
                onClick={handleCreateBattle}
                disabled={isCreating}
              >
                <Sword className="w-8 h-8 mb-2" />
                <span className="font-pixel">
                  {isCreating ? "Creating..." : "Create Battle"}
                </span>
              </Button>

              <Button variant="pixel" size="xl" className="h-24 flex-col" asChild>
                <Link to="/battle/join">
                  <Users className="w-8 h-8 mb-2" />
                  <span className="font-pixel">Join Battle</span>
                </Link>
              </Button>
            </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}