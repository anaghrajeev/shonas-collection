import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../utils/productStore';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Only show items that are in stock
    const allProducts = getProducts();
    setProducts(allProducts.filter(p => p.inStock !== false));
  }, []);

  const filteredProducts = categoryFilter ? products.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase()) : products;

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <h1 className="font-display-lg text-display-lg text-primary mb-8 capitalize">{categoryFilter ? categoryFilter.replace('-', ' ') : 'All Products'}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(p => (
          <a 
            key={p.id} 
            href={`https://wa.me/919656777404?text=Hi, I am interested in your product: ${encodeURIComponent(p.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-xl overflow-hidden bg-surface ambient-shadow block cursor-pointer hover:shadow-[0_0_20px_rgba(106,26,46,0.15)] transition-all duration-300"
          >
            <div className="aspect-[3/4] overflow-hidden relative bg-surface-container">
              <img 
                src={p.images && p.images.length > 0 ? p.images[0] : p.img} 
                alt={p.name} 
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${p.images && p.images.length > 1 ? 'group-hover:opacity-0' : ''}`} 
              />
              {p.images && p.images.length > 1 && (
                <img 
                  src={p.images[1]} 
                  alt={`${p.name} alternate view`} 
                  className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:scale-105" 
                />
              )}
            </div>
            <div className="p-4 bg-surface text-center">
              <h3 className="font-headline-md text-[18px] text-on-surface mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="font-body-md text-secondary">{p.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
