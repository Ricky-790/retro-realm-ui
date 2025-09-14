
// Replace with your actual Pinata API keys
const PINATA_API_KEY = "";
const PINATA_SECRET_KEY = "";

export const uploadToIPFS = async (file: File): Promise<string> => {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Pinata upload failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    // The IPFS hash is in data.IpfsHash
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw new Error("Failed to upload to IPFS");
  }
};

export const uploadImageToIPFS = async (canvas: HTMLCanvasElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error("Failed to create blob from canvas"));
        return;
      }
      try {
        const file = new File([blob], "pet-image.png", { type: "image/png" });
        const ipfsUrl = await uploadToIPFS(file);
        resolve(ipfsUrl);
      } catch (error) {
        reject(error);
      }
    }, "image/png");
  });
};
