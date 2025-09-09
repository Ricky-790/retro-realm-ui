import { Button } from "@/components/ui/button";
import { PixelCard } from "@/components/PixelCard";
import { Link } from "react-router-dom";
import { ArrowLeft, Cat, Dog } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { uploadImageToIPFS } from "@/lib/ipfs";
import petDog from "@/assets/pet-dog.png";
import petCat from "@/assets/pet-cat.png";
import collarImg from "@/assets/accessories/collar.png";
import hatImg from "@/assets/accessories/hat.png";
import bowImg from "@/assets/accessories/bow.png";

const petTypes = [
  { id: "dog", name: "Dog", icon: Dog, image: petDog },
  { id: "cat", name: "Cat", icon: Cat, image: petCat },
];

const customizationOptions = {
  ears: ["Pointy", "Floppy", "Round", "Long"],
  eyes: ["Blue", "Green", "Brown", "Purple"],
  tail: ["Short", "Long", "Curly", "Fluffy"],
  accessories: ["None", "Collar", "Hat", "Bow"],
};

const colors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
  "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"
];

export default function CreateCharacter() {
  const [selectedPet, setSelectedPet] = useState("dog");
  const [selectedOptions, setSelectedOptions] = useState({
    ears: "Pointy",
    eyes: "Blue", 
    tail: "Short",
    accessories: "None"
  });
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isUploading, setIsUploading] = useState(false);
  const petPreviewRef = useRef<HTMLDivElement>(null);

  const currentPetImage = petTypes.find(pet => pet.id === selectedPet)?.image || petDog;

  const accessoryImages = {
    "Collar": collarImg,
    "Hat": hatImg,
    "Bow": bowImg,
    "None": null
  };

  const handleCreatePet = async () => {
    if (!petPreviewRef.current) return;

    setIsUploading(true);
    try {
      const canvas = await html2canvas(petPreviewRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true
      });
      
      const ipfsUrl = await uploadImageToIPFS(canvas);
      toast.success(`Pet created and uploaded to IPFS!`);
      console.log("IPFS URL:", ipfsUrl);
    } catch (error) {
      console.error("Failed to create pet:", error);
      toast.error("Failed to create pet. Please check your Pinata API keys.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <Button variant="pixel-outline" size="icon" asChild>
          <Link to="/home">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        
        <h1 className="font-pixel text-2xl md:text-3xl text-gradient-primary text-center">
          Design Your Dream Pet
        </h1>
        
        <div className="w-12"></div> {/* Spacer */}
      </header>

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Pet Type Selector */}
          <div className="lg:col-span-3">
            <PixelCard className="h-fit">
              <h3 className="font-pixel text-lg mb-4 text-center text-gradient-secondary">
                Pet Type
              </h3>
              
              <div className="space-y-3">
                {petTypes.map((pet) => (
                  <Button
                    key={pet.id}
                    variant={selectedPet === pet.id ? "pixel" : "pixel-outline"}
                    size="lg"
                    className="w-full justify-start"
                    onClick={() => setSelectedPet(pet.id)}
                  >
                    <pet.icon className="w-5 h-5 mr-3" />
                    {pet.name}
                  </Button>
                ))}
              </div>
            </PixelCard>
          </div>

          {/* Pet Preview */}
          <div className="lg:col-span-6">
            <PixelCard variant="glow" className="text-center">
              <h3 className="font-pixel text-xl mb-6 text-gradient-accent">
                Preview
              </h3>
              
              <div 
                ref={petPreviewRef}
                className="relative bg-muted/30 border-4 border-border p-8 mb-6 min-h-[400px] flex items-center justify-center"
              >
                <div className="relative">
                  <img 
                    src={currentPetImage} 
                    alt="Pet preview" 
                    className="w-64 h-64 object-contain pixel-perfect"
                    style={{ 
                      imageRendering: 'pixelated',
                      filter: `hue-rotate(${colors.indexOf(selectedColor) * 45}deg)`
                    }}
                  />
                  
                  {/* Accessory Overlay */}
                  {selectedOptions.accessories !== "None" && accessoryImages[selectedOptions.accessories as keyof typeof accessoryImages] && (
                    <img 
                      src={accessoryImages[selectedOptions.accessories as keyof typeof accessoryImages]!}
                      alt={selectedOptions.accessories}
                      className="absolute top-0 left-0 w-64 h-64 object-contain pixel-perfect pointer-events-none"
                      style={{ 
                        imageRendering: 'pixelated',
                        filter: selectedOptions.accessories === "Collar" 
                          ? `hue-rotate(${colors.indexOf(selectedColor) * 45}deg)` 
                          : 'none'
                      }}
                    />
                  )}
                </div>
                
                {/* Decorative UI Elements */}
                <div className="absolute top-4 left-4 w-4 h-4 bg-primary border-2 border-primary-glow"></div>
                <div className="absolute top-4 right-4 w-4 h-4 bg-secondary border-2 border-secondary-glow"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-accent border-2 border-accent-glow"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 bg-warning border-2 border-warning"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-left">
                  <p className="font-pixel text-xs text-muted-foreground mb-1">Name</p>
                  <p className="font-cyber text-sm">Pixel Buddy</p>
                </div>
                <div className="text-left">
                  <p className="font-pixel text-xs text-muted-foreground mb-1">Type</p>
                  <p className="font-cyber text-sm capitalize">{selectedPet}</p>
                </div>
              </div>

              <Button 
                variant="cta" 
                size="xl" 
                className="w-full" 
                onClick={handleCreatePet}
                disabled={isUploading}
              >
                {isUploading ? "Creating Pet..." : "Create Pet"}
              </Button>
            </PixelCard>
          </div>

          {/* Customization Options */}
          <div className="lg:col-span-3">
            <PixelCard className="h-fit">
              <h3 className="font-pixel text-lg mb-4 text-center text-gradient-accent">
                Customize
              </h3>
              
              <div className="space-y-6">
                {Object.entries(customizationOptions).map(([category, options]) => (
                  <div key={category}>
                    <p className="font-pixel text-sm text-muted-foreground mb-2 capitalize">
                      {category}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {options.map((option) => (
                        <Button
                          key={option}
                          variant={selectedOptions[category as keyof typeof selectedOptions] === option ? "pixel-accent" : "pixel-outline"}
                          size="sm"
                          className="text-xs"
                          onClick={() => setSelectedOptions(prev => ({
                            ...prev,
                            [category]: option
                          }))}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Color Picker */}
                <div>
                  <p className="font-pixel text-sm text-muted-foreground mb-2">
                    Color
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 border-3 transition-all hover:scale-110 ${
                          selectedColor === color 
                            ? "border-primary glow-primary" 
                            : "border-border"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </PixelCard>
          </div>
        </div>
      </div>
    </div>
  );
}