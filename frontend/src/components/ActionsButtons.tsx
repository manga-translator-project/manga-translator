// components/ActionButtons.tsx
"use client";

import { Loader2 } from "lucide-react";

interface ActionButtonsProps {
  isTranslating: boolean;
  hasSelectedFile: boolean;
  onTranslate: () => void;
}

export default function ActionButtons({ isTranslating, hasSelectedFile, onTranslate }: ActionButtonsProps) {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <button 
        onClick={onTranslate} 
        disabled={isTranslating || !hasSelectedFile} 
        className="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed text-base"
      >
        {isTranslating ? (
          <>
            <Loader2 className="animate-spin mr-2" /> 
            Translating...
          </>
        ) : "Translate"}
      </button>
      
    </div>
  );
}