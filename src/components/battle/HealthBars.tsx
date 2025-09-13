interface HealthBarsProps {
  hp: number;
  maxHp: number;
  exp: number;
  maxExp: number;
}

export function HealthBars({ hp, maxHp, exp, maxExp }: HealthBarsProps) {
  const hpPercentage = (hp / maxHp) * 100;
  const expPercentage = (exp / maxExp) * 100;

  return (
    <div className="space-y-1 w-32">
      {/* HP Bar (Blue) */}
      <div className="relative">
        <div className="text-[10px] font-pixel text-white mb-1">HP</div>
        <div className="w-full h-2 bg-gray-700 border border-gray-500 rounded">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${hpPercentage}%` }}
          />
        </div>
      </div>

      {/* EXP Bar (Pink) */}
      <div className="relative">
        <div className="text-[10px] font-pixel text-white mb-1">EXP</div>
        <div className="w-full h-2 bg-gray-700 border border-gray-500 rounded">
          <div 
            className="h-full bg-pink-500 transition-all duration-300"
            style={{ width: `${expPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
