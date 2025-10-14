"use client";

import { ServiceKey } from "@/Constants/languages";

interface ApiKeyInputsProps {
  service: ServiceKey;
  apiKeys: Record<ServiceKey, string>;
  onApiKeyChange: (service: ServiceKey, value: string) => void;
}

// Dynamic API input based on selected service
export default function ApiKeyInputs({ service, apiKeys, onApiKeyChange }: ApiKeyInputsProps) {
  // If mode is scraper or service doesn't require key, return null
  const servicesWithKeys: ServiceKey[] = [
    "deepl",
    "google",
    "bing",
    "baidu",
    "youdao",
    "xiaoniu",
    "caiyun",
    "tencent",
  ];

  if (!servicesWithKeys.includes(service)) return null;

  return (
    <div className="mb-4">
      <label className="block text-sm mb-1">{service.toUpperCase()} API Key / Token</label>
      <input
        type="text"
        value={apiKeys[service]}
        onChange={(e) => onApiKeyChange(service, e.target.value)}
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
        placeholder={`Enter your ${service} API key`}
      />
    </div>
  );
}

// Optional: separate exports for each service if you want dedicated components
export function DeeplApiKey({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1">DeepL API Key</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
        placeholder="Enter DeepL API Key"
      />
    </div>
  );
}

export function GoogleApiKey({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1">Google API Key</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
        placeholder="Enter Google API Key"
      />
    </div>
  );
}

// Similarly, you can add more dedicated exports for other services if needed
