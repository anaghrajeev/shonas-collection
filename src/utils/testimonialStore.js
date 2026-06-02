// Utility for managing testimonial videos using localStorage
// We use localStorage here since we don't have a Supabase table set up for this yet.

const STORAGE_KEY = 'shonas_testimonials';

function getStoredTestimonials() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveTestimonials(testimonials) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
}

export async function getTestimonials() {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStoredTestimonials());
    }, 400);
  });
}

export async function addTestimonial(testimonial) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const testimonials = getStoredTestimonials();
      const newTestimonial = {
        ...testimonial,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      testimonials.push(newTestimonial);
      saveTestimonials(testimonials);
      resolve(newTestimonial);
    }, 400);
  });
}

export async function deleteTestimonial(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let testimonials = getStoredTestimonials();
      testimonials = testimonials.filter(t => t.id !== id);
      saveTestimonials(testimonials);
      resolve();
    }, 400);
  });
}
