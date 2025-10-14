"use client";

import { UploadCloud, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface FileUploadAreaProps {
  selectedFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  isTranslating: boolean;
  onTranslationComplete: () => void;
}

export default function FileUploadArea({
  selectedFile,
  onFileChange,
  onRemoveFile,
  isTranslating,
  onTranslationComplete,
}: FileUploadAreaProps) {
  const [progress, setProgress] = useState(0);
  const [translatedFileUrl, setTranslatedFileUrl] = useState<string | null>(null);
  const translationCompleted = useRef(false);

  // Reset when new file is selected
  useEffect(() => {
    setProgress(0);
    setTranslatedFileUrl(null);
    translationCompleted.current = false;
  }, [selectedFile]);

  // Simulate translation progress
  useEffect(() => {
    if (!isTranslating || !selectedFile) return;

    setProgress(0);
    setTranslatedFileUrl(null);
    translationCompleted.current = false;
const interval = setInterval(() => {
  setProgress((prev) => {
    const next = Math.min(prev + 5, 100); // ensures max is 100
    if (next === 100 && !translationCompleted.current) {
      translationCompleted.current = true;
      const url = URL.createObjectURL(selectedFile);
      setTranslatedFileUrl(url);
      onTranslationComplete();
      clearInterval(interval);
    }
    return next;
  });
}, 200);


    return () => clearInterval(interval);
  }, [isTranslating, selectedFile, onTranslationComplete]);

  if (!selectedFile) {
    return (
      <div className="border-dashed border-2 border-gray-600 p-8 text-center rounded-lg hover:border-blue-500 transition cursor-pointer bg-gray-900/50">
        <input
          type="file"
          className="hidden"
          id="fileUpload"
          onChange={onFileChange}
          accept="image/png, image/jpeg, image/webp"
        />
        <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-2">
          <UploadCloud size={32} className="text-gray-400" />
          <span className="text-blue-400 font-medium hover:text-blue-300">
            Browse Files or Drag & Drop
          </span>
          <span className="text-xs text-gray-500">PNG, JPG, WEBP supported</span>
        </label>
      </div>
    );
  }

  return (
    <div className="border border-gray-700 bg-gray-900/50 p-4 text-center rounded-lg flex flex-col gap-2 animate-fade-in">
      <div className="flex justify-between items-center">
        <p className="text-gray-300 text-sm">
          {isTranslating ? `Translating: ${progress}%` : `Ready to translate:`}
          <span className="font-bold text-white"> {selectedFile.name}</span>
        </p>
        {!isTranslating && (
          <button
            onClick={onRemoveFile}
            className="p-1 rounded-full text-gray-400 hover:bg-red-500/20 hover:text-white transition"
            title="Remove file"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {isTranslating && (
        <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden mt-2">
          <div
            className="h-2 bg-blue-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {translatedFileUrl && !isTranslating && (
        <a
          href={translatedFileUrl}
          download={`translated-${selectedFile.name}`}
          className="mt-2 inline-block px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
        >
          Download Translated File
        </a>
      )}
    </div>
  );
}
