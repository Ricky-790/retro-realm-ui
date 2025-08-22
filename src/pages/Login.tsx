import { Button } from "@/components/ui/button";
import { PixelCard } from "@/components/PixelCard";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, Smartphone } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletConnect = async (walletType: string) => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to home page after "connection"
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-background"></div>
      
      {/* Back Button */}
      <Button 
        variant="pixel-outline" 
        size="icon" 
        className="absolute top-6 left-6 z-10"
        asChild
      >
        <Link to="/">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </Button>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <PixelCard variant="glow" className="text-center">
          <h1 className="font-pixel text-2xl md:text-3xl mb-6 text-gradient-primary">
            Connect Your Wallet
          </h1>
          
          <p className="font-cyber text-muted-foreground mb-8">
            Choose your preferred wallet to enter the Pixel Realm
          </p>

          {isConnecting ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="pixel-loading w-8 h-8"></div>
              <p className="font-pixel text-sm text-primary">Connecting...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Button 
                variant="pixel" 
                size="lg" 
                className="w-full"
                onClick={() => handleWalletConnect("metamask")}
              >
                <Wallet className="w-5 h-5 mr-3" />
                MetaMask
              </Button>
              
              <Button 
                variant="pixel-secondary" 
                size="lg" 
                className="w-full"
                onClick={() => handleWalletConnect("walletconnect")}
              >
                <Smartphone className="w-5 h-5 mr-3" />
                WalletConnect
              </Button>
              
              <Button 
                variant="pixel-accent" 
                size="lg" 
                className="w-full"
                onClick={() => handleWalletConnect("coinbase")}
              >
                <Wallet className="w-5 h-5 mr-3" />
                Coinbase Wallet
              </Button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t-2 border-border">
            <p className="font-cyber text-xs text-muted-foreground">
              By connecting, you agree to our Terms of Service
            </p>
          </div>
        </PixelCard>
      </div>
    </div>
  );
}