import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  // Base styles: Elegant tracking, uppercase, refined padding
  const baseStyles = "px-10 py-4 rounded-full text-sm tracking-widest uppercase font-semibold transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,182,193,0.3)]";
  
  const variants = {
    // Rose Gold Gradient
    primary: "bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300 text-white border border-rose-200 hover:shadow-[0_15px_35px_rgba(244,63,94,0.3)] bg-[length:200%_auto] hover:bg-right",
    
    // Pearl / White Glass
    secondary: "bg-white/40 text-rose-900 border border-white/60 hover:bg-white/60 backdrop-blur-md hover:shadow-lg",
    
    // Soft Grey for "No"
    danger: "bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-200", 
    
    // Rose Ghost
    ghost: "bg-transparent text-rose-900 hover:text-rose-700 border border-rose-300/50 hover:border-rose-400 hover:bg-rose-50/50 backdrop-blur-sm shadow-none"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};