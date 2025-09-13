import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PixelCard } from "@/components/PixelCard";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BattleJoin() {
  const navigate = useNavigate();
  const toast = useToast();
  const [battleId, setBattleId] = useState("");

  const handleJoin = async () => {
    if (!battleId) {
      toast({
        title: "Invalid Battle ID",
        description: "Please enter a valid Battle ID.",
        variant: "destructive",
      });
      return;
    }

    navigate(`/battle/${battleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b-4 border-border bg-card/90 backdrop-blur-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-pixel text-xl text-gradient-primary">
            PIXEL REALM
          </h1>
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
            <h1 className="font-pixel text-3xl md:text-4xl mb-8 text-gradient-accent">
              Join a Battle
            </h1>

            <p className="font-cyber text-lg mb-8 text-muted-foreground">
              Enter the Battle ID provided by your opponent to join their
              battle.
            </p>

            {/* Join Form */}
            <div className="space-y-6">
              <div className="text-left">
                <label
                  htmlFor="battleId"
                  className="block font-pixel text-sm mb-2 text-foreground"
                >
                  Enter Battle ID
                </label>
                <Input
                  id="battleId"
                  type="text"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  className="font-mono"
                />
              </div>

              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={async () => {
                  navigate(`/battle/${}`);
                }}
              >
                <Gamepad2 className="w-6 h-6 mr-2" />
                <span className="font-pixel">Join Battle</span>
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-border">
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
