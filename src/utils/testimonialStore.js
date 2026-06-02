import { supabase } from '../lib/supabase';

function mapTestimonial(row) {
  return {
    id: row.id,
    name: row.name,
    videoUrl: row.videoUrl, // Make sure your Supabase column is named 'videoUrl' (case-sensitive) or update this accordingly
    created_at: row.created_at,
  };
}

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data.map(mapTestimonial);
}

export async function addTestimonial(testimonial) {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([{
      name: testimonial.name,
      videoUrl: testimonial.videoUrl,
    }])
    .select();
    
  if (error) throw error;
  return data.map(mapTestimonial)[0];
}

export async function deleteTestimonial(id) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
}
