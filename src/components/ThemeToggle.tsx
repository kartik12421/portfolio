import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme';

interface ThemeToggleProps {
  /** 'icon' renders a bare square button (navbar). 'label' adds the text
   *  version used in the mobile drawer and footer. */
  variant?: 'icon' | 'label';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'icon', className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  if (variant === 'label') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:text-ink ${className}`}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span>{isDark ? 'Light' : 'Dark'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`grid h-9 w-9 place-items-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-ink ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.75} />
      )}
    </button>
  );
};
