"use client";

import { AdvancedConfig } from "@/types/config";

interface AdvancedConfigPanelProps {
  config: AdvancedConfig;
  onConfigChange: (key: keyof AdvancedConfig, value: boolean | number) => void;
}

export default function AdvancedConfigPanel({ config, onConfigChange }: AdvancedConfigPanelProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-900/50">
      <h2 className="font-bold mb-3 text-blue-400">Advanced Config</h2>
      <div className="flex flex-col gap-2">                
        <hr className="border-gray-700 my-2" />
        
        <label className="flex items-center justify-between gap-2 cursor-pointer text-sm">
          <span>use doc orientation classify</span>
          <input 
            type="checkbox" 
            checked={config.use_doc_orientation_classify} 
            onChange={(e) => onConfigChange('use_doc_orientation_classify', e.target.checked)} 
            className="accent-blue-500 w-4 h-4" 
          />
        </label>
        
        <label className="flex items-center justify-between gap-2 cursor-pointer text-sm">
          <span>use doc unwarping</span>
          <input 
            type="checkbox" 
            checked={config.use_doc_unwarping} 
            onChange={(e) => onConfigChange('use_doc_unwarping', e.target.checked)} 
            className="accent-blue-500 w-4 h-4" 
          />
        </label>
        
        <label className="flex items-center justify-between gap-2 cursor-pointer text-sm">
          <span>use textline orientation</span>
          <input 
            type="checkbox" 
            checked={config.use_textline_orientation} 
            onChange={(e) => onConfigChange('use_textline_orientation', e.target.checked)} 
            className="accent-blue-500 w-4 h-4" 
          />
        </label>
        
        <div className="text-sm pt-2">
          <label htmlFor="res-limit" className="flex justify-between mb-1">
            <span>Image Resolution Limit</span>
            <span className="font-mono text-blue-300">{config.text_det_limit_side_len}px</span>
          </label>
          <input 
            id="res-limit" 
            type="range" 
            min="512" 
            max="2048" 
            step="16" 
            value={config.text_det_limit_side_len} 
            onChange={(e) => onConfigChange('text_det_limit_side_len', parseInt(e.target.value))} 
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500" 
          />
        </div>
      </div>
    </div>
  );
}
