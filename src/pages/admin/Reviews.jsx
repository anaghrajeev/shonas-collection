import { useState, useEffect } from 'react';
import { getReviews, addReview, deleteReview } from '../../utils/reviewStore';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [newReview, setNewReview] = useState({ text: '', name: '', loc: '', rating: 5 });

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      setLoading(true);
      setError(null);
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      setError('Failed to load reviews. ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.text || !newReview.name) return;
    try {
      setSaving(true);
      await addReview(newReview);
      await loadReviews();
      setIsAdding(false);
      setNewReview({ text: '', name: '', loc: '', rating: 5 });
    } catch (err) {
      alert('Error saving review: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert('Error deleting review: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="font-display-lg text-[32px] text-primary">Customer Reviews</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white font-label-md px-6 py-3 rounded-full uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 ambient-shadow"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? 'Cancel' : 'Add Review'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface rounded-xl ambient-shadow p-6 border border-outline-variant/30">
          <h3 className="font-headline-md text-primary mb-4">Add New Review</h3>
          <form onSubmit={handleAddReview} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block font-label-md text-on-surface mb-2">Review Text</label>
              <textarea
                required
                value={newReview.text}
                onChange={e => setNewReview({...newReview, text: e.target.value})}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg h-24 resize-none"
                placeholder="What did the customer say?"
              />
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Customer Name</label>
              <input
                type="text"
                required
                value={newReview.name}
                onChange={e => setNewReview({...newReview, name: e.target.value})}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Location (e.g. UK, Bangalore)</label>
              <input
                type="text"
                value={newReview.loc}
                onChange={e => setNewReview({...newReview, loc: e.target.value})}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Rating (out of 5)</label>
              <select
                value={newReview.rating}
                onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg bg-surface"
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg font-label-md disabled:opacity-60">
                {saving ? 'Saving…' : 'Save Review'}
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

      {loading ? (
        <div className="p-12 flex items-center justify-center gap-3 text-secondary">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          Loading reviews…
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="bg-surface p-6 rounded-xl ambient-shadow border border-outline-variant/30 flex flex-col gap-4 relative group h-[320px]">
              <button
                onClick={() => handleDelete(r.id)}
                className="absolute top-4 right-4 text-error hover:bg-error/10 p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 z-10"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
              <div className="flex text-[#FBBC04]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: i < (r.rating || 5) ? "'FILL' 1" : "'FILL' 0", opacity: i < (r.rating || 5) ? 1 : 0.3 }}>star</span>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto pr-2">
                <p className="font-body-md text-on-surface-variant italic leading-relaxed">"{r.text}"</p>
              </div>
              <div className="mt-auto pt-4 border-t border-outline-variant/30">
                <p className="font-label-lg text-primary">{r.name}</p>
                <p className="font-label-md text-secondary">{r.loc}</p>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="col-span-3 text-center text-secondary font-body-md py-8">No reviews yet. Add the first one above.</p>
          )}
        </div>
      )}
    </div>
  );
}
