import { StatusBar } from "@/components/battle/StatusBar";
import { DragonCreature } from "@/components/battle/DragonCreature";
import { PandaCreature } from "@/components/battle/PandaCreature";
import { BattleLogs } from "@/components/battle/BattleLogs";
import { MovesPanel } from "@/components/battle/MovesPanel";
import { VictoryCard } from "@/components/battle/VictoryCard";
import { useState } from "react";
import bgbt from "../assets/bgbt.jpg";

export default function BattleArea() {
  const [showVictory, setShowVictory] = useState(true); // Set to true to show the victory card
  return (
    <div className="min-h-screen bg-forest-background relative overflow-hidden">
      {/* Status Bar */}
      <StatusBar />

      {/* Main Content */}
      <div className="flex h-screen pt-16">
        {/* Left Side - Battle Arena */}
        <div className="flex-1 relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgbt})` }}
          ></div>

          {/* Dragon Creature - Bottom Left */}
          <DragonCreature />

          

          {/* Panda Creature - Center Right */}
          <PandaCreature />

        </div>

        {/* Right Side - Information Panel */}
        <div className="w-80 bg-blue-900 border-l-4 border-blue-700 flex flex-col">
          {/* Battle Logs */}
          <div className="flex-1 p-4">
            <BattleLogs />
          </div>
          
          {/* Moves Panel */}
          <div className="p-4 border-t-2 border-blue-700">
            <MovesPanel />
          </div>
        </div>
      </div>

      {/* Victory Card Overlay */}
      {showVictory && (
        <VictoryCard 
          winner="Pandabob"
          loser="DragonFly"
          onClose={() => setShowVictory(false)}
          onPlayAgain={() => {
            setShowVictory(false);
            // Add play again logic here
          }}
        />
      )}
    </div>
  );
}
