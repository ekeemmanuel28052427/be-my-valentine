import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicControlProps {
  isMuted: boolean;
  onToggle: () => void;
}

export const MusicControl: React.FC<MusicControlProps> = ({ isMuted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg text-rose-900/70 hover:bg-white/50 hover:scale-110 transition-all duration-300 group overflow-hidden"
      aria-label={isMuted ? "Unmute music" : "Mute music"}
    >
      <div className="absolute inset-0 bg-rose-200/20 group-hover:bg-rose-200/40 transition-colors"></div>
      {isMuted ? (
        <VolumeX className="w-5 h-5 relative z-10" />
      ) : (
        <div className="relative z-10">
          <Volume2 className="w-5 h-5" />
          {/* Subtle pulse animation for the active state */}
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-400 rounded-full animate-ping opacity-75"></span>
        </div>
      )}
    </button>
  );
};