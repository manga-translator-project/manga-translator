// components/TranslationControls.tsx
"use client";

import { ArrowRightLeft } from "lucide-react";
import { FROM_LANGUAGES,TO_LANGUAGES,ServiceKey} from "@/Constants/languages";

import {SERVICES} from "@/Constants/services";


interface TranslationControlsProps {
  mode: string;
  setMode: (mode: string) => void;
  service: ServiceKey;
  setService: (service: ServiceKey) => void;
  fromLang: string;
  setFromLang: (lang: string) => void;
  toLang: string;
  setToLang: (lang: string) => void;
}

export default function TranslationControls({
  mode,
  setMode,
  service,
  setService,
  fromLang,
  setFromLang,
  toLang,
  setToLang,
}: TranslationControlsProps) {
  const swapLanguages = () => {
    if (fromLang === "auto" || toLang === "auto") return;
    setFromLang(toLang);
    setToLang(fromLang);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Mode toggle */}
      <div className="flex items-center bg-gray-900 rounded-lg p-1">
        <button
          onClick={() => setMode("api")}
          className={`px-3 py-1 rounded-md text-sm transition ${
            mode === "api"
              ? "bg-blue-600 text-white font-semibold"
              : "hover:bg-gray-700"
          }`}
        >
          API
        </button>
        <button
          onClick={() => setMode("scraper")}
          className={`px-3 py-1 rounded-md text-sm transition ${
            mode === "scraper"
              ? "bg-blue-600 text-white font-semibold"
              : "hover:bg-gray-700"
          }`}
        >
          Scraper
        </button>
      </div>



      {/* Service select */}
      <select
        value={service}
        onChange={(e) => setService(e.target.value as ServiceKey)}
        className="border rounded-lg px-3 py-2 bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {Object.entries(SERVICES).map(([key, name]) => (
          <option key={key} value={key}>
            {String(name)}
          </option>
        ))}
      </select>

      {/* From language */}
      <select
        value={fromLang}
        onChange={(e) => setFromLang(e.target.value)}
        className="border rounded-lg px-3 py-2 bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {Object.entries(FROM_LANGUAGES[service] || {}).map(([key, name]) => (
          <option key={key} value={key}>
            {String(name)}
          </option>
        ))}
      </select>

      {/* Swap button */}
      <button
        onClick={swapLanguages}
        disabled={fromLang === "auto"}
        className="p-2 rounded-full hover:bg-gray-700 transition disabled:opacity-50"
        title="Swap languages"
      >
        <ArrowRightLeft size={18} />
      </button>

      {/* To language */}
      <select
        value={toLang}
        onChange={(e) => setToLang(e.target.value)}
        className="border rounded-lg px-3 py-2 bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {Object.entries(TO_LANGUAGES[service] || {})
          .filter(([key]) => key !== "auto")
          .map(([key, name]) => (
            <option key={key} value={key}>
              {String(name)}
            </option>
          ))}
      </select>
    </div>
  );
}
