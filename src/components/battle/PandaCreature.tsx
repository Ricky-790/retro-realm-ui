import { HealthBars } from "./HealthBars";
import pandaFront from "@/assets/panda-front.jpg";

export function PandaCreature() {
  return (
    <>
      {/* Panda Image */}
      <div className="absolute bottom-48 right-32">
        <img 
          src={pandaFront} 
          alt="Pandabob"
          className="w-64 h-64 object-contain pixel-perfect"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Panda Info Panel - Front Right Corner */}
      <div className="absolute top-5 right-3">
        <div className="bg-black/70 rounded p-2 space-y-1">
          <div className="font-pixel text-[12px] text-white">
            Pandabob
          </div>
          <div className="font-cyber text-[10px] text-white">
            Player 2
          </div>
          <HealthBars 
            hp={60}
            maxHp={100}
            exp={450}
            maxExp={500}
          />
        </div>
      </div>
    </>
  );
}
