export function filterProducts(products, { category, minPrice, maxPrice, query, sort }) {
  let result = [...products];

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'all') {
    result = result.filter((p) => p.category === category);
  }

  if (minPrice != null && minPrice !== '') {
    result = result.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice != null && maxPrice !== '') {
    result = result.filter((p) => p.price <= Number(maxPrice));
  }

  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      break;
  }

  return result;
}
