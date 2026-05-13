// Utility for managing product data in local storage
const PRODUCTS_KEY = 'shonas_products';

const defaultProducts = [
  { id: 1, name: 'Traditional Kanchipuram Silk', category: 'Madisars', description: 'Authentic 9-yard silk saree with rich zari borders.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCa0Bf_7EjuFu0_vx-HD2-n-pVMgP2r8-6zsGUXjb5O13zdYgALJIR5Br6s5hiGAvykg1TevTUTXMLxcVobWr4VM4TI1xHmn1AwS_3GGVbTPW8qkl3e8kFqkNrwHG1kIqgY5pDj-xjkGCMJAg6hCagy6hohW4S75a3Z4C_gK24joTBcKeFyZbhZ_BbMk8MABb5nOUm_Ydm48LRMJZy24kktFw5nb8t0sDOCI8uCtzh9CDHByQSpjs0oZuMiKk-jMQAnyZPf8Qzwjfl', images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCCa0Bf_7EjuFu0_vx-HD2-n-pVMgP2r8-6zsGUXjb5O13zdYgALJIR5Br6s5hiGAvykg1TevTUTXMLxcVobWr4VM4TI1xHmn1AwS_3GGVbTPW8qkl3e8kFqkNrwHG1kIqgY5pDj-xjkGCMJAg6hCagy6hohW4S75a3Z4C_gK24joTBcKeFyZbhZ_BbMk8MABb5nOUm_Ydm48LRMJZy24kktFw5nb8t0sDOCI8uCtzh9CDHByQSpjs0oZuMiKk-jMQAnyZPf8Qzwjfl'], inStock: true },
  { id: 2, name: 'Designer Anarkali Kurti', category: 'Ladies', description: 'Elegant floor-length anarkali perfect for festive occasions.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4CO5rSSoNNnL0wKgsVI7jXdd6J_Ba-1fR60FqifM1XtvQRtC5WPrzlzpoVyrWhWfXu2gPPz09_y8VhK3Y3FwRBvnSpFrzPqBi0ELk8Z3De-oJHJbewjLNyFayqHV4L7CrW6KZASLiOCD4q2CZSn2ZquUj8JUfBLZKDjb850mDy64Kfd6Ji-k3bfygtGHw9SHQYkQIh-SHGxRVNRmnVkVdV4gtGPeYoLxGYB_Hd1ffbVSPJSRs9OGQ5AOdelLWa2mXWCYBZKes1l2L', images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB4CO5rSSoNNnL0wKgsVI7jXdd6J_Ba-1fR60FqifM1XtvQRtC5WPrzlzpoVyrWhWfXu2gPPz09_y8VhK3Y3FwRBvnSpFrzPqBi0ELk8Z3De-oJHJbewjLNyFayqHV4L7CrW6KZASLiOCD4q2CZSn2ZquUj8JUfBLZKDjb850mDy64Kfd6Ji-k3bfygtGHw9SHQYkQIh-SHGxRVNRmnVkVdV4gtGPeYoLxGYB_Hd1ffbVSPJSRs9OGQ5AOdelLWa2mXWCYBZKes1l2L'], inStock: true },
  { id: 3, name: 'Classic Silk Veshti', category: 'Mens', description: 'Premium handwoven silk dhoti with gold zari.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdUnSIg1E7YGMER31sDqNYnyiQeKIFPCM0mC326DYMfjXxzKcw4_hsN8yJPLdGqEJyscoVe0dk-9CRUR_d0GNNK-UiSf2YpGqN7gVWPeG48H9_bvXkKBcsO0PbQyzO9C_aoJN_8-LZSt79V2ldfvrIkfc8YkwnZzhUQkzohF5iRUiEMZXGu7Chy1l2urzNysj3A63O7qYo417CpKfoL-lfOHHjCs_tyCQCP6fosGXfDTz15C_K-SVNh0Zcf8f_lmUGTvLlXWRvaczW', images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCdUnSIg1E7YGMER31sDqNYnyiQeKIFPCM0mC326DYMfjXxzKcw4_hsN8yJPLdGqEJyscoVe0dk-9CRUR_d0GNNK-UiSf2YpGqN7gVWPeG48H9_bvXkKBcsO0PbQyzO9C_aoJN_8-LZSt79V2ldfvrIkfc8YkwnZzhUQkzohF5iRUiEMZXGu7Chy1l2urzNysj3A63O7qYo417CpKfoL-lfOHHjCs_tyCQCP6fosGXfDTz15C_K-SVNh0Zcf8f_lmUGTvLlXWRvaczW'], inStock: true },
  { id: 4, name: 'Oxidised Silver Jhumkas', category: 'Jewellery', description: 'Statement traditional earrings with intricate detailing.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv8leZzJ1kaH-BVJqA573so-MWsCCSnjmmIPI6aKCta7sxt9Ah7Bixgkc4wz2gUPHCbAd51q7FBMd37txXUCAd-kmMN5lWXQg5mzDw2euJUxGg9HV0x4kuxf4fjVAic2rP4yRfixrXxxTWlWYhMkceCXrxVX7_Bt3KEGV0AWFqPYqoHRBY7rVMrT57BY0xnPmkcDLcAqhGrJYLSuD4Ve-2ws9wB3Svt99NFx44KVOfSv97bLOQQSuBMnf4lw5vUaLmLXHswGnrPoT8', images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDv8leZzJ1kaH-BVJqA573so-MWsCCSnjmmIPI6aKCta7sxt9Ah7Bixgkc4wz2gUPHCbAd51q7FBMd37txXUCAd-kmMN5lWXQg5mzDw2euJUxGg9HV0x4kuxf4fjVAic2rP4yRfixrXxxTWlWYhMkceCXrxVX7_Bt3KEGV0AWFqPYqoHRBY7rVMrT57BY0xnPmkcDLcAqhGrJYLSuD4Ve-2ws9wB3Svt99NFx44KVOfSv97bLOQQSuBMnf4lw5vUaLmLXHswGnrPoT8'], inStock: true },
];

export function getProducts() {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
  }
  return JSON.parse(stored);
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function addProduct(product) {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now(), inStock: true };
  products.push(newProduct);
  saveProducts(products);
  return products;
}

export function toggleStockStatus(productId) {
  const products = getProducts();
  const updatedProducts = products.map(p => {
    if (p.id === productId) {
      return { ...p, inStock: !p.inStock };
    }
    return p;
  });
  saveProducts(updatedProducts);
  return updatedProducts;
}

export function deleteProduct(productId) {
  const products = getProducts();
  const updatedProducts = products.filter(p => p.id !== productId);
  saveProducts(updatedProducts);
  return updatedProducts;
}
