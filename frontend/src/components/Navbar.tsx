"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AdvancedConfigPanel from "./AdvancedConfigPanel";
import { TranslatorConfig } from "@/types/config";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [config, setConfig] = useState<TranslatorConfig>({
    lang: "ch",
    from_lan: "auto",
    to_lan: "en-us",
    text_det_limit_side_len: 960,
    use_doc_orientation_classify: true,
    use_doc_unwarping: false,
    use_textline_orientation: true,
  });

  const handleConfigChange = (
    key: keyof TranslatorConfig,
    value: string | boolean | number
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-lg">
        <Link href="/" className="text-xl font-bold">All-in-One Translator</Link>
        <div className="flex items-center gap-6">
          <Link href="/history">History</Link>
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 transition"
          >
            Settings
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>

            {/* Language settings */}
            <div className="flex flex-col gap-3 mb-4">
              <div>
                <label className="block text-sm mb-1">Source Language</label>
                <input
                  type="text"
                  value={config.lang}
                  onChange={(e) => handleConfigChange("lang", e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                />
              </div>
             
            </div>

            {/* Advanced config panel */}
            <AdvancedConfigPanel
              config={{
                text_det_limit_side_len: config.text_det_limit_side_len,
                use_doc_orientation_classify: config.use_doc_orientation_classify,
                use_doc_unwarping: config.use_doc_unwarping,
                use_textline_orientation: config.use_textline_orientation,
              }}
              onConfigChange={(key, value) => handleConfigChange(key, value)}
            />

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 px-2 py-1 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
