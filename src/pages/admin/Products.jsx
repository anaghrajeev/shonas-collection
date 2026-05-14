import { useState, useEffect } from 'react';
import { getProducts, addProduct, toggleStockStatus, deleteProduct, updateProduct } from '../../utils/productStore';

const CATEGORIES = ['Madisars', 'Ladies', 'Mens', 'Kids', 'Jewellery', 'Home Decor'];

const emptyForm = { name: '', category: '', description: '', imagesInput: '' };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add panel
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // Edit modal
  const [editingProduct, setEditingProduct] = useState(null); // full product object
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

  // ── Add ──────────────────────────────────────────────
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.imagesInput) return;
    const imagesArray = newProduct.imagesInput.split(',').map(u => u.trim()).filter(Boolean);
    try {
      setSaving(true);
      await addProduct({ ...newProduct, img: imagesArray[0], images: imagesArray });
      await loadProducts();
      setIsAdding(false);
      setNewProduct(emptyForm);
    } catch (err) {
      alert('Error saving product: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Edit ─────────────────────────────────────────────
  function openEdit(product) {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      description: product.description,
      imagesInput: (product.images || []).join(', '),
    });
  }

  function closeEdit() {
    setEditingProduct(null);
    setEditForm(emptyForm);
  }

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const imagesArray = editForm.imagesInput.split(',').map(u => u.trim()).filter(Boolean);
    try {
      setEditSaving(true);
      await updateProduct(editingProduct.id, {
        name: editForm.name,
        category: editForm.category,
        description: editForm.description,
        images: imagesArray,
        img: imagesArray[0] || '',
      });
      await loadProducts();
      closeEdit();
    } catch (err) {
      alert('Error updating product: ' + err.message);
    } finally {
      setEditSaving(false);
    }
  };

  // ── Stock / Delete ────────────────────────────────────
  const handleToggleStock = async (id) => {
    try { await toggleStockStatus(id); await loadProducts(); }
    catch (err) { alert('Error updating stock: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try { await deleteProduct(id); setProducts(prev => prev.filter(p => p.id !== id)); }
    catch (err) { alert('Error deleting product: ' + err.message); }
  };

  // ── Shared form fields renderer ───────────────────────
  function FormFields({ values, onChange }) {
    return (
      <>
        <div className="md:col-span-2">
          <label className="block font-label-md text-on-surface mb-2">Image URLs (comma separated)</label>
          <textarea
            required
            value={values.imagesInput}
            onChange={e => onChange({ ...values, imagesInput: e.target.value })}
            placeholder="https://image1.jpg, https://image2.jpg"
            className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg h-24 resize-y bg-surface text-on-surface"
          />
        </div>
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
          <h3 className="font-headline-md text-primary mb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFields values={newProduct} onChange={setNewProduct} />
            <div className="md:col-span-2 mt-2">
              <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg font-label-md disabled:opacity-60">
                {saving ? 'Saving…' : 'Save Product'}
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

      {/* Table */}
      <div className="bg-surface rounded-xl ambient-shadow border border-outline-variant/30 overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input type="text" placeholder="Search products…" className="pl-10 pr-4 py-2 bg-surface border border-outline-variant/50 rounded-lg text-on-surface w-64" />
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center gap-3 text-secondary">
            <span className="material-symbols-outlined animate-spin">progress_activity</span>Loading products…
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
                  <th className="p-4 border-b border-outline-variant/30">Stock</th>
                  <th className="p-4 border-b border-outline-variant/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className={`hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-0 ${!p.inStock ? 'opacity-50' : ''}`}>
                    <td className="p-4">
                      <img src={p.images?.[0] || p.img} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
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
                      {/* Edit */}
                      <button
                        onClick={() => openEdit(p)}
                        title="Edit product"
                        className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(p.id)}
                        title="Delete product"
                        className="text-error hover:bg-error/10 p-2 rounded-full transition-colors ml-1"
                      >
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
        )}
      </div>

      {/* ── Edit Modal ── */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeEdit}>
          <div
            className="bg-surface rounded-2xl ambient-shadow w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 flex flex-col gap-6"
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
            <form onSubmit={handleEditProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFields values={editForm} onChange={setEditForm} />
              <div className="md:col-span-2 flex gap-3 mt-2">
                <button
                  type="submit"
                  disabled={editSaving}
                  className="bg-primary text-white px-8 py-2 rounded-lg font-label-md disabled:opacity-60 flex items-center gap-2"
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
