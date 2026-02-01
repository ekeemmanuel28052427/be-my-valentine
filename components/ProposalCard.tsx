import React, { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from './Button';
import { ProposalProps, Position } from '../types';

const DODGE_SFX = "https://assets.mixkit.co/sfx/preview/mixkit-arrow-whoosh-1491.mp3";

const REJECTION_TEXTS = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "I wouldn't say no!",
  "Do you want to break my heart?",
  "Is that your final answer?",
  "Don't do this!",
  "Look at the other button!",
  "Click the YES!",
  "Seriously?",
  "Error: Button broken",
  "Try again!",
  "Nope, wrong one",
  "Missed me!",
  "Too slow!",
  "Can't catch me!"
];

export const ProposalCard: React.FC<ProposalProps> = ({ onAccept, name = "My Love" }) => {
  const [noBtnPosition, setNoBtnPosition] = useState<Position>({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [initialDimensions, setInitialDimensions] = useState({ width: 0, height: 0 });
  const [displayName, setDisplayName] = useState(name);
  const [btnText, setBtnText] = useState("Not this time");
  
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef<number>(0);
  const mousePos = useRef<{x: number, y: number}>({ x: 0, y: 0 });

  // Handle dynamic name from URL or prop update
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get('name');
    if (urlName) {
      setDisplayName(urlName);
    } else {
      setDisplayName(name);
    }
  }, [name]);

  // Track mouse position globally for smarter dodging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Proximity check if already in "moving" mode
      if (hasMoved && noBtnRef.current) {
        const rect = noBtnRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        // If cursor gets too close (100px radius), trigger move
        if (dist < 100) {
           moveButton();
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasMoved]);

  const playDodgeSound = () => {
    try {
      const audio = new Audio(DODGE_SFX);
      audio.volume = 0.9; // Keep it subtle
      audio.play().catch(() => {});
    } catch (e) {
      // Ignore audio errors
    }
  };

  const moveButton = () => {
    const now = Date.now();
    // Reduced throttle to 200ms for snappier mobile response
    if (now - lastMoveTime.current < 200) return;
    lastMoveTime.current = now;

    // Capture initial dimensions on first move to prevent layout shift of the container
    if (!hasMoved && noBtnRef.current) {
        const rect = noBtnRef.current.getBoundingClientRect();
        setInitialDimensions({ width: rect.width, height: rect.height });
    }

    playDodgeSound();

    // Change text randomly
    const randomText = REJECTION_TEXTS[Math.floor(Math.random() * REJECTION_TEXTS.length)];
    setBtnText(randomText);

    // Calculate Safe Bounds
    // Assume a slightly larger width for safety since text changes
    const estimatedWidth = 160; 
    const estimatedHeight = 60; 
    const padding = 20;

    // Viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const maxX = viewportWidth - estimatedWidth - padding;
    const maxY = viewportHeight - estimatedHeight - padding;
    
    const safeMaxX = Math.max(padding, maxX);
    const safeMaxY = Math.max(padding, maxY);

    // Try to find a position away from the mouse/touch
    let bestX = 0;
    let bestY = 0;
    let maxDist = 0;

    for (let i = 0; i < 8; i++) { // Increased candidates for better "hiding"
        const candidateX = Math.random() * (safeMaxX - padding) + padding;
        const candidateY = Math.random() * (safeMaxY - padding) + padding;
        
        const dist = Math.hypot(candidateX - mousePos.current.x, candidateY - mousePos.current.y);
        if (dist > maxDist) {
            maxDist = dist;
            bestX = candidateX;
            bestY = candidateY;
        }
    }
    
    if (maxDist === 0) {
        bestX = Math.random() * (safeMaxX - padding) + padding;
        bestY = Math.random() * (safeMaxY - padding) + padding;
    }

    setNoBtnPosition({ x: bestX, y: bestY });
    setHasMoved(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative z-10 bg-white/60 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] shadow-[0_30px_60px_rgba(255,182,193,0.3)] border border-white/60 max-w-xl w-full text-center mx-4 fade-in overflow-hidden"
    >
      {/* Light Reflection */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8 flex justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
           {/* Soft Pastel Heart GIF */}
           <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-[0_10px_30px_rgba(244,63,94,0.1)] bg-rose-50">
             <img 
               src="https://media.giphy.com/media/LpDmM2wSt6Hm5fKJVa/giphy.gif" 
               alt="Luxury Floating Heart"
               className="w-full h-full object-cover opacity-90 scale-110"
             />
           </div>
        </div>

        <div className="space-y-6 mb-10">
          <div className="space-y-4">
             <p className="text-rose-900/80 leading-relaxed font-light text-lg font-heading italic animate-slide-up" style={{ animationDelay: '0.4s' }}>
                "You are the poetry my heart writes,<br/>
                and the melody my soul sings."
             </p>
          </div>

          <div className="py-4 animate-slide-up" style={{ animationDelay: '0.8s' }}>
             <h2 className="font-heading italic text-4xl md:text-5xl text-rose-950 mb-4 leading-tight">
               Will you be my Valentine,
             </h2>
             <span className="text-rose-gold font-luxury text-4xl md:text-6xl tracking-widest block font-bold drop-shadow-sm">
               {displayName}?
             </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4 min-h-[60px] animate-slide-up" style={{ animationDelay: '1.2s' }}>
          <Button 
            onClick={onAccept} 
            className="pulse-slow w-full md:w-auto min-w-[200px]"
            variant="primary"
          >
            <Heart className="w-4 h-4 mr-2 fill-white" />
            Yes, Forever
          </Button>

          {/* Placeholder to maintain layout flow when button becomes fixed */}
          <div style={hasMoved ? { width: initialDimensions.width, height: initialDimensions.height } : {}}>
            <button
              ref={noBtnRef}
              onMouseEnter={moveButton}
              onTouchStart={(e) => {
                 // Prevent default to avoid scrolling or simulated clicks on mobile
                 // allowing instant movement
                 // Note: passive listener issues might occur in console, but functionality works
                 moveButton();
              }}
              onClick={moveButton}
              style={hasMoved ? {
                position: 'fixed',
                left: `${noBtnPosition.x}px`,
                top: `${noBtnPosition.y}px`,
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Slightly faster transition
                zIndex: 9999,
                transform: `rotate(${Math.random() * 10 - 5}deg) scale(1.05)`, 
                whiteSpace: 'nowrap'
              } : {}}
              className={`px-8 py-4 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-300 text-rose-400 bg-white/50 border border-white/50 hover:bg-white hover:shadow-lg ${!hasMoved ? 'relative' : ''}`}
            >
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};