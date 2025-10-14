"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Wand2, Scan } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">All-in-One Translator</h1>
        <p className="text-lg text-gray-300 max-w-xl mb-8">
          Upload files for translation,manga panels and get translations instantly.
        </p>
        
        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          
           <Link 
            href="/translate"
            className="flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
          >
            <Wand2 size={20} />
            Simple Translation
          </Link>
          
          
          
          <Link 
            href="/manga-translate"
            className="flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
          >
            <Wand2 size={20} />
            Full Manga Translation
          </Link>
          <Link 
            href="/realTime"
            className="flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
          >
            <Scan size={20} />
            Real-Time Scan
          </Link>
        </div>
      </div>
    </div>
  );
}