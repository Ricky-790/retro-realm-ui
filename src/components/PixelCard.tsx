import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glow" | "accent";
}

export function PixelCard({ children, className, variant = "default" }: PixelCardProps) {
  const variantClasses = {
    default: "bg-card border-border",
    glow: "bg-card border-primary glow-primary",
    accent: "bg-card border-accent glow-accent"
  };

  return (
    <div 
      className={cn(
        "border-pixel p-6 relative",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}