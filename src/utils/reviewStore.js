const REVIEWS_KEY = 'shonas_reviews';

const defaultReviews = [
  { id: 1, rating: 5, text: "Exceptional quality and the madisar was tailored perfectly to my measurements. Arrived in the UK much faster than expected.", name: "Nandini Ganesh", loc: "UK" },
  { id: 2, rating: 5, text: "The Navratri decor items were exquisite. Ms. Jayasree personally ensured everything was packed securely for shipping to California.", name: "Sunitha Rao", loc: "California" },
  { id: 3, rating: 5, text: "A truly personalized shopping experience. The return gifts for our function were deeply appreciated by all guests.", name: "Srividya Srinivasan", loc: "Bangalore" },
];

export function getReviews() {
  const stored = localStorage.getItem(REVIEWS_KEY);
  if (!stored) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(defaultReviews));
    return defaultReviews;
  }
  return JSON.parse(stored);
}

export function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

export function addReview(review) {
  const reviews = getReviews();
  const newReview = { ...review, id: Date.now() };
  reviews.push(newReview);
  saveReviews(reviews);
  return reviews;
}

export function deleteReview(reviewId) {
  const reviews = getReviews();
  const updatedReviews = reviews.filter(r => r.id !== reviewId);
  saveReviews(updatedReviews);
  return updatedReviews;
}
