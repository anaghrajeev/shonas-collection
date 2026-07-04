import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../../utils/productStore';

// ── Product Card ────────────────────────────────────────────────────────────
function ProductCard({ product, onClick }) {
  const images = product.images?.length ? product.images : [product.img].filter(Boolean);

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-surface ambient-shadow cursor-pointer hover:shadow-[0_0_24px_rgba(106,26,46,0.18)] transition-all duration-300 flex flex-col h-full"
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
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 animate-fade-in">
      <h1 className="font-display-lg text-[28px] md:text-display-lg text-primary mb-6 md:mb-8 capitalize">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => navigate(`/product/${p.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
