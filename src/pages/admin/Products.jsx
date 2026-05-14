import { useState, useEffect } from 'react';
import { getProducts, addProduct, toggleStockStatus, deleteProduct, updateProduct } from '../../utils/productStore';

const CATEGORIES = ['Madisars', 'Ladies', 'Mens', 'Kids', 'Jewellery', 'Home Decor', 'Navratri Specials'];

const emptyForm = { name: '', category: '', description: '', images: [''] };

// ── Image URL input list ──────────────────────────────────────────────────
function ImageUrlsInput({ images, onChange }) {
  const updateUrl = (index, value) => {
    const next = [...images];
    next[index] = value;
    onChange(next);
  };

  const addUrl = () => onChange([...images, '']);

  const removeUrl = (index) => {
    const next = images.filter((_, i) => i !== index);
    onChange(next.length ? next : ['']);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="block font-label-md text-on-surface">
        Product Images
        <span className="ml-2 font-body-md text-[11px] text-secondary normal-case tracking-normal">
          (first image is the cover photo)
        </span>
      </label>

      {images.map((url, index) => (
        <div key={index} className="flex items-center gap-3">
          {/* Thumbnail preview */}
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/30 flex-shrink-0">
            {url ? (
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="material-symbols-outlined text-outline/50 text-[20px]">image</span>
              </div>
            )}
          </div>

          {/* URL input */}
          <div className="flex-1 relative">
            <input
              type="url"
              value={url}
              onChange={e => updateUrl(index, e.target.value)}
              placeholder={index === 0 ? 'https://cover-image-url.jpg' : `https://image-${index + 1}-url.jpg`}
              className="w-full px-3 py-2 border border-outline-variant/50 rounded-lg bg-surface text-on-surface text-sm pr-8"
            />
            {index === 0 && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-label-md text-primary/50 uppercase tracking-wider pointer-events-none">
                Cover
              </span>
            )}
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={() => removeUrl(index)}
            disabled={images.length === 1 && index === 0}
            title="Remove image"
            className="text-error hover:bg-error/10 p-1.5 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      ))}

      {/* Add image button */}
      <button
        type="button"
        onClick={addUrl}
        className="flex items-center gap-2 text-primary hover:bg-primary/5 px-3 py-2 rounded-lg border border-dashed border-primary/40 hover:border-primary transition-all font-label-md text-sm self-start"
      >
        <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
        Add Another Image
      </button>
    </div>
  );
}

// ── Shared text fields ────────────────────────────────────────────────────
function TextFields({ values, onChange }) {
  return (
    <>
      <div>
        <label className="block font-label-md text-on-surface mb-2">Product Name</label>
        <input
          type="text" required
          value={values.name}
          onChange={e => onChange({ ...values, name: e.target.value })}
          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg bg-surface text-on-surface"
        />
      </div>
      <div>
        <label className="block font-label-md text-on-surface mb-2">Category</label>
        <select
          required
          value={values.category}
          onChange={e => onChange({ ...values, category: e.target.value })}
          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg bg-surface text-on-surface"
        >
          <option value="" disabled>Select a category</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block font-label-md text-on-surface mb-2">Product Description</label>
        <textarea
          required
          value={values.description}
          onChange={e => onChange({ ...values, description: e.target.value })}
          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg h-24 resize-y bg-surface text-on-surface"
        />
      </div>
    </>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add panel
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // Edit modal
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => { loadProducts(); }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);
      setProducts(await getProducts());
    } catch (err) {
      setError('Failed to load products. ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Add ────────────────────────────────────────────────
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const cleanImages = newProduct.images.map(u => u.trim()).filter(Boolean);
    if (!newProduct.name || cleanImages.length === 0) return;

    try {
      setSaving(true);
      await addProduct({ ...newProduct, images: cleanImages, img: cleanImages[0] });
      await loadProducts();
      setIsAdding(false);
      setNewProduct(emptyForm);
    } catch (err) {
      alert('Error saving product: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Edit ──────────────────────────────────────────────
  function openEdit(product) {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      description: product.description,
      images: product.images?.length ? product.images : [product.img || ''],
    });
  }

  function closeEdit() {
    setEditingProduct(null);
    setEditForm(emptyForm);
  }

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const cleanImages = editForm.images.map(u => u.trim()).filter(Boolean);
    if (cleanImages.length === 0) return;

    try {
      setEditSaving(true);
      await updateProduct(editingProduct.id, {
        name: editForm.name,
        category: editForm.category,
        description: editForm.description,
        images: cleanImages,
        img: cleanImages[0],
      });
      await loadProducts();
      closeEdit();
    } catch (err) {
      alert('Error updating product: ' + err.message);
    } finally {
      setEditSaving(false);
    }
  };

  // ── Stock / Delete ─────────────────────────────────────
  const handleToggleStock = async (id) => {
    try { await toggleStockStatus(id); await loadProducts(); }
    catch (err) { alert('Error updating stock: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try { await deleteProduct(id); setProducts(prev => prev.filter(p => p.id !== id)); }
    catch (err) { alert('Error deleting product: ' + err.message); }
  };

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-display-lg text-[32px] text-primary">Products</h2>
        <button
          onClick={() => { setIsAdding(!isAdding); setNewProduct(emptyForm); }}
          className="bg-primary text-white font-label-md px-6 py-3 rounded-full uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 ambient-shadow"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {/* Add form */}
      {isAdding && (
        <div className="bg-surface rounded-xl ambient-shadow p-6 border border-outline-variant/30">
          <h3 className="font-headline-md text-primary mb-6">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="flex flex-col gap-6">
            {/* Image URLs */}
            <ImageUrlsInput
              images={newProduct.images}
              onChange={imgs => setNewProduct({ ...newProduct, images: imgs })}
            />
            <div className="h-px bg-outline-variant/20" />
            {/* Text fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextFields values={newProduct} onChange={setNewProduct} />
            </div>
            <div>
              <button type="submit" disabled={saving} className="bg-primary text-white px-8 py-2.5 rounded-lg font-label-md disabled:opacity-60 flex items-center gap-2">
                {saving
                  ? <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Saving…</>
                  : <><span className="material-symbols-outlined text-sm">check</span>Save Product</>
                }
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-error/10 text-error px-4 py-3 rounded-lg font-body-md flex items-center gap-2">
          <span className="material-symbols-outlined">error</span>{error}
        </div>
      )}

      {/* Product List */}
      <div className="bg-surface rounded-xl ambient-shadow border border-outline-variant/30 overflow-hidden">
        {/* Search bar */}
        <div className="p-4 border-b border-outline-variant/30 bg-surface-container-low">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input type="text" placeholder="Search products…" className="pl-10 pr-4 py-2 bg-surface border border-outline-variant/50 rounded-lg text-on-surface w-full md:w-72" />
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center gap-3 text-secondary">
            <span className="material-symbols-outlined animate-spin">progress_activity</span>Loading products…
          </div>
        ) : (
          <>
            {/* ── Mobile: card grid ── */}
            <div className="md:hidden flex flex-col divide-y divide-outline-variant/10">
              {products.map((p) => (
                <div key={p.id} className={`flex items-start gap-3 p-4 ${!p.inStock ? 'opacity-50' : ''}`}>
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <img src={p.images?.[0] || p.img} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
                    {p.images?.length > 1 && (
                      <span className="absolute -bottom-1 -right-1 bg-primary text-white text-[9px] font-label-md rounded-full w-4 h-4 flex items-center justify-center">
                        {p.images.length}
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body-md text-on-surface truncate">{p.name}</p>
                    <p className="font-label-md text-secondary text-xs">{p.category}</p>
                    <p className="font-body-md text-on-surface-variant text-xs mt-1 line-clamp-2">{p.description}</p>
                    {/* Stock toggle */}
                    <button
                      onClick={() => handleToggleStock(p.id)}
                      className={`mt-2 px-3 py-1 rounded-full font-label-md text-[10px] uppercase tracking-wider ${
                        p.inStock ? 'bg-[#e4e2dd] text-[#1b1c19]' : 'bg-[#ffdad6] text-[#93000a]'
                      }`}
                    >
                      {p.inStock ? 'In Stock' : 'No Stock'}
                    </button>
                  </div>
                  {/* Actions */}
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(p)} title="Edit" className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button onClick={() => handleDelete(p.id)} title="Delete" className="text-error hover:bg-error/10 p-2 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <p className="p-8 text-center text-secondary font-body-md">No products yet. Add your first product above.</p>
              )}
            </div>

            {/* ── Desktop: table ── */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low font-label-md text-secondary uppercase tracking-wider">
                    <th className="p-4 border-b border-outline-variant/30 w-16"></th>
                    <th className="p-4 border-b border-outline-variant/30">Name</th>
                    <th className="p-4 border-b border-outline-variant/30">Category</th>
                    <th className="p-4 border-b border-outline-variant/30">Description</th>
                    <th className="p-4 border-b border-outline-variant/30">Stock</th>
                    <th className="p-4 border-b border-outline-variant/30 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className={`hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-0 ${!p.inStock ? 'opacity-50' : ''}`}>
                      <td className="p-4">
                        <div className="relative w-12 h-12">
                          <img src={p.images?.[0] || p.img} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
                          {p.images?.length > 1 && (
                            <span className="absolute -bottom-1 -right-1 bg-primary text-white text-[9px] font-label-md rounded-full w-4 h-4 flex items-center justify-center">
                              {p.images.length}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-body-md text-on-surface">{p.name}</td>
                      <td className="p-4 text-on-surface-variant">{p.category}</td>
                      <td className="p-4 text-on-surface max-w-xs truncate">{p.description}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStock(p.id)}
                          className={`px-3 py-1 rounded-full font-label-md text-[10px] uppercase tracking-wider ${
                            p.inStock ? 'bg-[#e4e2dd] text-[#1b1c19]' : 'bg-[#ffdad6] text-[#93000a]'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'No Stock'}
                        </button>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <button onClick={() => openEdit(p)} title="Edit product" className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button onClick={() => handleDelete(p.id)} title="Delete product" className="text-error hover:bg-error/10 p-2 rounded-full transition-colors ml-1">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr><td colSpan={6} className="p-8 text-center text-secondary font-body-md">No products yet. Add your first product above.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeEdit}>
          <div
            className="bg-surface rounded-2xl ambient-shadow w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-8 flex flex-col gap-6"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={editingProduct.images?.[0] || editingProduct.img} alt={editingProduct.name} className="w-12 h-12 object-cover rounded-lg" />
                <div>
                  <h3 className="font-headline-md text-primary">Edit Product</h3>
                  <p className="font-label-md text-secondary">{editingProduct.name}</p>
                </div>
              </div>
              <button onClick={closeEdit} className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="h-px bg-outline-variant/30" />

            {/* Edit form */}
            <form onSubmit={handleEditProduct} className="flex flex-col gap-6">
              <ImageUrlsInput
                images={editForm.images}
                onChange={imgs => setEditForm({ ...editForm, images: imgs })}
              />
              <div className="h-px bg-outline-variant/20" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextFields values={editForm} onChange={setEditForm} />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={editSaving}
                  className="bg-primary text-white px-8 py-2.5 rounded-lg font-label-md disabled:opacity-60 flex items-center gap-2"
                >
                  {editSaving
                    ? <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Saving…</>
                    : <><span className="material-symbols-outlined text-sm">check</span>Save Changes</>
                  }
                </button>
                <button type="button" onClick={closeEdit} className="border border-outline-variant/50 text-on-surface-variant px-6 py-2 rounded-lg font-label-md hover:bg-surface-container-low transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
