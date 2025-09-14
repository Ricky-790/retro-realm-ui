import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";

export function StatusBar() {
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    let interval;
    if (started && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setStarted(false); // optionally reset started when timer ends
    }
    return () => clearInterval(interval);
  }, [started, timer]);

  const handleStart = () => {
    if (!started) {
      setStarted(true);
      setTimer(120);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-10 bg-blue-900 border-b-4 border-blue-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="pixel-outline" size="sm" asChild>
            <Link to="/battle/join">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button variant="pixel" size="sm" onClick={handleStart}>
            {!started ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Battle
              </>
            ) : (
              <>
                Time Left: {timer}s
              </>
            )}
          </Button>
        </div>
        <div className="font-pixel text-sm text-white">
          Battle ID: #27894848 
        </div>
      </div>
    </div>
  );
}
