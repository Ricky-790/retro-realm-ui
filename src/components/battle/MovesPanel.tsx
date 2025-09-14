import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
  const [thunderboltActive, setThunderboltActive] = useState(false);
  const [specialActive, setSpecialActive] = useState(false);

  // New states for defense popup
  const [defenseMessage, setDefenseMessage] = useState<string | null>(null);

  const handleFleeClick = () => {
    setShowFleeConfirm(true);
  };

  const confirmFlee = () => {
    setShowFleeConfirm(false);
    navigate("/battle/join");
  };

  const cancelFlee = () => {
    setShowFleeConfirm(false);
  };

  const handleThunderbolt = () => {
    setThunderboltActive(true);
    setTimeout(() => setThunderboltActive(false), 600);
  };

  const handleSpecial = () => {
    setSpecialActive(true);
    setTimeout(() => setSpecialActive(false), 600);
  };

  // New handler for Defend button
  const handleDefend = () => {
    const success = Math.random() > 0.3;
    setDefenseMessage(success ? "Defence Successful" : "Defence Unsuccessful");
    setTimeout(() => setDefenseMessage(null), 2000); // Hide after 3 seconds
  };

  return (
    <>
      {/* Thunderbolt animation overlay */}
      <AnimatePresence>
        {thunderboltActive && (
          <motion.svg
            className="pointer-events-none fixed left-[120px] top-[340px] z-50"
            width="80"
            height="200"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.7 }}
            animate={{ opacity: 1, x: 440, y: -130, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 210 }}
          >
            <polyline
              points="25,0 40,50 20,55 45,110 30,54 50,52"
              fill="none"
              stroke="yellow"
              strokeWidth="8"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
            <defs>
              <filter id="glow">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="gold" />
              </filter>
            </defs>
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Special fire animation overlay */}
      <AnimatePresence>
        {specialActive && (
          <motion.svg
            className="pointer-events-none fixed left-[120px] top-[340px] z-50"
            width="80"
            height="100"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.7 }}
            animate={{ opacity: 1, x: 480, y: -130, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 210 }}
            viewBox="0 0 50 140"
          >
            <path
              d="M25 10 C35 40, 15 60, 25 90 C35 120, 30 135, 22 140 C28 125, 15 115, 20 90 C10 60, 25 40, 25 10 Z"
              fill="orange"
              stroke="red"
              strokeWidth="5"
              filter="url(#fireGlow)"
            />
            <defs>
              <filter id="fireGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="orange" />
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="red" />
              </filter>
            </defs>
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Defense success/fail popup */}
      <AnimatePresence>
        {defenseMessage && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-gray-900 bg-opacity-90 text-white font-pixel px-6 py-3 rounded z-50"
            initial={{ opacity: 0, x: -300,  y: 250 }}
            animate={{ opacity: 1, x: -300, y: 250 }}
            exit={{ opacity: 0, x: -300, y: 250 }}
            transition={{ duration: 0.3 }}
          >
            {defenseMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <h3 className="font-pixel text-lg text-white text-center">All Moves</h3>
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
                onClick={
                  isFlee
                    ? handleFleeClick
                    : move.name === "Thunderbolt"
                    ? handleThunderbolt
                    : move.name === "Special"
                    ? handleSpecial
                    : move.name === "Defend"
                    ? handleDefend
                    : undefined
                }
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