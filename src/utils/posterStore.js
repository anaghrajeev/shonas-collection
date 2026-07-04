import { supabase } from '../lib/supabase';

function mapPoster(row) {
  return {
    id: row.id,
    imageUrl: row.imageUrl, // URL of the image
    created_at: row.created_at,
  };
}

export async function getPosters() {
  const { data, error } = await supabase
    .from('posters')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data.map(mapPoster);
}

export async function addPoster(poster) {
  const { data, error } = await supabase
    .from('posters')
    .insert([{
      imageUrl: poster.imageUrl,
    }])
    .select();
    
  if (error) throw error;
  return data.map(mapPoster)[0];
}

export async function deletePoster(id) {
  const { error } = await supabase
    .from('posters')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
}
