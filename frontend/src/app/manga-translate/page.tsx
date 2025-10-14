"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import TranslationControls from "@/components/TranslationControls";
import FileUploadArea from "@/components/FileUploadArea";
import ActionButtons from "@/components/ActionsButtons";
import { ServiceKey } from "@/Constants/languages";
import ApiKeyInputs from "@/ApiRequirements/Api";

export default function MangaTranslatePage() {
  // State management
  const [mode, setMode] = useState("api");
  const [service, setService] = useState<ServiceKey>("deepl");
  const [fromLang, setFromLang] = useState("auto");
  const [toLang, setToLang] = useState("en");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  // API Key states (one for each service, extendable)
  const [apiKeys, setApiKeys] = useState<Record<ServiceKey, string>>({
    deepl: "",
    google: "",
    bing: "",
    baidu: "",
    youdao: "",
    xiaoniu: "",
    caiyun: "",
    tencent: "",
  });

  const handleApiKeyChange = (serviceKey: ServiceKey, value: string) => {
    setApiKeys(prev => ({ ...prev, [serviceKey]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

const handleTranslationComplete = () => {
  setIsTranslating(false);
};






  const handleTranslate = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    if (mode === "api" && !apiKeys[service]) {
      alert(`Please provide API key/token for ${service}`);
      return;
    }

    setIsTranslating(true);

    // Prepare payload with all settings
    const settingsPayload = {
      mode,
      service,
      lang: fromLang === "auto" ? "ch" : fromLang,
      from_lan: fromLang,
      to_lan: toLang,
      apiKey: apiKeys[service],
      file: selectedFile.name,
    };

    console.log("Starting translation with settings:", settingsPayload);

  
    
  };

  return (
    <div className="bg-gray-900">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20">
        <div className="bg-gray-800 shadow-2xl rounded-2xl p-6 w-full max-w-4xl text-gray-100 border border-gray-700">
          {/* Translation Controls */}
          <TranslationControls
            mode={mode}
            setMode={setMode}
            service={service}
            setService={setService}
            fromLang={fromLang}
            setFromLang={setFromLang}
            toLang={toLang}
            setToLang={setToLang}
          />

          {/* API Inputs */}
          {mode === "api" && (
            <ApiKeyInputs
              service={service}
              apiKeys={apiKeys}
              onApiKeyChange={handleApiKeyChange}
            />
          )}

        

          {/* File Upload Area */}
          <FileUploadArea
            selectedFile={selectedFile}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
            isTranslating={isTranslating}
            onTranslationComplete={handleTranslationComplete}

          />


  {/* Action Buttons */}
          <ActionButtons
            isTranslating={isTranslating}
            hasSelectedFile={!!selectedFile}
            onTranslate={handleTranslate}
          />



        </div>
      </div>
    </div>
  );
}
