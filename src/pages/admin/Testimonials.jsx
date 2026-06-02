import { useState, useEffect } from 'react';
import { getTestimonials, addTestimonial, deleteTestimonial } from '../../utils/testimonialStore';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', videoUrl: '' });

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      setError('Failed to load testimonials. ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!newTestimonial.videoUrl || !newTestimonial.name) return;
    try {
      setSaving(true);
      await addTestimonial(newTestimonial);
      await loadTestimonials();
      setIsAdding(false);
      setNewTestimonial({ name: '', videoUrl: '' });
    } catch (err) {
      alert('Error saving testimonial: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial video?')) return;
    try {
      await deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      alert('Error deleting testimonial: ' + err.message);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    
    // Handle YouTube links
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    
    // Return original url if not youtube
    return url;
  };

  const isYouTube = (url) => {
    return !!url?.match(/(?:youtu\.be\/|youtube\.com\/)/);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="font-display-lg text-[32px] text-primary">Testimonial Videos</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white font-label-md px-6 py-3 rounded-full uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 ambient-shadow"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? 'Cancel' : 'Add Video'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface rounded-xl ambient-shadow p-6 border border-outline-variant/30">
          <h3 className="font-headline-md text-primary mb-4">Add New Testimonial Video</h3>
          <form onSubmit={handleAddTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md text-on-surface mb-2">Customer Name</label>
              <input
                type="text"
                required
                value={newTestimonial.name}
                onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg"
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Video Link (MP4 or YouTube URL)</label>
              <input
                type="url"
                required
                value={newTestimonial.videoUrl}
                onChange={e => setNewTestimonial({...newTestimonial, videoUrl: e.target.value})}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg font-label-md disabled:opacity-60">
                {saving ? 'Saving…' : 'Save Video'}
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
          Loading videos…
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-surface p-5 rounded-xl ambient-shadow border border-outline-variant/30 flex flex-col gap-4 relative group">
              <button
                onClick={() => handleDelete(t.id)}
                className="absolute top-4 right-4 text-error hover:bg-error/10 p-2 rounded-full transition-colors z-10 bg-surface/80 backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
              
              <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden bg-black flex items-center justify-center group-hover:shadow-md transition-shadow">
                {isYouTube(t.videoUrl) ? (
                  <iframe 
                    src={getEmbedUrl(t.videoUrl)} 
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${t.name} testimonial`}
                  />
                ) : (
                  <video 
                    src={t.videoUrl} 
                    controls 
                    className="absolute inset-0 w-full h-full object-cover"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              
              <div className="mt-auto pt-4 border-t border-outline-variant/30">
                <p className="font-label-lg text-primary">{t.name}</p>
                <p className="font-label-sm text-secondary truncate mt-1" title={t.videoUrl}>
                  {t.videoUrl}
                </p>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <p className="col-span-3 text-center text-secondary font-body-md py-8">No testimonial videos yet. Add the first one above.</p>
          )}
        </div>
      )}
    </div>
  );
}
