export function MovesPanel() {
  const moves = [
    { name: "Thunderbolt", highlighted: false },
    { name: "Thunderbolt", highlighted: false },
    { name: "Thunderbolt", highlighted: false },
    { name: "Special", highlighted: true },
    { name: "Defend", highlighted: false },
    { name: "Flee", highlighted: false }
  ];

  return (
    <div className="space-y-2">
      <h3 className="font-pixel text-lg text-white text-center">
        All Moves
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {moves.map((move, index) => {
          const isFlee = move.name === "Flee";
          return (
            <button
              key={index}
              className={`font-pixel text-xs px-1 py-2 border-2 rounded transition-all hover:scale-90 h-10 w-36 text-left
                ${
                  isFlee
                    ? "bg-red-600 text-white border-red-400 hover:bg-red-700"
                    : move.highlighted
                    ? "bg-blue-500 text-white border-blue-300"
                    : "bg-blue-800 text-white border-blue-600 hover:bg-blue-700"
                }`}
            >
              {move.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}