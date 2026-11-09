import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Database, 
  Cpu, 
  Layers, 
  Server, 
  Globe, 
  ShieldCheck, 
  Key, 
  Workflow, 
  Cloud, 
  Wrench,
  CheckCircle2,
  FileCode2
} from 'lucide-react';

interface TechSkillIconProps {
  name: string;
  imageUrl?: string;
  color?: string;
  className?: string;
}

export const TechSkillIcon: React.FC<TechSkillIconProps> = ({
  name,
  imageUrl,
  color = '#38bdf8',
  className = 'w-9 h-9',
}) => {
  const [imageError, setImageError] = useState(false);

  // Return fallback vector if image failed or not provided
  const renderFallbackIcon = () => {
    const lower = name.toLowerCase();
    const iconClass = "w-5 h-5";

    if (lower.includes('java') || lower.includes('script') || lower.includes('typescript') || lower.includes('php')) {
      return <Code2 className={iconClass} style={{ color }} />;
    }
    if (lower.includes('react') || lower.includes('tailwind') || lower.includes('redux') || lower.includes('html') || lower.includes('css') || lower.includes('bootstrap') || lower.includes('vite')) {
      return <Layers className={iconClass} style={{ color }} />;
    }
    if (lower.includes('node') || lower.includes('express') || lower.includes('api') || lower.includes('server')) {
      return <Server className={iconClass} style={{ color }} />;
    }
    if (lower.includes('mongo') || lower.includes('sql') || lower.includes('redis') || lower.includes('database') || lower.includes('postgres')) {
      return <Database className={iconClass} style={{ color }} />;
    }
    if (lower.includes('lang') || lower.includes('rag') || lower.includes('ai')) {
      return <Cpu className={iconClass} style={{ color }} />;
    }
    if (lower.includes('docker') || lower.includes('cloud') || lower.includes('aws') || lower.includes('nginx') || lower.includes('render') || lower.includes('ci')) {
      return <Cloud className={iconClass} style={{ color }} />;
    }
    if (lower.includes('jwt') || lower.includes('auth') || lower.includes('session')) {
      return <ShieldCheck className={iconClass} style={{ color }} />;
    }
    if (lower.includes('git') || lower.includes('postman') || lower.includes('tool') || lower.includes('testing')) {
      return <Wrench className={iconClass} style={{ color }} />;
    }
    return <Terminal className={iconClass} style={{ color }} />;
  };

  return (
    <div
      className={`relative rounded-xl p-2 flex items-center justify-center transition-all bg-[#0a0e19] border border-white/10 group-hover:border-white/20 shadow-sm ${className}`}
      style={{
        boxShadow: `0 4px 15px -4px ${color}20`,
      }}
    >
      {/* Subtle brand glow behind icon */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur-sm pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={`${name} icon`}
          loading="lazy"
          onError={() => setImageError(true)}
          className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {renderFallbackIcon()}
        </div>
      )}
    </div>
  );
};
