import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../../utils/productStore';
import { useCart } from '../../contexts/CartContext';

const WHATSAPP_NUMBER = '919656777404';

function waLink(product, size, variantIndex) {
  const websiteUrl = `${window.location.origin}/product/${product.id}?variant=${variantIndex}`;
  
  let text = `*(Note: Please click the 'Send' button to submit this inquiry.)*\n\nHello Shona's Collection! ✨\n\nI would like to place an order for the following item:\n\n🛍️ *Product:* ${product.name}\n`;
  if (size) text += `📏 *Size:* ${size}\n`;
  text += `🔗 *Variant Link:* ${websiteUrl}`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const variantFilter = searchParams.get('variant');
  
  const scrollRef = useRef(null);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [addedMessage, setAddedMessage] = useState(false);

  const { addToCart } = useCart();

  // Fetch Product
  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(all => {
        const p = all.find(item => item.id.toString() === id);
        if (p) {
          setProduct(p);
          if (p.sizes && p.sizes.length > 0) {
            setSelectedSize(''); // forces selection if sizes exist
          }
          if (variantFilter) {
            setActiveIndex(parseInt(variantFilter, 10) || 0);
          }
        } else {
          setError('Product not found.');
        }
      })
      .catch(() => setError('Failed to load product details.'))
      .finally(() => setLoading(false));
  }, [id, variantFilter]);

  const images = product?.images?.length ? product.images : (product?.img ? [product.img] : []);
  const sizes = product?.sizes || [];

  // Track active image index on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth);
      setActiveIndex(index);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [images.length]);

  // Initialize scroll position if a variant is pre-selected
  useEffect(() => {
    if (variantFilter && scrollRef.current && images.length > 0) {
      const idx = parseInt(variantFilter, 10);
      if (!isNaN(idx)) {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: idx * scrollRef.current.offsetWidth, behavior: 'auto' });
          }
        }, 100);
      }
    }
  }, [variantFilter, images.length]);

  // Lightbox key controls
  useEffect(() => {
    if (zoomedIndex === null) return;
    const handleKey = (e) => { 
      if (e.key === 'Escape') setZoomedIndex(null);
      if (e.key === 'ArrowLeft') setZoomedIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
      if (e.key === 'ArrowRight') setZoomedIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [zoomedIndex, images.length]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * scrollRef.current.offsetWidth * 0.85, behavior: 'smooth' });
    }
  };

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    
    addToCart(product, selectedSize, activeIndex);
    
    // Show temporary success feedback
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 flex items-center justify-center text-secondary gap-3">
        <span className="material-symbols-outlined animate-spin">progress_activity</span>
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 flex flex-col items-center justify-center gap-4">
        <span className="material-symbols-outlined text-5xl text-error opacity-80">error</span>
        <h2 className="font-display-md text-2xl text-on-surface">{error || 'Product not found'}</h2>
        <button onClick={() => navigate('/shop')} className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-label-md">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 animate-fade-in">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-label-md uppercase tracking-wider mb-8 text-sm group w-fit"
      >
        <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Left: Image Gallery (Takes up more space now) */}
        <div className="w-full lg:w-[55%] flex flex-col gap-4">
          <div className="relative bg-surface-container-low rounded-2xl overflow-hidden ambient-shadow border border-outline-variant/30">
            {/* Scrollable image strip */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none aspect-[4/5] md:aspect-square"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {images.map((src, i) => (
                <div key={i} className="flex-shrink-0 w-full h-full snap-start cursor-zoom-in group" onClick={() => setZoomedIndex(i)}>
                  <img
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Zoom Hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                    <span className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full font-label-md text-sm flex items-center gap-2 shadow-lg">
                      <span className="material-symbols-outlined text-[18px]">zoom_in</span> Click to enlarge
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow buttons (desktop) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => scroll(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm hidden md:block"
                >
                  <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button
                  onClick={() => scroll(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm hidden md:block"
                >
                  <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>
              </>
            )}

            {/* Image count badge */}
            {images.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-label-md shadow-md border border-white/10">
                {activeIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-2 scrollbar-none px-1">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIndex(i);
                    scrollRef.current?.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: 'smooth' });
                  }}
                  className={`relative flex-shrink-0 w-20 md:w-24 aspect-[4/5] rounded-xl overflow-hidden transition-all duration-300 ${
                    i === activeIndex ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface scale-100 opacity-100' : 'opacity-60 hover:opacity-100 scale-95'
                  }`}
                >
                  <img src={src} alt={`Thumbnail ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-[45%] flex flex-col gap-8 py-2 md:py-6">
          <div className="flex flex-col gap-3">
            <span className="inline-block font-label-md text-label-md text-primary/70 uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-full text-xs w-fit">
              {product.category}
            </span>
            <h1 className="font-headline-lg text-[32px] md:text-[40px] text-on-surface leading-tight">
              {product.name}
            </h1>
          </div>

          {product.description && (
            <p className="font-body-lg text-on-surface-variant leading-relaxed text-lg">
              {product.description}
            </p>
          )}

          <div className="h-px bg-outline-variant/30" />

          {/* Sizes Selection */}
          {sizes.length > 0 && (
            <div className="flex flex-col gap-4">
              <label className="font-label-md text-on-surface flex items-center gap-2 text-sm uppercase tracking-wider">
                Select Size <span className="text-error">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl font-label-md transition-all duration-300 border ${
                      selectedSize === size
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                        : 'bg-surface text-on-surface border-outline-variant/50 hover:border-primary/50 hover:bg-surface-container-low'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Checkout Action */}
          <div className="mt-4 flex flex-col gap-4 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
            <h3 className="font-label-lg text-on-surface uppercase tracking-wider">Purchase Options</h3>
            <p className="font-body-md text-secondary text-sm">
              Add multiple items to your cart, or check out directly via WhatsApp for personalized service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 font-label-lg text-[14px] px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md ${
                  sizes.length > 0 && !selectedSize
                    ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70'
                    : addedMessage
                    ? 'bg-green-600 text-white'
                    : 'bg-surface text-primary border border-primary hover:bg-primary/5 hover:shadow-lg'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {addedMessage ? 'check_circle' : 'add_shopping_cart'}
                </span>
                {addedMessage ? 'Added!' : 'Add to Cart'}
              </button>

              <a
                href={sizes.length > 0 && !selectedSize ? '#' : waLink(product, selectedSize, activeIndex)}
                target={sizes.length > 0 && !selectedSize ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 font-label-lg text-[14px] px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md ${
                  sizes.length > 0 && !selectedSize
                    ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed border border-outline-variant/30 opacity-70'
                    : 'bg-primary hover:bg-primary/90 text-white hover:shadow-[0_8px_25px_rgba(77,2,26,0.4)] hover:-translate-y-0.5'
                }`}
                onClick={e => {
                  if (sizes.length > 0 && !selectedSize) {
                    e.preventDefault();
                    alert('Please select a size before ordering.');
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Direct WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox for zooming */}
      {zoomedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={() => setZoomedIndex(null)}
        >
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setZoomedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1)); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors backdrop-blur-sm z-10 hidden md:block"
              >
                <span className="material-symbols-outlined text-4xl">chevron_left</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setZoomedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0)); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors backdrop-blur-sm z-10 hidden md:block"
              >
                <span className="material-symbols-outlined text-4xl">chevron_right</span>
              </button>
            </>
          )}

          <button
            onClick={() => setZoomedIndex(null)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-colors z-10"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          <img
            src={images[zoomedIndex]}
            alt={`${product.name} zoomed view ${zoomedIndex + 1}`}
            className="max-w-full max-h-full object-contain cursor-zoom-out select-none shadow-2xl"
            onClick={(e) => { e.stopPropagation(); setZoomedIndex(null); }}
          />

          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/90 font-label-md bg-black/60 px-6 py-2 rounded-full backdrop-blur-sm shadow-xl border border-white/10 text-lg">
              {zoomedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
