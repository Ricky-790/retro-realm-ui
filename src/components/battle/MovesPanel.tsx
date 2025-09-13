import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function MovesPanel() {
  const navigate = useNavigate();

  const moves = [
    { name: "Thunderbolt", highlighted: false },
    { name: "Thunderbolt", highlighted: false },
    { name: "Thunderbolt", highlighted: false },
    { name: "Special", highlighted: true },
    { name: "Defend", highlighted: false },
    { name: "Flee", highlighted: false }
  ];

  const [showFleeConfirm, setShowFleeConfirm] = useState(false);

  const handleFleeClick = () => {
    setShowFleeConfirm(true);
  };

  const confirmFlee = () => {
    setShowFleeConfirm(false);
    // Add flee logic here if needed
    navigate("/battle/join");  // Navigate to battlejoin page
  };

  const cancelFlee = () => {
    setShowFleeConfirm(false);
  };

  return (
    <>
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
                onClick={isFlee ? handleFleeClick : undefined}
              >
                {move.name}
              </button>
            );
          })}
        </div>
      </div>

      {showFleeConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg max-w-sm text-center space-y-4">
            <p className="font-pixel text-white">
              If you flee, you lose points, XP and even Bonuses!!
            </p>
            <div className="flex justify-around space-x-4">
              <button
                onClick={confirmFlee}
                className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelFlee}
                className="bg-gray-500 text-white px-4 py-2 rounded font-bold hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}