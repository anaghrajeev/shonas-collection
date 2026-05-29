import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../utils/productStore';

const WHATSAPP_NUMBER = '919656777404';

function waLink(productName) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I am interested in your product: ${productName}`)}`;
}

// ── Product Detail Modal ────────────────────────────────────────────────────
function ProductModal({ product, onClose }) {
  const scrollRef = useRef(null);
  const images = product.images?.length ? product.images : [product.img].filter(Boolean);
  const [zoomedIndex, setZoomedIndex] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { 
      if (e.key === 'Escape') {
        setZoomedIndex(prev => {
          if (prev !== null) return null;
          onClose();
          return prev;
        });
      }
      if (e.key === 'ArrowLeft') {
        setZoomedIndex(prev => {
          if (prev !== null) return prev > 0 ? prev - 1 : images.length - 1;
          return prev;
        });
      }
      if (e.key === 'ArrowRight') {
        setZoomedIndex(prev => {
          if (prev !== null) return prev < images.length - 1 ? prev + 1 : 0;
          return prev;
        });
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, images.length]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * scrollRef.current.offsetWidth * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Image Gallery */}
        <div className="relative bg-surface-container-low rounded-t-2xl overflow-hidden">
          {/* Scrollable image strip */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-full snap-start aspect-[4/3] cursor-zoom-in" onClick={() => setZoomedIndex(i)}>
                <img
                  src={src}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Arrow buttons (only if more than 1 image) */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => scroll(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors backdrop-blur-sm"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                onClick={() => scroll(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors backdrop-blur-sm"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollRef.current?.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: 'smooth' })}
                    className="w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-colors"
                  />
                ))}
              </div>
            </>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-sm transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          {/* Image count badge */}
          {images.length > 1 && (
            <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-label-md">
              {images.length} photos
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 md:p-8 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block font-label-md text-label-md text-primary/70 uppercase tracking-widest mb-1 border border-primary/30 px-2 py-0.5 rounded-full text-[11px]">
                {product.category}
              </span>
              <h2 className="font-headline-lg text-[24px] text-on-surface mt-1 leading-tight">{product.name}</h2>
            </div>
          </div>

          {product.description && (
            <p className="font-body-lg text-on-surface-variant leading-relaxed">{product.description}</p>
          )}

          <div className="h-px bg-outline-variant/30" />

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white font-label-lg text-label-lg px-6 py-3.5 rounded-xl transition-colors shadow-md hover:shadow-[0_4px_20px_rgba(77,2,26,0.4)]"
              onClick={e => e.stopPropagation()}
            >
              {/* WhatsApp icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Shop Now on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {zoomedIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={() => setZoomedIndex(null)}
        >
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setZoomedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1)); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors backdrop-blur-sm z-10"
              >
                <span className="material-symbols-outlined text-3xl">chevron_left</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setZoomedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0)); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors backdrop-blur-sm z-10"
              >
                <span className="material-symbols-outlined text-3xl">chevron_right</span>
              </button>
            </>
          )}

          <button
            onClick={() => setZoomedIndex(null)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm transition-colors z-10"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          <img
            src={images[zoomedIndex]}
            alt={`${product.name} zoomed view ${zoomedIndex + 1}`}
            className="max-w-full max-h-full object-contain cursor-zoom-out select-none shadow-2xl"
            onClick={(e) => { e.stopPropagation(); setZoomedIndex(null); }}
          />

          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-label-md bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
              {zoomedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Product Card ────────────────────────────────────────────────────────────
function ProductCard({ product, onClick }) {
  const images = product.images?.length ? product.images : [product.img].filter(Boolean);

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-surface ambient-shadow cursor-pointer hover:shadow-[0_0_24px_rgba(106,26,46,0.18)] transition-all duration-300 flex flex-col"
      onClick={onClick}
    >
      {/* Image area */}
      <div className="aspect-[3/4] overflow-hidden relative bg-surface-container flex-shrink-0">
        <img
          src={images[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${images.length > 1 ? 'group-hover:opacity-0' : ''}`}
        />
        {images.length > 1 && (
          <img
            src={images[1]}
            alt={`${product.name} alternate`}
            className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:scale-105"
          />
        )}
        {/* Image count badge */}
        {images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full font-label-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-[12px]">photo_library</span>
            {images.length}
          </div>
        )}
        {/* Expand hint overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg">open_in_full</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-surface flex flex-col gap-3 flex-1">
        <div className="text-center">
          <p className="font-label-md text-[11px] text-primary/60 uppercase tracking-widest mb-1">{product.category}</p>
          <h3 className="font-headline-md text-[17px] text-on-surface group-hover:text-primary transition-colors leading-snug">{product.name}</h3>
          {product.description && (
            <p className="font-body-md text-secondary text-sm mt-1.5 line-clamp-2">{product.description}</p>
          )}
        </div>

        {/* Explore button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="mt-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-label-md text-[13px] uppercase tracking-widest px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_4px_15px_rgba(77,2,26,0.4)]"
        >
          Explore
        </button>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(all => setProducts(all.filter(p => p.inStock !== false)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Normalize URL param: "navratri-specials" → "navratri specials" to match DB values
  const normalizedFilter = categoryFilter?.toLowerCase().replace(/-/g, ' ');
  const filteredProducts = normalizedFilter
    ? products.filter(p => p.category.toLowerCase() === normalizedFilter)
    : products;

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <h1 className="font-display-lg text-display-lg text-primary mb-8 capitalize">
        {categoryFilter ? categoryFilter.replace('-', ' ') : 'All Products'}
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-24 gap-3 text-secondary">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          Loading products…
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-secondary">
          <span className="material-symbols-outlined text-5xl opacity-40">inventory_2</span>
          <p className="font-body-lg">No products available in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => setSelectedProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Product detail modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
