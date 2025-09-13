import { Button } from "@/components/ui/button";
import { PixelCard } from "@/components/PixelCard";
import { Link } from "react-router-dom";
import { ArrowLeft, Cat, Dog } from "lucide-react";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { uploadImageToIPFS, uploadToIPFS } from "@/lib/ipfs";
import petDog from "@/assets/pet-dog.png";
import petCat from "@/assets/pet-cat.png";
import dragonFront from "@/assets/Dragon-front.jpg";
import pandaFront from "@/assets/panda-front.jpg.jpg";
import collarImg from "@/assets/accessories/collar.png";
import hatImg from "@/assets/accessories/hat.png";
import bowImg from "@/assets/accessories/bow.png";

const petTypes = [
  { id: "dog", name: "Dog", icon: Dog, image: petDog },
  { id: "cat", name: "Cat", icon: Cat, image: petCat },
  { id: "dragon", name: "Dragon", icon: null, image: dragonFront },
  { id: "panda", name: "Panda", icon: null, image: pandaFront },
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
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const petPreviewRef = useRef<HTMLDivElement>(null);

  const currentPetImage = petTypes.find(pet => pet.id === selectedPet)?.image || petDog;

  const accessoryImages = {
    "Collar": collarImg,
    "Hat": hatImg,
    "Bow": bowImg,
    "None": null
  };

  // Custom styles for accessory overlays
  const accessoryStyles: Record<string, React.CSSProperties> = {
    Collar: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '120px',
      height: '40px',
      transform: 'translate(-50%, -50%)',
    },
    Hat: {
      position: 'absolute',
      top: '15%',
      left: '50%',
      width: '90px',
      height: '50px',
      transform: 'translate(-50%, 0)',
      rotate: '10deg'
    },
    Bow: {
      position: 'absolute',
      top: '25%',
      left: '65%',
      width: '60px',
      height: '40px',
      transform: 'translate(-50%, -50%)',
    },
    None: {},
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

      // Build file name: petType-accessory.png
      const petType = selectedPet;
      const accessory = selectedOptions.accessories;
      const fileName = `${petType}-${accessory}.png`;

      // Convert canvas to blob and create File with custom name
      const blob = await new Promise<Blob | null>(resolve => {
        canvas.toBlob(resolve, "image/png");
      });
      if (!blob) throw new Error("Failed to create image blob");
      const file = new File([blob], fileName, { type: "image/png" });

      // Upload to IPFS
  const url = await uploadToIPFS(file);
      setIpfsUrl(url);
      setShowDialog(true);
      toast.success(`Pet created and uploaded to IPFS!`);
      console.log("IPFS URL:", url);
    } catch (error) {
      console.error("Failed to create pet:", error);
      toast.error("Failed to create pet. Please check your Pinata API keys.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Modal Dialog for IPFS URL */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pet Image Uploaded!</DialogTitle>
            <DialogDescription>
              Your pet image has been uploaded to IPFS. You can copy the link below and keep it safe.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <input
              type="text"
              value={ipfsUrl ?? ""}
              readOnly
              className="w-full px-2 py-1 border rounded bg-gray-100 text-sm"
              onFocus={e => e.target.select()}
            />
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded font-bold hover:from-blue-600 hover:to-purple-600"
              onClick={() => {
                if (ipfsUrl) {
                  navigator.clipboard.writeText(ipfsUrl);
                  toast.success("Copied to clipboard!");
                }
              }}
            >
              Copy Link
            </button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="mt-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* ...existing code... */}
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
                    {pet.icon ? <pet.icon className="w-5 h-5 mr-3" /> : null}
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
                      className="pixel-perfect pointer-events-none"
                      style={{
                        ...accessoryStyles[selectedOptions.accessories],
                        imageRendering: 'inherit',
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
      {/* ...existing code... */}
    </>
  );
}