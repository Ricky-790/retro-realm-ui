import { motion } from "framer-motion";
import { Trophy, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VictoryCardProps {
  winner: string;
  loser: string;
  onClose?: () => void;
  onPlayAgain?: () => void;
}

export function VictoryCard({ winner, loser, onClose, onPlayAgain }: VictoryCardProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          type: "spring", 
          stiffness: 100,
          delay: 0.2 
        }}
        className="relative bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary p-8 rounded-2xl max-w-md mx-4 text-center"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2))",
          boxShadow: `
            0 0 50px hsl(var(--primary) / 0.4),
            0 0 100px hsl(var(--primary) / 0.2),
            inset 0 0 50px hsl(var(--primary) / 0.1)
          `
        }}
      >
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              initial={{ 
                x: Math.random() * 400, 
                y: Math.random() * 300,
                opacity: 0 
              }}
              animate={{ 
                y: -50,
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Victory crown */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="mb-4"
        >
          <Crown className="w-16 h-16 mx-auto text-primary" style={{
            filter: `drop-shadow(0 0 20px hsl(var(--primary)))`
          }} />
        </motion.div>

        {/* Victory text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-pixel text-3xl text-primary mb-2"
          style={{
            textShadow: `0 0 20px hsl(var(--primary))`
          }}
        >
          VICTORY!
        </motion.h1>

        {/* Winner announcement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-6"
        >
          <div className="font-pixel text-xl text-foreground mb-2">
            <span className="text-primary glow-text">{winner}</span>
          </div>
          <div className="font-cyber text-sm text-muted-foreground">
            defeated
          </div>
          <div className="font-pixel text-lg text-muted-foreground mt-1">
            {loser}
          </div>
        </motion.div>

        {/* Victory stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center gap-6 mb-6"
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-cyber text-sm text-foreground">+150 XP</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <span className="font-cyber text-sm text-foreground">+50 Points</span>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex gap-3"
        >
          <Button
            variant="hero"
            className="flex-1"
            onClick={onPlayAgain}
          >
            Play Again
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Exit
          </Button>
        </motion.div>

        {/* Glow overlay */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 70%)`
          }}
        />
      </motion.div>
    </div>
  );
}