import { useState, useEffect } from 'react';
import { getPosters, addPoster, deletePoster } from '../../utils/posterStore';

export default function Posters() {
  const [posters, setPosters] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [newPosterUrl, setNewPosterUrl] = useState('');

  useEffect(() => {
    loadPosters();
  }, []);

  async function loadPosters() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPosters();
      setPosters(data);
    } catch (err) {
      setError('Failed to load posters. ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddPoster = async (e) => {
    e.preventDefault();
    if (!newPosterUrl) return;
    try {
      setSaving(true);
      await addPoster({ imageUrl: newPosterUrl });
      await loadPosters();
      setIsAdding(false);
      setNewPosterUrl('');
    } catch (err) {
      alert('Error saving poster: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this poster?')) return;
    try {
      await deletePoster(id);
      setPosters(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('Error deleting poster: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="font-display-lg text-[32px] text-primary">Posters</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white font-label-md px-6 py-3 rounded-full uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 ambient-shadow"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? 'Cancel' : 'Add Poster'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface rounded-xl ambient-shadow p-6 border border-outline-variant/30">
          <h3 className="font-headline-md text-primary mb-4">Add New Poster</h3>
          <form onSubmit={handleAddPoster} className="flex flex-col gap-4">
            <div>
              <label className="block font-label-md text-on-surface mb-2">Poster Image URL</label>
              <input
                type="url"
                required
                value={newPosterUrl}
                onChange={e => setNewPosterUrl(e.target.value)}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg"
                placeholder="https://example.com/poster.jpg"
              />
            </div>
            <div className="mt-2">
              <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg font-label-md disabled:opacity-60">
                {saving ? 'Saving…' : 'Save Poster'}
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
          Loading posters…
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posters.map((p) => (
            <div key={p.id} className="bg-surface p-4 rounded-xl ambient-shadow border border-outline-variant/30 flex flex-col gap-4 relative group">
              <button
                onClick={() => handleDelete(p.id)}
                className="absolute top-2 right-2 text-error hover:bg-error/10 p-2 rounded-full transition-colors z-10 bg-surface/80 backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
              
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low flex items-center justify-center group-hover:shadow-md transition-shadow">
                <img 
                  src={p.imageUrl} 
                  alt="Launch Offer Poster"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-auto pt-2 border-t border-outline-variant/30">
                <p className="font-label-sm text-secondary truncate mt-1" title={p.imageUrl}>
                  {p.imageUrl}
                </p>
              </div>
            </div>
          ))}
          {posters.length === 0 && (
            <p className="col-span-full text-center text-secondary font-body-md py-8">No posters yet. Add the first one above.</p>
          )}
        </div>
      )}
    </div>
  );
}
