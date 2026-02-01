import React, { useState, useRef } from 'react';
import { WelcomeOverlay } from './components/WelcomeOverlay';
import { ProposalCard } from './components/ProposalCard';
import { SuccessView } from './components/SuccessView';
import { MusicControl } from './components/MusicControl';

// ==================================================================================
// 🎵 MUSIC CONFIGURATION
// FIX APPLIED: Changed 'dl=0' to 'raw=1' for Dropbox links to stream directly.
// ==================================================================================
const MUSIC_URL = "https://www.dropbox.com/scl/fi/kshillsd1g67s1z8zrw2e/love-romantic-music-412707.mp3?rlkey=7s1vys9vb5x5y0lmqegn2sx07&st=bfjiovpm&raw=1"; 

// Sound Effects (Short, reliable clips)
const SFX = {
  open: "https://assets.mixkit.co/sfx/preview/mixkit-fairy-dust-sparkle-861.mp3",
  success: "https://assets.mixkit.co/sfx/preview/mixkit-ethereal-fairy-win-sound-2019.mp3"
};

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Helper for one-shot sound effects
  const playSfx = (url: string, volume = 0.5) => {
    if (isMuted) return; 
    try {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.play().catch(e => console.debug("SFX play failed", e));
    } catch (e) {
      console.debug("Audio not supported");
    }
  };

  // Generate shimmering particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      size: Math.random() * 3 + 1, // 1px to 4px
    }));
  }, []);

  // Generate falling rose petals
  const petals = React.useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${10 + Math.random() * 10}s`, // Slower fall
      scale: 0.5 + Math.random() * 0.7,
      rotation: Math.random() * 360,
      color: Math.random() > 0.6 ? '#fecdd3' : '#ffe4e6', // Rose-200 or Rose-100
    }));
  }, []);

  const handleStart = () => {
    setStarted(true);
    playSfx(SFX.open, 0.3);

    // Reliable Music Playback Logic
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.muted = isMuted;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio started successfully");
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            // Fallback: Sometimes resetting current time helps on mobile
            if(audioRef.current) {
                audioRef.current.currentTime = 0;
            }
          });
      }
    }
  };

  const handleAccept = () => {
    playSfx(SFX.success, 0.4);
    setAccepted(true);
  };

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    if (audioRef.current) audioRef.current.muted = newState;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#fff0f5]">
      <div className="bg-grain"></div>
      
      {/* 
        AUDIO ELEMENT 
        - preload="auto": Ensures file is ready
        - playsInline: Critical for mobile iOS
      */}
      <audio 
        ref={audioRef} 
        src={MUSIC_URL} 
        loop 
        preload="auto"
        playsInline
      />
      
      {/* Luxury Light Background Layer */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {/* Soft Pink/White Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-50 via-white to-pink-100 animate-gradient-shift"></div>
        
        {/* Shimmering Particles Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <div
              key={`particle-${p.id}`}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        {/* Falling Rose Petals Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {petals.map((petal) => (
            <div
              key={`petal-${petal.id}`}
              className="absolute -top-10 animate-fall"
              style={{
                left: petal.left,
                animationDelay: petal.delay,
                animationDuration: petal.duration,
              }}
            >
              <div className="animate-sway" style={{ animationDuration: `${Math.random() * 3 + 3}s` }}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill={petal.color} 
                  style={{ 
                    transform: `scale(${petal.scale}) rotate(${petal.rotation}deg)`,
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))'
                  }}
                >
                  <path d="M12 2C12 2 20 10 20 16C20 20.4183 16.4183 24 12 24C7.58172 24 4 20.4183 4 16C4 10 12 2 12 2Z" opacity="0.8" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Abstract Light Overlay */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
           <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,228,230,0.4),transparent_70%)] animate-pulse"></div>
        </div>
      </div>

      {/* Content Layer */}
      {!started && <WelcomeOverlay onStart={handleStart} />}
      
      {started && !accepted && (
        <ProposalCard onAccept={handleAccept} name="My Love" />
      )}

      {started && accepted && (
        <SuccessView />
      )}

      {started && (
        <MusicControl isMuted={isMuted} onToggle={toggleMute} />
      )}
      
      <div className="absolute bottom-6 text-center w-full z-0">
        <p className="text-rose-900/30 text-[10px] uppercase tracking-[0.4em] font-luxury">
          Eternity Collection • {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default App;