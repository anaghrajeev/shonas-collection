import { useState, useEffect } from 'react';
import { getReviews } from '../../utils/reviewStore';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    setReviews(getReviews());
  }, []);

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

  return (
    <>
      <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full hero-parallax opacity-60 scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCM2qvDlwrv61QphnTu1n0CIDunjZ8pFFFR8LjU7YKbSJxNtdudByhZax-RLGtPLy4hscO5aTbNO1Fp4S8oruj9q2qmlLWSDe-7dYK8lsIGnHJON91nr9DaZ1ifw-o4eQIwF1527OV33gFA0b7yDOeVYz__iwoxcSnPsVWwRhFzLb_MMDyokos4xwgiPvFedumjSLC-EQcXY6EU6hIifgiVucwpODIrz6KcN9IZ6HAjUG_Wx5ZK6qurCxKFX9zBF5wSZroeYBKimPkY')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center">
          
          <div className="mb-6 animate-fade-in-up flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-primary/40"></div>
            <span className="font-label-md text-label-md text-primary tracking-[0.3em] uppercase">Shona's Collection</span>
            <div className="h-px w-12 bg-primary/40"></div>
          </div>

          <h1 className="font-display-lg text-[42px] md:text-[64px] text-on-surface max-w-5xl tracking-tight leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="block text-primary italic mb-2 font-light">Crafting</span>
            Modern Heritage.
          </h1>
          
          <p className="mt-8 font-body-lg text-body-lg text-on-surface-variant max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            From authentic readymade Madisars to exquisite Navratri decor. Custom-crafted in Kerala, delivered to your doorstep worldwide.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a className="bg-primary text-white font-label-lg text-label-lg px-10 py-4 rounded-none uppercase tracking-[0.2em] hover:bg-primary-container transition-all duration-500 border border-primary hover:shadow-[0_0_30px_rgba(77,2,26,0.2)]" href="#collections">
              Explore Collections
            </a>
            <a className="bg-transparent text-primary font-label-lg text-label-lg px-10 py-4 rounded-none uppercase tracking-[0.2em] hover:bg-primary/5 transition-all duration-500 border border-primary/30" href="#story">
              Our Story
            </a>
          </div>

          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-pulse-slow">
            <div className="w-[1px] h-16 bg-gradient-to-b from-primary/60 to-transparent"></div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24 flex flex-col gap-16 md:gap-32">
        <section id="collections" className="flex flex-col gap-12 pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="material-symbols-outlined text-outline-variant opacity-50" style={{ fontSize: '32px' }}>diamond</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Explore Our Collections</h2>
            <div className="w-16 h-px bg-outline-variant"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-gutter auto-rows-[250px] md:auto-rows-[300px]">
            <a className="group relative md:col-span-2 md:row-span-2 rounded-xl overflow-hidden bg-surface ambient-shadow block" href="#">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Customized Madisar & Panchagacham" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCa0Bf_7EjuFu0_vx-HD2-n-pVMgP2r8-6zsGUXjb5O13zdYgALJIR5Br6s5hiGAvykg1TevTUTXMLxcVobWr4VM4TI1xHmn1AwS_3GGVbTPW8qkl3e8kFqkNrwHG1kIqgY5pDj-xjkGCMJAg6hCagy6hohW4S75a3Z4C_gK24joTBcKeFyZbhZ_BbMk8MABb5nOUm_Ydm48LRMJZy24kktFw5nb8t0sDOCI8uCtzh9CDHByQSpjs0oZuMiKk-jMQAnyZPf8Qzwjfl" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <div>
                  <h3 className="font-headline-md text-headline-md text-white mb-2">Customized Madisar & Panchagacham</h3>
                  <span className="font-label-lg text-label-lg text-white/80 uppercase tracking-widest">Shop Collection</span>
                </div>
              </div>
            </a>
            <a className="group relative rounded-xl overflow-hidden bg-surface ambient-shadow block" href="#">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Ladies Wear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4CO5rSSoNNnL0wKgsVI7jXdd6J_Ba-1fR60FqifM1XtvQRtC5WPrzlzpoVyrWhWfXu2gPPz09_y8VhK3Y3FwRBvnSpFrzPqBi0ELk8Z3De-oJHJbewjLNyFayqHV4L7CrW6KZASLiOCD4q2CZSn2ZquUj8JUfBLZKDjb850mDy64Kfd6Ji-k3bfygtGHw9SHQYkQIh-SHGxRVNRmnVkVdV4gtGPeYoLxGYB_Hd1ffbVSPJSRs9OGQ5AOdelLWa2mXWCYBZKes1l2L" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-headline-md text-[20px] font-semibold text-white mb-1">Ladies Wear</h3>
                <span className="font-label-md text-label-md text-white/80 uppercase">Kurtis & Sarees</span>
              </div>
            </a>
            <a className="group relative rounded-xl overflow-hidden bg-surface ambient-shadow block" href="#">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Mens & Kids" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdUnSIg1E7YGMER31sDqNYnyiQeKIFPCM0mC326DYMfjXxzKcw4_hsN8yJPLdGqEJyscoVe0dk-9CRUR_d0GNNK-UiSf2YpGqN7gVWPeG48H9_bvXkKBcsO0PbQyzO9C_aoJN_8-LZSt79V2ldfvrIkfc8YkwnZzhUQkzohF5iRUiEMZXGu7Chy1l2urzNysj3A63O7qYo417CpKfoL-lfOHHjCs_tyCQCP6fosGXfDTz15C_K-SVNh0Zcf8f_lmUGTvLlXWRvaczW" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-headline-md text-[20px] font-semibold text-white mb-1">Mens & Kids</h3>
                <span className="font-label-md text-label-md text-white/80 uppercase">Traditional Wear</span>
              </div>
            </a>
            <a className="group relative rounded-xl overflow-hidden bg-surface ambient-shadow block md:col-span-2" href="#">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Traditional & Oxidised Jewellery" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv8leZzJ1kaH-BVJqA573so-MWsCCSnjmmIPI6aKCta7sxt9Ah7Bixgkc4wz2gUPHCbAd51q7FBMd37txXUCAd-kmMN5lWXQg5mzDw2euJUxGg9HV0x4kuxf4fjVAic2rP4yRfixrXxxTWlWYhMkceCXrxVX7_Bt3KEGV0AWFqPYqoHRBY7rVMrT57BY0xnPmkcDLcAqhGrJYLSuD4Ve-2ws9wB3Svt99NFx44KVOfSv97bLOQQSuBMnf4lw5vUaLmLXHswGnrPoT8" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-headline-md text-[20px] font-semibold text-white mb-1">Traditional & Oxidised Jewellery</h3>
                <span className="font-label-md text-label-md text-white/80 uppercase">Adornments</span>
              </div>
            </a>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleReviews.map((t, i) => (
              <div key={`${t.id}-${i}`} className="bg-white p-8 rounded-xl ambient-shadow flex flex-col gap-4 animate-fade-in-up h-[320px]">
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

        <section id="story" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center pt-8">
          <div className="relative rounded-2xl overflow-hidden ambient-shadow h-[400px] md:h-[600px]">
            <img className="w-full h-full object-cover" alt="Founder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfluf4eTrLPCy4vyxk31Tg5hP_8rl_ZcPC-ZkWQsI_LXtP78sRDdceTib43BBtW7_x-8dDrYKqZXUKyWh6fCy8Ei1jp7Yhc7XZF6l4YUDxRtoVqthna6dCn0tTzlhGWnNAYHP3IKGaokeUL2LTmB0-Vrh9MIm6cBHSbEdN-z46rsHbLZ9Ra88i_ZER7amvpZ-7oxFV7X5O99NyhGFAt90JhvsiRVaaMlquQeSNFCB2Qw5fqPqfNvSRrPKA7bfeUFnHmc8trZDMUl7b" />
          </div>
          <div className="flex flex-col gap-6">
            <span className="font-label-lg text-label-lg text-outline uppercase tracking-widest">Our Story</span>
            <h2 className="font-display-lg text-[32px] md:text-display-lg text-primary leading-tight">Crafting Modern Heritage.</h2>
            <div className="w-12 h-1 bg-primary-container"></div>
            <div className="font-body-lg text-body-lg text-on-surface-variant space-y-4">
              <p>
                Founded by Ms. Jayasree Raman Iyer, Shona's Collection celebrates the beauty of Indian craftsmanship and personalized service. After a successful corporate career, Ms. Jayasree created a boutique to connect people worldwide with authentic traditional clothing.
              </p>
              <p>
                Today, we proudly serve over 500 customers across the globe. We bring the warmth of Indian hospitality and beautiful, custom-crafted ethnic wear right to your doorstep. Every piece is chosen with care to ensure high quality and true cultural style.
              </p>
            </div>
            <div className="mt-4">
              <span className="font-headline-md text-headline-md text-primary italic">"Tradition is not just what we wear; it's how we connect."</span>
              <p className="font-label-md text-label-md text-secondary mt-2 uppercase tracking-wide">— Ms. Jayasree Raman Iyer, Founder</p>
            </div>
          </div>
        </section>
      </div>

      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedReview(null)}>
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
    </>
  );
}
