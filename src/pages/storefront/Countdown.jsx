import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target Date: May 29, 2026 16:30:00 (Local Time)
    // Using absolute ISO string for accurate comparison based on user's timezone +05:30
    const targetDate = new Date("2026-05-29T16:30:00+05:30").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-surface">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center animate-image-pan opacity-90 scale-105" 
          style={{ backgroundImage: "url('/indian_heritage_hero_bg.png')" }}
        ></div>
        {/* Overlays for premium contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center bg-black/30 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          
          <div className="mb-6 animate-fade-in-up flex items-center gap-4 justify-center">
            <div className="h-[2px] w-12 bg-primary"></div>
            <span className="font-label-md text-label-md text-white tracking-[0.3em] uppercase drop-shadow-md">Shona's Collection</span>
            <div className="h-[2px] w-12 bg-primary"></div>
          </div>

          <h1 className="font-display-lg text-[40px] md:text-[64px] text-white tracking-tight leading-[1.1] animate-fade-in-up drop-shadow-lg mb-4" style={{ animationDelay: '0.1s' }}>
            <span className="block text-white/80 italic font-light text-[32px] md:text-[40px] mb-2">Grand Opening</span>
            Coming Soon
          </h1>
          
          <p className="font-body-lg text-body-lg text-white/90 max-w-xl animate-fade-in-up leading-relaxed mb-12" style={{ animationDelay: '0.2s' }}>
            We are preparing something extraordinary. Join us for the grand inauguration of our exclusive collection on May 29th at 4:30 PM.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center min-w-[70px] md:min-w-[100px]">
                <div className="bg-primary/80 backdrop-blur-sm border border-primary/50 text-white w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-2xl shadow-lg mb-3">
                  <span className="font-display-lg text-[32px] md:text-[48px] font-bold">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="font-label-lg text-white/80 uppercase tracking-widest text-sm md:text-base">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
