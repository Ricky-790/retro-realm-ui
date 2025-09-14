import { Button } from "@/components/ui/button";
import { PixelCard } from "@/components/PixelCard";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Zap, Wifi, WifiOff } from "lucide-react";
import dragonFront from "@/assets/Dragon-front.jpg";
import pandaFront from "@/assets/panda-front.jpg";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { io } from "socket.io-client";
import { useGlobalContext } from "@/context";

export default function BattleRoom() {
  const { battleId } = useParams();
  const { toast } = useToast();
  const [status, setStatus] = useState("Connecting...");
  const [isConnected, setIsConnected] = useState(false);
  const [battleLogs, setBattleLogs] = useState<string[]>([
    
  ]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { walletAddress } = useGlobalContext();
  // Simulate socket connection
  useEffect(() => {
    // connect to backend
    console.log("Connecting to socket");
    const socket = io(`${BACKEND_URL}`); // adjust backend URL if deployed

    // join the game
    console.log("Joining game...");
    socket.emit("joinGame", {
      battleId: battleId,
      playerAddress: walletAddress,
      name: "Pikachu",
      pokemonId: 2,
      hp: 20,
      moves: [],
    });
    console.log("Emitted");
    socket.on("player joined", (playerNumber: number) => {
      console.log("Player joined:", playerNumber);
      setBattleLogs((prev) => [
        ...prev,
        `Player ${playerNumber} joined!`
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [battleId]);

  // Simulate socket events
  const simulateSocketEvent = (eventType: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const message = `[${timestamp}] Socket event: ${eventType}`;

    setBattleLogs((prev) => [...prev, message]);

    toast({
      title: "Socket Event",
      description: `${eventType} sent`,
    });

    // Simulate response after delay
    setTimeout(() => {
      const responseMessage = `[${timestamp}] Server response: ${eventType}_response`;
      setBattleLogs((prev) => [...prev, responseMessage]);
    }, 500);
  };

  const clearLogs = () => {
    setBattleLogs([]);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b-4 border-border bg-card/90 backdrop-blur-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-pixel text-xl text-gradient-primary">
              BATTLE ROOM
            </h1>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500" />
              )}
              <span className="font-cyber text-sm text-muted-foreground">
                {isConnected ? "Connected" : "Connecting..."}
              </span>
            </div>
          </div>
          <Button variant="pixel-outline" size="sm" asChild>
            <Link to="/battle">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Battle
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Battle Controls */}
          <PixelCard variant="glow">
            <h2 className="font-pixel text-2xl mb-4 text-gradient-primary">
              Battle Controls
            </h2>
            <p className="font-cyber text-sm mb-6 text-muted-foreground">
              Battle ID:{" "}
              <span className="text-primary font-bold">{battleId}</span>
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="flex-col h-32 border-2 border-primary rounded-lg p-2 hover:border-accent transition-colors disabled:opacity-50"
                  onClick={() => simulateSocketEvent("dragon_attack")}
                  disabled={!isConnected}
                >
                  <img 
                    src={dragonFront} 
                    alt="DragonFly" 
                    className="w-20 h-20 object-cover rounded mb-1"
                  />
                  <span className="font-pixel text-xs">DragonFly</span>
                </button>

                <button
                  className="flex-col h-32 border-2 border-primary rounded-lg p-2 hover:border-accent transition-colors disabled:opacity-50"
                  onClick={() => simulateSocketEvent("panda_attack")}
                  disabled={!isConnected}
                >
                  <img 
                    src={pandaFront} 
                    alt="Pandabob" 
                    className="w-20 h-20 object-cover rounded mb-1"
                  />
                  <span className="font-pixel text-xs">Pandabob</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="text-xs"
                  onClick={() => simulateSocketEvent("hydro_beam")}
                  disabled={!isConnected}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Hydro Beam
                </Button>
                <Button
                  variant="outline"
                  className="text-xs"
                  onClick={() => simulateSocketEvent("tail_smack")}
                  disabled={!isConnected}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Tail Smack
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => simulateSocketEvent("join_room")}
                  disabled={!isConnected}
                >
                  Join Room
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => simulateSocketEvent("leave_room")}
                  disabled={!isConnected}
                >
                  Leave Room
                </Button>
              </div>
            </div>
          </PixelCard>

          {/* Socket Logs */}
          <PixelCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-pixel text-2xl text-gradient-primary">
                Socket Logs
              </h2>
              <Button variant="outline" size="sm" onClick={clearLogs}>
                Clear
              </Button>
            </div>

            <div className="bg-background/50 border-2 border-border rounded-lg p-4 h-80 overflow-y-auto">
              {battleLogs.length === 0 ? (
                <p className="text-muted-foreground font-cyber text-sm">
                  No logs yet. Use the controls to test socket events.
                </p>
              ) : (
                <div className="space-y-1">
                  {battleLogs.map((log, index) => (
                    <div
                      key={index}
                      className="font-mono text-xs text-foreground"
                    >
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
