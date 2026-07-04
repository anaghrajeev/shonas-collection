import { useState, useEffect, useRef, useCallback } from 'react';
import { getReviews } from '../../utils/reviewStore';
import { getTestimonials } from '../../utils/testimonialStore';
import { getPosters } from '../../utils/posterStore';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [posters, setPosters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Poster Carousel state
  const [posterPage, setPosterPage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    getReviews().then(setReviews).catch(console.error);
    getTestimonials().then(setTestimonials).catch(console.error);
    getPosters().then(setPosters).catch(console.error);
  }, []);

  // Responsive visible count
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
      setPosterPage(0);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Sync track position on page/visibleCount change
  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;
    const w = containerRef.current.offsetWidth;
    trackRef.current.style.transform = `translateX(-${posterPage * w}px)`;
  }, [posterPage, visibleCount, posters.length]);

  const totalPosterPages = posters.length > 0 ? Math.ceil(posters.length / visibleCount) : 0;

  const goToPage = useCallback((page) => {
    const total = Math.ceil(posters.length / visibleCount);
    if (total === 0) return;
    setPosterPage(((page % total) + total) % total);
  }, [posters.length, visibleCount]);

  // Auto-advance every 3 sec
  useEffect(() => {
    if (totalPosterPages <= 1 || isPaused) return;
    const id = setInterval(() => {
      setPosterPage(prev => (prev + 1) % totalPosterPages);
    }, 3000);
    return () => clearInterval(id);
  }, [totalPosterPages, isPaused]);

  // Touch swipe
  const handleTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) goToPage(posterPage + 1);
    else if (diff < -40) goToPage(posterPage - 1);
    touchStartX.current = null;
  };

  useEffect(() => {
    if (reviews.length <= 3 || selectedReview) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reviews.length, selectedReview]);


  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];
    if (reviews.length <= 3) return reviews;
    
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    return url;
  };

  const isYouTube = (url) => {
    return !!url?.match(/(?:youtu\.be\/|youtube\.com\/)/);
  };

  return (
    <>
      <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Background Media Layer */}
        <div className="absolute inset-0 z-0">
          {/* Fallback Background Image (displays while loading or if video fails/is absent) */}
          <div className="absolute inset-0 w-full h-full bg-cover bg-center animate-image-pan opacity-90 scale-105 transition-transform duration-[20s] hover:scale-110" style={{ backgroundImage: "url('/indian_heritage_hero_bg.png')" }}></div>
          
          {/* Background Video Player */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-normal transition-opacity duration-1000"
            poster="/indian_heritage_hero_bg.png"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlays for premium contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-surface"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-0">
          <div className="max-w-3xl flex flex-col items-start text-left bg-black/20 backdrop-blur-md p-6 md:p-14 rounded-2xl md:rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            
            <div className="mb-6 animate-fade-in-up flex items-center gap-4">
              <span className="font-display-lg text-[20px] min-[400px]:text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] text-white tracking-widest uppercase drop-shadow-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis">SHONA'S COLLECTION</span>
            </div>

            <h1 className="font-display-lg text-[18px] min-[400px]:text-[21px] sm:text-[25px] md:text-[32px] lg:text-[36px] text-white tracking-tight leading-[1.05] animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
              <span className="block text-white/80 italic mb-2 md:mb-3 font-light text-[16px] min-[400px]:text-[18px] sm:text-[21px] md:text-[24px] lg:text-[28px]">Crafting</span>
              Modern Heritage.
            </h1>
            
            <p className="mt-4 md:mt-8 font-body-lg text-[15px] md:text-body-lg text-white/90 max-w-xl animate-fade-in-up leading-relaxed hidden sm:block" style={{ animationDelay: '0.2s' }}>
              From authentic readymade Madisars to exquisite Navratri decor. Custom-crafted in Kerala, delivered to your doorstep worldwide.
            </p>

            <div className="mt-6 md:mt-12 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-6 animate-fade-in-up w-full sm:w-auto" style={{ animationDelay: '0.3s' }}>
              <a className="bg-primary text-white font-label-lg text-[12px] md:text-label-lg px-6 md:px-8 py-3 md:py-4 rounded-none uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-primary-container transition-all duration-500 border border-primary hover:shadow-[0_0_30px_rgba(77,2,26,0.6)] text-center flex-1 sm:flex-none" href="#collections">
                Explore Collections
              </a>
              <a className="bg-white/5 backdrop-blur-sm text-white font-label-lg text-[12px] md:text-label-lg px-6 md:px-8 py-3 md:py-4 rounded-none uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-white/20 transition-all duration-500 border border-white/20 text-center flex items-center justify-center gap-2 flex-1 sm:flex-none group" href="https://www.instagram.com/p/DYnRcl5SVSr/" target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-[18px] md:text-[20px] group-hover:scale-110 transition-transform">play_circle</span>
                Watch Full Video
              </a>
              <a className="bg-white/5 backdrop-blur-sm text-white font-label-lg text-[12px] md:text-label-lg px-6 md:px-8 py-3 md:py-4 rounded-none uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-white/20 transition-all duration-500 border border-white/20 text-center flex-1 sm:flex-none" href="#story">
                Our Story
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" 
          onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-white text-xs tracking-[0.3em] uppercase drop-shadow-md">Discover</span>
          <span className="material-symbols-outlined text-white text-3xl animate-bounce drop-shadow-md">keyboard_double_arrow_down</span>
        </div>
      </section>

      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-24 flex flex-col gap-10 md:gap-32">
        {/* Featured Highlights Section */}
        <section id="launch-offer" className="flex flex-col gap-6 md:gap-8 items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="font-label-lg text-label-lg text-secondary uppercase tracking-widest text-[11px] md:text-[14px]">Discover</span>
            <h2 className="font-headline-lg text-[24px] md:text-headline-lg text-primary">Featured Highlights</h2>
            <div className="w-16 md:w-24 h-[2px] bg-primary/40 rounded-full"></div>
          </div>

          {posters.length > 0 ? (
            <div className="w-full">
              {/* Carousel wrapper */}
              <div
                className="relative overflow-hidden rounded-2xl"
                ref={containerRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Sliding track */}
                <div
                  ref={trackRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ width: `${(posters.length / visibleCount) * 100}%` }}
                >
                  {posters.map((p, idx) => (
                    <div
                      key={p.id}
                      style={{ width: `${100 / posters.length}%` }}
                      className="flex-shrink-0 px-2"
                    >
                      <div
                        className="group relative rounded-2xl overflow-hidden ambient-shadow cursor-pointer border border-outline-variant/20 hover:shadow-[0_8px_32px_rgba(77,2,26,0.18)] transition-shadow duration-500"
                        onClick={() => setSelectedImage(p.imageUrl)}
                      >
                        <div className="relative w-full aspect-[4/5] bg-surface-container-low">
                          <img
                            src={p.imageUrl}
                            alt={`Featured Highlight ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
                            <span className="text-white font-label-lg text-[12px] uppercase tracking-widest flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                              <span className="material-symbols-outlined text-[15px]">zoom_in</span>
                              View Full
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Arrow buttons — desktop only */}
                {totalPosterPages > 1 && (
                  <>
                    <button
                      onClick={() => goToPage(posterPage - 1)}
                      className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-primary text-white p-2 rounded-full backdrop-blur-sm border border-white/20 transition-colors z-20 hidden md:flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-2xl">chevron_left</span>
                    </button>
                    <button
                      onClick={() => goToPage(posterPage + 1)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-primary text-white p-2 rounded-full backdrop-blur-sm border border-white/20 transition-colors z-20 hidden md:flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-2xl">chevron_right</span>
                    </button>
                  </>
                )}
              </div>

              {/* Dot indicators */}
              {totalPosterPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {Array.from({ length: totalPosterPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPosterPage(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${i === posterPage ? 'w-6 bg-primary' : 'w-2 bg-outline-variant'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full max-w-xs mx-auto">
              <div
                className="group relative rounded-2xl overflow-hidden ambient-shadow cursor-pointer border border-outline-variant/20 hover:shadow-[0_8px_32px_rgba(77,2,26,0.18)] transition-shadow duration-500"
                onClick={() => setSelectedImage("/website_launch_offer.jpg")}
              >
                <div className="relative w-full aspect-[4/5] bg-surface-container-low">
                  <img
                    src="/website_launch_offer.jpg"
                    alt="Website Launch Offer Poster"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
                    <span className="text-white font-label-lg text-[12px] uppercase tracking-widest flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <span className="material-symbols-outlined text-[15px]">zoom_in</span>
                      View Full
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="collections" className="flex flex-col gap-12 pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-headline-lg text-headline-lg text-primary">Explore Our Collections</h2>
            <div className="w-24 h-[2px] bg-primary/40 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-gutter auto-rows-[200px] md:auto-rows-[300px]">
            <div onClick={() => setSelectedImage("https://lh3.googleusercontent.com/aida-public/AB6AXuCCa0Bf_7EjuFu0_vx-HD2-n-pVMgP2r8-6zsGUXjb5O13zdYgALJIR5Br6s5hiGAvykg1TevTUTXMLxcVobWr4VM4TI1xHmn1AwS_3GGVbTPW8qkl3e8kFqkNrwHG1kIqgY5pDj-xjkGCMJAg6hCagy6hohW4S75a3Z4C_gK24joTBcKeFyZbhZ_BbMk8MABb5nOUm_Ydm48LRMJZy24kktFw5nb8t0sDOCI8uCtzh9CDHByQSpjs0oZuMiKk-jMQAnyZPf8Qzwjfl")} className="group relative md:col-span-2 md:row-span-2 rounded-xl overflow-hidden bg-surface ambient-shadow block cursor-pointer">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Customized Madisar & Panchagacham" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCa0Bf_7EjuFu0_vx-HD2-n-pVMgP2r8-6zsGUXjb5O13zdYgALJIR5Br6s5hiGAvykg1TevTUTXMLxcVobWr4VM4TI1xHmn1AwS_3GGVbTPW8qkl3e8kFqkNrwHG1kIqgY5pDj-xjkGCMJAg6hCagy6hohW4S75a3Z4C_gK24joTBcKeFyZbhZ_BbMk8MABb5nOUm_Ydm48LRMJZy24kktFw5nb8t0sDOCI8uCtzh9CDHByQSpjs0oZuMiKk-jMQAnyZPf8Qzwjfl" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <div>
                  <h3 className="font-headline-md text-headline-md text-white mb-2">Madisar & Panchagacham</h3>
                  <span className="font-label-lg text-label-lg text-white/80 uppercase tracking-widest">Shop Collection</span>
                </div>
              </div>
            </div>
            <div onClick={() => setSelectedImage("https://lh3.googleusercontent.com/aida-public/AB6AXuB4CO5rSSoNNnL0wKgsVI7jXdd6J_Ba-1fR60FqifM1XtvQRtC5WPrzlzpoVyrWhWfXu2gPPz09_y8VhK3Y3FwRBvnSpFrzPqBi0ELk8Z3De-oJHJbewjLNyFayqHV4L7CrW6KZASLiOCD4q2CZSn2ZquUj8JUfBLZKDjb850mDy64Kfd6Ji-k3bfygtGHw9SHQYkQIh-SHGxRVNRmnVkVdV4gtGPeYoLxGYB_Hd1ffbVSPJSRs9OGQ5AOdelLWa2mXWCYBZKes1l2L")} className="group relative rounded-xl overflow-hidden bg-surface ambient-shadow block cursor-pointer">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Ladies Wear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4CO5rSSoNNnL0wKgsVI7jXdd6J_Ba-1fR60FqifM1XtvQRtC5WPrzlzpoVyrWhWfXu2gPPz09_y8VhK3Y3FwRBvnSpFrzPqBi0ELk8Z3De-oJHJbewjLNyFayqHV4L7CrW6KZASLiOCD4q2CZSn2ZquUj8JUfBLZKDjb850mDy64Kfd6Ji-k3bfygtGHw9SHQYkQIh-SHGxRVNRmnVkVdV4gtGPeYoLxGYB_Hd1ffbVSPJSRs9OGQ5AOdelLWa2mXWCYBZKes1l2L" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-headline-md text-[20px] font-semibold text-white mb-1">Ladies Wear</h3>
                <span className="font-label-md text-label-md text-white/80 uppercase">Kurtis & Sarees</span>
              </div>
            </div>
            <div onClick={() => setSelectedImage("https://lh3.googleusercontent.com/aida-public/AB6AXuCdUnSIg1E7YGMER31sDqNYnyiQeKIFPCM0mC326DYMfjXxzKcw4_hsN8yJPLdGqEJyscoVe0dk-9CRUR_d0GNNK-UiSf2YpGqN7gVWPeG48H9_bvXkKBcsO0PbQyzO9C_aoJN_8-LZSt79V2ldfvrIkfc8YkwnZzhUQkzohF5iRUiEMZXGu7Chy1l2urzNysj3A63O7qYo417CpKfoL-lfOHHjCs_tyCQCP6fosGXfDTz15C_K-SVNh0Zcf8f_lmUGTvLlXWRvaczW")} className="group relative rounded-xl overflow-hidden bg-surface ambient-shadow block cursor-pointer">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Mens & Kids" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdUnSIg1E7YGMER31sDqNYnyiQeKIFPCM0mC326DYMfjXxzKcw4_hsN8yJPLdGqEJyscoVe0dk-9CRUR_d0GNNK-UiSf2YpGqN7gVWPeG48H9_bvXkKBcsO0PbQyzO9C_aoJN_8-LZSt79V2ldfvrIkfc8YkwnZzhUQkzohF5iRUiEMZXGu7Chy1l2urzNysj3A63O7qYo417CpKfoL-lfOHHjCs_tyCQCP6fosGXfDTz15C_K-SVNh0Zcf8f_lmUGTvLlXWRvaczW" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-headline-md text-[20px] font-semibold text-white mb-1">Mens & Kids</h3>
                <span className="font-label-md text-label-md text-white/80 uppercase">Traditional Wear</span>
              </div>
            </div>
            <div onClick={() => setSelectedImage("https://lh3.googleusercontent.com/aida-public/AB6AXuDv8leZzJ1kaH-BVJqA573so-MWsCCSnjmmIPI6aKCta7sxt9Ah7Bixgkc4wz2gUPHCbAd51q7FBMd37txXUCAd-kmMN5lWXQg5mzDw2euJUxGg9HV0x4kuxf4fjVAic2rP4yRfixrXxxTWlWYhMkceCXrxVX7_Bt3KEGV0AWFqPYqoHRBY7rVMrT57BY0xnPmkcDLcAqhGrJYLSuD4Ve-2ws9wB3Svt99NFx44KVOfSv97bLOQQSuBMnf4lw5vUaLmLXHswGnrPoT8")} className="group relative rounded-xl overflow-hidden bg-surface ambient-shadow block md:col-span-2 cursor-pointer">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Traditional & Oxidised Jewellery" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv8leZzJ1kaH-BVJqA573so-MWsCCSnjmmIPI6aKCta7sxt9Ah7Bixgkc4wz2gUPHCbAd51q7FBMd37txXUCAd-kmMN5lWXQg5mzDw2euJUxGg9HV0x4kuxf4fjVAic2rP4yRfixrXxxTWlWYhMkceCXrxVX7_Bt3KEGV0AWFqPYqoHRBY7rVMrT57BY0xnPmkcDLcAqhGrJYLSuD4Ve-2ws9wB3Svt99NFx44KVOfSv97bLOQQSuBMnf4lw5vUaLmLXHswGnrPoT8" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-headline-md text-[20px] font-semibold text-white mb-1">Traditional & Oxidised Jewellery</h3>
                <span className="font-label-md text-label-md text-white/80 uppercase">Adornments</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8 md:gap-12 bg-surface-container-low p-6 md:p-12 rounded-2xl mandala-bg">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full ambient-shadow">
              <span className="material-symbols-outlined text-[#FBBC04]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-label-lg text-label-lg text-primary">5.0 Google Rating</span>
            </div>
            <h2 className="font-headline-lg text-[28px] md:text-headline-lg text-primary">Trusted by Families Worldwide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {visibleReviews.map((t, i) => (
              <div key={`${t.id}-${i}`} className="bg-white p-6 md:p-8 rounded-xl ambient-shadow flex flex-col gap-4 animate-fade-in-up min-h-[240px] md:h-[320px]">
                <div className="flex text-[#FBBC04]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span key={starIndex} className="material-symbols-outlined" style={{ fontVariationSettings: starIndex < (t.rating || 5) ? "'FILL' 1" : "'FILL' 0", opacity: starIndex < (t.rating || 5) ? 1 : 0.3 }}>star</span>
                  ))}
                </div>
                <div className="flex-1 overflow-hidden flex flex-col items-start">
                  <p className="font-body-md text-body-md text-on-surface-variant italic line-clamp-4">"{t.text}"</p>
                  <button onClick={() => setSelectedReview(t)} className="text-primary font-label-md mt-2 hover:underline">Read more</button>
                </div>
                <div className="mt-auto pt-4 border-t border-outline-variant/30">
                  <p className="font-label-lg text-label-lg text-primary">{t.name}</p>
                  <p className="font-label-md text-label-md text-secondary">{t.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {testimonials.length > 0 && (
          <section id="testimonial-videos" className="flex flex-col gap-8 md:gap-12 pt-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full ambient-shadow">
                <span className="material-symbols-outlined text-[#FBBC04]" style={{ fontVariationSettings: "'FILL' 1" }}>video_library</span>
                <span className="font-label-lg text-label-lg text-primary">Customer Stories</span>
              </div>
              <h2 className="font-headline-lg text-[28px] md:text-headline-lg text-primary">Watch Our Customers Shine</h2>
              <div className="w-24 h-[2px] bg-primary/40 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-surface rounded-2xl p-4 ambient-shadow flex flex-col gap-4 group hover:scale-[1.02] transition-transform duration-300">
                  <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-inner">
                    {isYouTube(t.videoUrl) ? (
                      <iframe 
                        src={getEmbedUrl(t.videoUrl)} 
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${t.name} testimonial`}
                      />
                    ) : (
                      <video 
                        src={t.videoUrl} 
                        controls 
                        className="absolute inset-0 w-full h-full object-cover"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                  <div className="text-center pt-2 border-t border-outline-variant/30">
                    <p className="font-label-lg text-primary">{t.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="story" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center pt-8">
          <div className="relative rounded-2xl overflow-hidden ambient-shadow h-[360px] md:h-[600px]">
            <img className="w-full h-full object-cover object-center" alt="Founder" src="/founder.png" />
          </div>
          <div className="flex flex-col gap-6">
            <span className="font-label-lg text-label-lg text-outline uppercase tracking-widest">Our Story</span>
            <h2 className="font-display-lg text-[32px] md:text-display-lg text-primary leading-tight">Crafting Modern Heritage.</h2>
            <div className="w-12 h-1 bg-primary-container"></div>
            <div className="font-body-lg text-body-lg text-on-surface-variant space-y-4">
              <p>
                Founded by Ms. Jayasree Raman Iyer, Shona's Collection celebrates the beauty of Indian craftsmanship and personalized service. After a successful corporate career, Ms. Jayasree created an online store to connect people worldwide with authentic traditional products and heritage collections.
              </p>
              <p>
                Since our launch on September 9, 2018, we have proudly served more than 1,000 customers across the globe. We bring the warmth of Indian hospitality and beautiful, custom-crafted products right to your doorstep. Every item—from our specialized Madisars to our curated jewellery and home decor—is chosen with care to ensure high quality and true cultural style.
              </p>
            </div>
            <div className="mt-4">
              <span className="font-headline-md text-headline-md text-primary italic">"Heritage is not just what we carry; it's how we bring tradition into our lives."</span>
              <p className="font-label-md text-label-md text-secondary mt-2 uppercase tracking-wide">— Ms. Jayasree Raman Iyer, Founder</p>
            </div>
          </div>
        </section>
      </div>

      {selectedReview && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedReview(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[80vh] flex flex-col gap-6 ambient-shadow animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div className="flex text-[#FBBC04]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span key={starIndex} className="material-symbols-outlined" style={{ fontVariationSettings: starIndex < (selectedReview.rating || 5) ? "'FILL' 1" : "'FILL' 0", opacity: starIndex < (selectedReview.rating || 5) ? 1 : 0.3 }}>star</span>
                ))}
              </div>
              <button onClick={() => setSelectedReview(null)} className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="overflow-y-auto flex-1 pr-2">
              <p className="font-body-lg text-on-surface-variant italic leading-relaxed text-lg">"{selectedReview.text}"</p>
            </div>
            <div className="pt-4 border-t border-outline-variant/30">
              <p className="font-label-lg text-primary text-xl">{selectedReview.name}</p>
              <p className="font-label-md text-secondary text-lg">{selectedReview.loc}</p>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] flex items-center justify-center animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-black/40 rounded-full p-2 z-10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <img src={selectedImage} alt="Collection Full View" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
          </div>
        </div>
      )}
    </>
  );
}
