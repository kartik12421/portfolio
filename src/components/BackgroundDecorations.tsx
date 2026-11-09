import React from 'react';

export const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle radial gradients */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #38bdf8 0%, rgba(56, 189, 248, 0) 70%)',
        }}
      />
      <div 
        className="absolute top-[35%] -right-[15%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, rgba(99, 102, 241, 0) 70%)',
        }}
      />
      <div 
        className="absolute -bottom-[10%] left-[20%] w-[650px] h-[650px] rounded-full blur-[150px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #a855f7 0%, rgba(168, 85, 247, 0) 70%)',
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Soft vignette border */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/40 via-transparent to-[#07090e]" />
    </div>
  );
};
