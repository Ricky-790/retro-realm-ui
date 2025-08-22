import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded border-2 border-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded border-2 border-destructive",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground rounded",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded border-2 border-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Pixel-specific variants
        pixel: "btn-pixel bg-primary text-primary-foreground hover:bg-primary-glow rounded-none border-3 border-primary",
        "pixel-secondary": "btn-pixel bg-secondary text-secondary-foreground hover:bg-secondary-glow rounded-none border-3 border-secondary",
        "pixel-accent": "btn-pixel bg-accent text-accent-foreground hover:bg-accent-glow rounded-none border-3 border-accent",
        "pixel-outline": "btn-pixel bg-transparent text-primary border-3 border-primary hover:bg-primary hover:text-primary-foreground rounded-none",
        hero: "btn-pixel bg-gradient-primary text-primary-foreground glow-primary hover:animate-glitch rounded-none border-3 border-primary font-pixel text-lg",
        cta: "btn-pixel bg-gradient-secondary text-secondary-foreground glow-secondary hover:scale-105 rounded-none border-4 border-secondary font-pixel",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-16 px-10 py-4 text-lg",
        xl: "h-20 px-12 py-6 text-xl",
        icon: "h-12 w-12",
        "icon-sm": "h-10 w-10",
        "icon-lg": "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
