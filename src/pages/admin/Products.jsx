import { useState, useEffect } from 'react';
import { getProducts, addProduct, toggleStockStatus, deleteProduct } from '../../utils/productStore';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', description: '', imagesInput: '' });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.imagesInput) return;

    const imagesArray = newProduct.imagesInput.split(',').map(url => url.trim()).filter(url => url !== '');
    const productToSave = {
      ...newProduct,
      img: imagesArray[0],
      images: imagesArray,
    };
    delete productToSave.imagesInput;

    try {
      setSaving(true);
      await addProduct(productToSave);
      await loadProducts();
      setIsAdding(false);
      setNewProduct({ name: '', category: '', description: '', imagesInput: '' });
    } catch (err) {
      alert('Error saving product: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStock = async (id) => {
    try {
      await toggleStockStatus(id);
      await loadProducts();
    } catch (err) {
      alert('Error updating stock: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('Error deleting product: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="font-display-lg text-[32px] text-primary">Products</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white font-label-md px-6 py-3 rounded-full uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 ambient-shadow"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface rounded-xl ambient-shadow p-6 border border-outline-variant/30">
          <h3 className="font-headline-md text-primary mb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block font-label-md text-on-surface mb-2">Image URLs (comma separated)</label>
              <textarea
                required
                value={newProduct.imagesInput}
                onChange={e => setNewProduct({...newProduct, imagesInput: e.target.value})}
                placeholder="https://image1.jpg, https://image2.jpg"
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg h-24 resize-y"
              />
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Product Name</label>
              <input
                type="text"
                required
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Category</label>
              <select
                required
                value={newProduct.category}
                onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg bg-surface text-on-surface"
              >
                <option value="" disabled>Select a category</option>
                <option value="Madisars">Madisars</option>
                <option value="Ladies">Ladies</option>
                <option value="Mens">Mens</option>
                <option value="Kids">Kids</option>
                <option value="Jewellery">Jewellery</option>
                <option value="Home Decor">Home Decor</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block font-label-md text-on-surface mb-2">Product Description</label>
              <textarea
                required
                value={newProduct.description}
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg h-24 resize-y bg-surface text-on-surface"
              />
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg font-label-md disabled:opacity-60">
                {saving ? 'Saving…' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="bg-error/10 text-error px-4 py-3 rounded-lg font-body-md flex items-center gap-2">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      <div className="bg-surface rounded-xl ambient-shadow border border-outline-variant/30 overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 bg-surface border-outline-variant/50 rounded-lg text-on-surface focus:ring-primary focus:border-primary w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center gap-3 text-secondary">
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
            Loading products…
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low font-label-md text-secondary uppercase tracking-wider">
                  <th className="p-4 border-b border-outline-variant/30 w-16"></th>
                  <th className="p-4 border-b border-outline-variant/30">Name</th>
                  <th className="p-4 border-b border-outline-variant/30">Category</th>
                  <th className="p-4 border-b border-outline-variant/30">Description</th>
                  <th className="p-4 border-b border-outline-variant/30">Stock Status</th>
                  <th className="p-4 border-b border-outline-variant/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className={`hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-0 ${!p.inStock ? 'opacity-50' : ''}`}>
                    <td className="p-4">
                      <img src={p.images && p.images.length > 0 ? p.images[0] : p.img} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
                    </td>
                    <td className="p-4 font-body-md text-on-surface">{p.name}</td>
                    <td className="p-4 text-on-surface-variant">{p.category}</td>
                    <td className="p-4 text-on-surface">{p.description}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStock(p.id)}
                        className={`px-3 py-1 rounded-full font-label-md text-[10px] uppercase tracking-wider ${
                          !p.inStock ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#e4e2dd] text-[#1b1c19]'
                        }`}
                      >
                        {p.inStock ? 'In Stock' : 'No Stock'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-error hover:bg-error/10 p-2 rounded-full transition-colors ml-2"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-secondary font-body-md">
                      No products yet. Add your first product above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
