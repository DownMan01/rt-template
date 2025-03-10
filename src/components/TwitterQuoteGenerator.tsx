"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import html2canvas from "html2canvas";

export default function TwitterQuoteGenerator() {
  const [name, setName] = useState("Andrew");
  const [username, setUsername] = useState("andrewImXXXI");
  const [tweetText, setTweetText] = useState(
    "yung back hug na pinapangarap ko,\nback pain na ngayon"
  );
  const [profileImage, setProfileImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const profileInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;

    try {
      const originalCanvas = await html2canvas(previewRef.current, {
        scale: 2, // Improves quality
        useCORS: true,
        backgroundColor: null, // Keeps transparency if needed
      });

      // Create a fixed-size canvas to ensure exact 1500x1500 resolution
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = 1500;
      finalCanvas.height = 1500;
      const ctx = finalCanvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(originalCanvas, 0, 0, 1500, 1500);
      }

      const link = document.createElement("a");
      link.download = "twitter-quote.png";
      link.href = finalCanvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f1419] text-white p-6">
      <h1 className="text-2xl font-bold text-center mb-8">
        Twitter Quote Generator
      </h1>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#15202b] border-[1px] border-[#333] text-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Username</label>
              <div className="flex">
                <span className="flex items-center justify-center px-3 bg-[#15202b] text-gray-400 border-[1px] border-r-0 border-[#333] rounded-l-md">
                  @
                </span>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-[#15202b] border-[1px] border-[#333] text-white rounded-l-none"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm">Tweet Text</label>
            <Textarea
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              className="bg-[#15202b] border-[1px] border-[#333] text-white min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 text-sm">Profile Image</label>
              <input
                type="file"
                ref={profileInputRef}
                onChange={(e) => handleImageUpload(e, setProfileImage)}
                className="hidden"
                accept="image/*"
              />
              <Button
                onClick={() => profileInputRef.current?.click()}
                className="w-full bg-[#15202b] hover:bg-[#1e2732] text-white border-[1px] border-[#333] h-10"
                variant="outline"
              >
                📷 Upload Profile
              </Button>
            </div>
            <div>
              <label className="block mb-2 text-sm">Background Image</label>
              <input
                type="file"
                ref={backgroundInputRef}
                onChange={(e) => handleImageUpload(e, setBackgroundImage)}
                className="hidden"
                accept="image/*"
              />
              <Button
                onClick={() => backgroundInputRef.current?.click()}
                className="w-full bg-[#15202b] hover:bg-[#1e2732] text-white border-[1px] border-[#333] h-10"
                variant="outline"
              >
                🖼️ Upload Background
              </Button>
            </div>
          </div>

          {/* Twitter Quote Preview */}
          <div
            ref={previewRef}
            className="w-full aspect-square bg-[#15202b] overflow-hidden mb-4 relative"
            style={{ width: "1500px", height: "1500px" }}
          >
            {backgroundImage && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              />
            )}
            <div className="px-10 py-8 relative z-10 flex flex-col justify-center h-full">
              <div className="flex items-start mb-4 mx-6">
                <div
                  className="w-10 h-10 rounded-full mr-3 bg-white overflow-hidden flex-shrink-0"
                  style={{
                    backgroundImage: profileImage
                      ? `url(${profileImage})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!profileImage && (
                    <div className="w-full h-full flex items-center justify-center bg-white text-[#15202b] text-lg">
                      {name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-base">{name}</div>
                  <div className="text-gray-400 text-sm">@{username}</div>
                </div>
                <div className="ml-auto text-gray-400">•••</div>
              </div>
              <div className="whitespace-pre-line text-base text-left flex mx-6">
                {tweetText}
              </div>
            </div>
          </div>

          {/* Download Button */}
          <Button
            onClick={downloadImage}
            className="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white w-full flex items-center justify-center gap-2 h-10"
          >
            ⬇ Download Image
          </Button>
        </div>
      </div>
    </div>
  );
}
