"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import html2canvas from "html2canvas";

export default function TwitterQuoteGenerator() {
  const [name, setName] = useState("Andrew");
  const [username, setUsername] = useState("andrewImXXXI");
  const [tweetText, setTweetText] = useState(
    "yung back hug na pinapangarap ko,\nback pain na ngayon",
  );
  const [profileImage, setProfileImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const profileInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerProfileUpload = () => {
    profileInputRef.current?.click();
  };

  const triggerBackgroundUpload = () => {
    backgroundInputRef.current?.click();
  };

 const downloadImage = async () => {
  if (!previewRef.current) return;

  try {
    const canvas = await html2canvas(previewRef.current, {
      width: 1500,
      height: 1500,
      useCORS: true,
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.download = "twitter-quote.png";
    link.href = canvas.toDataURL("image/png", 1.0); // Ensure full quality
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
                onChange={handleProfileUpload}
                className="hidden"
                accept="image/*"
              />
              <Button
                onClick={triggerProfileUpload}
                className="w-full bg-[#15202b] hover:bg-[#1e2732] text-white border-[1px] border-[#333] h-10"
                variant="outline"
              >
                <span className="mr-2">📷</span> Upload Profile
              </Button>
            </div>
            <div>
              <label className="block mb-2 text-sm">Background Image</label>
              <input
                type="file"
                ref={backgroundInputRef}
                onChange={handleBackgroundUpload}
                className="hidden"
                accept="image/*"
              />
              <Button
                onClick={triggerBackgroundUpload}
                className="w-full bg-[#15202b] hover:bg-[#1e2732] text-white border-[1px] border-[#333] h-10"
                variant="outline"
              >
                <span className="mr-2">🖼️</span> Upload Background
              </Button>
            </div>
          </div>

          <div
            ref={previewRef}
            className="w-full aspect-square bg-[#15202b] overflow-hidden mb-4 relative"
          >
            {backgroundImage && (
              <div
                className="w-full h-full bg-cover bg-center absolute top-0 left-0 bg-div"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                }}
              >
                {/* Preload image for better quality */}
                {backgroundImage && (
                  <img src={backgroundImage} className="hidden" alt="" />
                )}
              </div>
            )}
            <div className="px-10 py-8 relative z-10 flex flex-col justify-center h-full">
              <div className="flex items-start mb-[4] mb-[4] mx-6">
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

          <Button
            onClick={downloadImage}
            className="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white w-full flex items-center justify-center gap-2 h-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Image
          </Button>
        </div>
      </div>
    </div>
  );
}
