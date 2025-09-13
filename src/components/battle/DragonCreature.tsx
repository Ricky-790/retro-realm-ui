import { HealthBars } from "./HealthBars";
import dragonBack from "@/assets/dragon-back.jpg";

export function DragonCreature() {
  return (
    <>
      {/* Dragon Image */}
      <div className="absolute bottom-10 left-32">
        <img 
          src={dragonBack} 
          alt="DragonFly"
          className="w-64 h-64 object-contain pixel-perfect scale-x-[-1]"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Dragon Info Panel - Bottom Left Corner */}
      <div className="absolute bottom-4 left-4">
        <div className="bg-black/70 rounded p-2 space-y-1">
          <div className="font-pixel text-[12px] text-white">
            DragonFly
          </div>
          <div className="font-cyber text-[10px] text-white">
            Player 1
          </div>
          <HealthBars 
            hp={85}
            maxHp={100}
            exp={240}
            maxExp={500}
          />
        </div>
      </div>
    </>
  );
}
