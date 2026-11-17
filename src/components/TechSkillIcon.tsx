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
  Workflow,
  Cloud,
  Wrench,
} from 'lucide-react';

interface TechSkillIconProps {
  name: string;
  imageUrl?: string;
  color?: string;
  className?: string;
}

/**
 * Renders the official logo when we have one, otherwise a neutral glyph.
 * Deliberately avoids hardcoding a dark tile — the container adapts to
 * whichever theme is active.
 */
export const TechSkillIcon: React.FC<TechSkillIconProps> = ({
  name,
  imageUrl,
  color,
  className = 'h-9 w-9',
}) => {
  const [imageError, setImageError] = useState(false);

  const renderFallbackIcon = () => {
    const lower = name.toLowerCase();
    const cls = 'h-5 w-5';
    const style = color ? { color } : undefined;

    if (lower.includes('java') || lower.includes('script') || lower.includes('typescript') || lower.includes('php')) {
      return <Code2 className={cls} style={style} strokeWidth={1.5} />;
    }
    if (lower.includes('react') || lower.includes('tailwind') || lower.includes('redux') || lower.includes('html') || lower.includes('css') || lower.includes('bootstrap') || lower.includes('vite')) {
      return <Layers className={cls} style={style} strokeWidth={1.5} />;
    }
    if (lower.includes('node') || lower.includes('express') || lower.includes('api') || lower.includes('server')) {
      return <Server className={cls} style={style} strokeWidth={1.5} />;
    }
    if (lower.includes('mongo') || lower.includes('sql') || lower.includes('redis') || lower.includes('database') || lower.includes('postgres')) {
      return <Database className={cls} style={style} strokeWidth={1.5} />;
    }
    if (lower.includes('lang') || lower.includes('rag') || lower.includes('ai')) {
      return <Cpu className={cls} style={style} strokeWidth={1.5} />;
    }
    if (lower.includes('docker') || lower.includes('cloud') || lower.includes('aws') || lower.includes('nginx') || lower.includes('render') || lower.includes('ci')) {
      return <Cloud className={cls} style={style} strokeWidth={1.5} />;
    }
    if (lower.includes('jwt') || lower.includes('auth') || lower.includes('session')) {
      return <ShieldCheck className={cls} style={style} strokeWidth={1.5} />;
    }
    if (lower.includes('git') || lower.includes('postman') || lower.includes('tool') || lower.includes('testing')) {
      return <Wrench className={cls} style={style} strokeWidth={1.5} />;
    }
    if (lower.includes('web') || lower.includes('frontend') || lower.includes('ui')) {
      return <Globe className={cls} style={style} strokeWidth={1.5} />;
    }
    if (lower.includes('workflow') || lower.includes('pipeline') || lower.includes('orchestration')) {
      return <Workflow className={cls} style={style} strokeWidth={1.5} />;
    }
    return <Terminal className={cls} style={style} strokeWidth={1.5} />;
  };

  if (imageUrl && !imageError) {
    return (
      <div className={`grid shrink-0 place-items-center ${className}`}>
        <img
          src={imageUrl}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setImageError(true)}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`grid shrink-0 place-items-center text-muted ${className}`}>
      {renderFallbackIcon()}
    </div>
  );
};
