import { Navigation } from "@/components/Navigation";
import { PixelCard } from "@/components/PixelCard";
import { Trophy, Medal, Star } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "PixelMaster", score: 15420, icon: Trophy, color: "text-warning" },
  { rank: 2, name: "DragonSlayer", score: 12890, icon: Medal, color: "text-muted-foreground" },
  { rank: 3, name: "MysticRealm", score: 11750, icon: Medal, color: "text-accent" },
  { rank: 4, name: "NeonWarrior", score: 10920, icon: Star, color: "text-primary" },
  { rank: 5, name: "CyberPet", score: 9680, icon: Star, color: "text-secondary" },
  { rank: 6, name: "RetroHero", score: 8750, icon: Star, color: "text-muted-foreground" },
  { rank: 7, name: "PixelNinja", score: 7890, icon: Star, color: "text-muted-foreground" },
  { rank: 8, name: "BitCrusher", score: 7250, icon: Star, color: "text-muted-foreground" },
];

export default function Leaderboard() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-pixel text-4xl md:text-6xl mb-4 text-gradient-primary">
            Leaderboard
          </h1>
          <p className="font-cyber text-lg text-muted-foreground">
            Top players in the Pixel Realm
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {leaderboardData.slice(0, 3).map((player, index) => (
              <PixelCard 
                key={player.rank} 
                variant={index === 0 ? "glow" : "default"}
                className={`text-center order-${index === 0 ? '2' : index === 1 ? '1' : '3'} md:order-${index + 1}`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center border-4 ${
                  index === 0 ? 'bg-gradient-primary border-primary' :
                  index === 1 ? 'bg-gradient-secondary border-secondary' :
                  'bg-gradient-accent border-accent'
                }`}>
                  <player.icon className={`w-8 h-8 ${player.color}`} />
                </div>
                
                <h3 className="font-pixel text-lg mb-2 text-gradient-primary">
                  #{player.rank}
                </h3>
                
                <p className="font-cyber text-xl font-bold mb-2">
                  {player.name}
                </p>
                
                <p className="font-pixel text-sm text-gradient-secondary">
                  {player.score.toLocaleString()} pts
                </p>
              </PixelCard>
            ))}
          </div>

          {/* Rest of Leaderboard */}
          <PixelCard>
            <h2 className="font-pixel text-xl mb-6 text-center text-gradient-accent">
              Top Players
            </h2>
            
            <div className="space-y-3">
              {leaderboardData.slice(3).map((player) => (
                <div 
                  key={player.rank}
                  className="flex items-center justify-between p-4 bg-muted/30 border-2 border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-card border-2 border-border">
                      <span className="font-pixel text-sm">#{player.rank}</span>
                    </div>
                    
                    <player.icon className={`w-5 h-5 ${player.color}`} />
                    
                    <span className="font-cyber font-medium">
                      {player.name}
                    </span>
                  </div>
                  
                  <span className="font-pixel text-sm text-gradient-primary">
                    {player.score.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}