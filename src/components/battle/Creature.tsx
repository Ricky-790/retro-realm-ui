interface CreatureProps {
  name: string;
  player: string;
  image: string;
  facing: "toward" | "away";
}

export function Creature({ name, player, image, facing }: CreatureProps) {
  return (
    <div className="relative">
      {/* Creature Image */}
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className={`w-48 h-48 object-contain pixel-perfect ${
            facing === "away" ? "scale-x-[-1]" : ""
          }`}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      
      {/* Creature Name and Player */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="font-pixel text-[10px] text-white bg-black/70 px-1 py-0.5 rounded">
          {name}
        </div>
        <div className="font-cyber text-[8px] text-white bg-black/70 px-1 py-0.5 rounded mt-0.5">
          {player}
        </div>
      </div>
    </div>
  );
}
