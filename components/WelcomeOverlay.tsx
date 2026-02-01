import React from 'react';
import { VolumeX } from 'lucide-react';
import { Button } from './Button';
import { WelcomeProps } from '../types';

export const WelcomeOverlay: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Light Overlay with Blur */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl z-0"></div>
      
      {/* Unobtrusive Unmute Button */}
      <div className="absolute top-6 right-6 z-50 animate-bounce delay-700">
        <button 
          onClick={onStart}
          className="bg-white/60 backdrop-blur-md p-3 rounded-full hover:bg-white/80 transition-all border border-rose-200 shadow-sm group"
          aria-label="Unmute and start"
        >
          <VolumeX className="w-5 h-5 text-rose-400 group-hover:text-rose-600 transition-colors" />
        </button>
      </div>

      <div className="relative z-10 p-12 max-w-lg w-full mx-4 text-center fade-in border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(255,228,230,0.5)] bg-white/30">
        
        <div className="mb-8 flex justify-center">
          {/* Blooming Flower GIF */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-[0_10px_30px_rgba(244,63,94,0.1)] relative">
             <div className="absolute inset-0 bg-rose-200 blur-xl opacity-20 animate-pulse"></div>
             <img 
               src="https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif" 
               alt="Blooming Love"
               className="w-full h-full object-cover opacity-90 scale-110"
             />
          </div>
        </div>
        
        <h1 className="font-luxury text-sm text-rose-400 tracking-[0.4em] uppercase mb-4">A Private Note</h1>
        <h2 className="font-heading text-5xl md:text-6xl mb-6 text-rose-950 italic">For Your Eyes</h2>
        
        <p className="mb-10 text-lg font-light text-rose-900/70 leading-relaxed font-sans">
          A whisper of romance,<br/>
          curated purely for you.
        </p>

        <div className="flex justify-center">
          <Button onClick={onStart} variant="primary" className="min-w-[200px]">
            <span className="tracking-widest text-xs uppercase">Open Card</span>
          </Button>
        </div>

      </div>
    </div>
  );
};