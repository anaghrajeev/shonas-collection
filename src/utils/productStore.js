// Utility for managing product data via Supabase
import { supabase } from '../lib/supabase';

// Map Supabase snake_case → camelCase for UI compatibility
function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    img: row.img,
    images: row.images || (row.img ? [row.img] : []),
    inStock: row.in_stock,
    created_at: row.created_at,
  };
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data.map(mapProduct);
}

export async function addProduct(product) {
  const imagesArray = product.images || (product.img ? [product.img] : []);
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      category: product.category,
      description: product.description,
      img: imagesArray[0] || '',
      images: imagesArray,
      in_stock: true,
    }])
    .select();
  if (error) throw error;
  return data.map(mapProduct);
}

export async function toggleStockStatus(productId) {
  // Fetch current status first
  const { data: current, error: fetchError } = await supabase
    .from('products')
    .select('in_stock')
    .eq('id', productId)
    .single();
  if (fetchError) throw fetchError;

  const { data, error } = await supabase
    .from('products')
    .update({ in_stock: !current.in_stock })
    .eq('id', productId)
    .select();
  if (error) throw error;
  return data.map(mapProduct);
}

export async function deleteProduct(productId) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);
  if (error) throw error;
}
