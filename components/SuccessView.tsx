import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MessageCircle, Heart, CalendarHeart } from 'lucide-react';
import { Button } from './Button';

export const SuccessView: React.FC = () => {
  
  useEffect(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    // Rose Gold, Pink, White palette
    const colors = ['#eecda3', '#ef629f', '#ffc0cb', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        drift: 0.5,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        drift: -0.5,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const handleWhatsApp = () => {
    // A passionate, affirmative response for her to send
    const text = encodeURIComponent("Awnnn, this is so nice, baby. I am definitely looking forward to that day. Thank you so much.");
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="z-10 bg-white/80 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/60 shadow-[0_20px_70px_rgba(255,182,193,0.5)] max-w-md w-full text-center mx-4 fade-in relative overflow-hidden">
      
      {/* Decorative background element inside card */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-50/80 to-transparent pointer-events-none"></div>

      <div className="mb-6 flex justify-center relative z-10">
        <div className="w-24 h-24 rounded-full p-1 bg-white shadow-lg shadow-rose-200/50">
            <div className="w-full h-full rounded-full overflow-hidden bg-rose-50 relative">
                <img 
                    src="https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif" 
                    alt="Celebration"
                    className="w-full h-full object-cover scale-110 opacity-90"
                />
            </div>
        </div>
      </div>

      <h2 className="font-heading text-4xl md:text-5xl text-rose-950 italic mb-3 leading-tight tracking-tight relative z-10">
        My Heart is Yours
      </h2>
      
      <p className="text-rose-900/70 text-base md:text-lg font-light mb-8 leading-relaxed relative z-10 font-sans">
        You are my favorite thought, today<br/> and every single day after.
      </p>
      
      <div className="bg-gradient-to-br from-white/60 to-white/30 border border-white p-5 rounded-2xl mb-8 text-left relative overflow-hidden group shadow-md hover:shadow-lg transition-all duration-500 z-10">
         <div className="absolute -right-4 -top-4 text-rose-100 opacity-40 transform rotate-12 group-hover:scale-110 transition-transform duration-700">
            <Heart size={100} fill="currentColor" />
         </div>
         
         <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2">
                 <CalendarHeart className="w-4 h-4 text-rose-400" />
                 <p className="text-xs text-rose-400 uppercase tracking-[0.2em] font-bold">The Plan</p>
             </div>
             <p className="text-xl text-rose-900 font-heading italic mb-1">A Night to Remember</p>
             <p className="text-sm text-rose-800/60 font-medium leading-relaxed">
                I've arranged everything. Just bring your beautiful smile.
             </p>
         </div>
      </div>

      <Button 
        onClick={handleWhatsApp} 
        className="w-full shadow-rose-300/40 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all pulse-slow relative z-10 group"
        variant="primary"
      >
        <span className="relative z-10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Say "Yes" on WhatsApp
        </span>
      </Button>
      
      <p className="mt-6 text-xs text-rose-300/80 font-luxury tracking-widest uppercase">
        Forever Begins Now
      </p>
    </div>
  );
};