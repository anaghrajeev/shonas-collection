import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const WHATSAPP_NUMBER = '919656777404';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let text = `Hello Shona's Collection! ✨\n\nI would like to place an order for the following items:\n\n`;

    cart.forEach((item, index) => {
      const websiteUrl = `${window.location.origin}/product/${item.product.id}?variant=${item.variantIndex}`;
      text += `${index + 1}. 🛍️ *Product:* ${item.product.name}\n`;
      if (item.size) text += `   📏 *Size:* ${item.size}\n`;
      text += `   📦 *Quantity:* ${item.quantity}\n`;
      text += `   🔗 *Variant:* ${websiteUrl}\n\n`;
    });

    text += `*(Note: Please click the 'Send' button below to submit this order inquiry.)*`;

    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waLink, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 flex flex-col items-center justify-center gap-6 animate-fade-in">
        <span className="material-symbols-outlined text-6xl text-secondary opacity-50">shopping_cart</span>
        <h2 className="font-display-md text-2xl text-on-surface">Your cart is empty</h2>
        <p className="font-body-md text-secondary max-w-md text-center">
          Looks like you haven't added anything to your cart yet. Explore our collections to find something beautiful!
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 bg-primary text-white px-8 py-3 rounded-full font-label-md uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-md"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-16 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display-lg text-3xl md:text-4xl text-primary">Shopping Cart</h1>
        <span className="font-label-md text-secondary">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Cart Items List */}
        <div className="flex-1 flex flex-col gap-6">
          {cart.map((item, index) => {
            const imageSrc = item.product.images?.length > item.variantIndex 
              ? item.product.images[item.variantIndex] 
              : item.product.img;

            return (
              <div key={`${item.product.id}-${item.size}-${item.variantIndex}-${index}`} className="flex flex-col sm:flex-row gap-4 p-4 md:p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30 ambient-shadow items-start sm:items-center">
                
                {/* Product Image */}
                <Link to={`/product/${item.product.id}?variant=${item.variantIndex}`} className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-surface rounded-xl overflow-hidden hover:opacity-80 transition-opacity">
                  <img src={imageSrc} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col gap-1 sm:gap-2 w-full">
                  <p className="font-label-md text-[11px] text-primary/70 uppercase tracking-widest">{item.product.category}</p>
                  <Link to={`/product/${item.product.id}?variant=${item.variantIndex}`} className="font-headline-md text-lg text-on-surface hover:text-primary transition-colors">
                    {item.product.name}
                  </Link>
                  {item.size && (
                    <p className="font-body-sm text-secondary">Size: <span className="font-label-md text-on-surface">{item.size}</span></p>
                  )}
                </div>

                {/* Controls (Quantity & Remove) */}
                <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-none border-outline-variant/30 pt-4 sm:pt-0">
                  <div className="flex items-center gap-3 bg-surface px-3 py-1.5 rounded-lg border border-outline-variant/50">
                    <button 
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="text-secondary hover:text-primary transition-colors disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <span className="material-symbols-outlined text-[20px]">remove</span>
                    </button>
                    <span className="font-label-md w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(index)}
                    className="text-error/80 hover:text-error hover:bg-error/10 p-2 rounded-full transition-colors flex items-center justify-center"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary / Checkout Column */}
        <div className="w-full lg:w-[350px] flex-shrink-0">
          <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/30 ambient-shadow sticky top-24 flex flex-col gap-6">
            <h2 className="font-headline-md text-xl text-primary border-b border-outline-variant/30 pb-4">Order Summary</h2>
            
            <div className="flex justify-between items-center font-body-md text-on-surface">
              <span>Total Items</span>
              <span className="font-label-md">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            
            <p className="font-body-sm text-secondary italic border-b border-outline-variant/30 pb-6">
              Prices will be confirmed directly on WhatsApp as they may vary based on customization and shipping.
            </p>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full flex items-center justify-center gap-3 font-label-lg text-label-lg px-6 py-4 rounded-xl transition-all duration-300 shadow-md bg-primary hover:bg-primary/90 text-white hover:shadow-[0_8px_25px_rgba(77,2,26,0.4)] hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
