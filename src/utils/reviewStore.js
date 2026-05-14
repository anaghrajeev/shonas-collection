// Utility for managing review data via Supabase
import { supabase } from '../lib/supabase';

function mapReview(row) {
  return {
    id: row.id,
    rating: row.rating,
    text: row.text,
    name: row.name,
    loc: row.loc,
    created_at: row.created_at,
  };
}

export async function getReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data.map(mapReview);
}

export async function addReview(review) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{
      rating: review.rating,
      text: review.text,
      name: review.name,
      loc: review.loc,
    }])
    .select();
  if (error) throw error;
  return data.map(mapReview);
}

export async function deleteReview(reviewId) {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId);
  if (error) throw error;
}
