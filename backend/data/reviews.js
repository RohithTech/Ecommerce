export const reviews = [
  { id: 'r1', productId: 'p1', author: 'Sarah M.', rating: 5, date: '2026-03-01', title: 'Best headphones I have owned', body: 'The noise cancellation is incredible. Battery lasts all week with daily use.' },
  { id: 'r2', productId: 'p1', author: 'James K.', rating: 4, date: '2026-02-20', title: 'Great sound, slightly heavy', body: 'Sound quality is amazing but they get a bit heavy after long sessions.' },
  { id: 'r3', productId: 'p1', author: 'Emily R.', rating: 5, date: '2026-02-10', title: 'Worth every penny', body: 'Premium build quality and the app customization is a nice touch.' },
  { id: 'r4', productId: 'p9', author: 'Mike T.', rating: 5, date: '2026-03-05', title: 'Perfect for marathon training', body: 'Incredible cushioning and they still look new after 200 miles.' },
  { id: 'r5', productId: 'p9', author: 'Lisa W.', rating: 4, date: '2026-02-28', title: 'Comfortable but runs small', body: 'Order half size up. Otherwise great running shoes.' },
  { id: 'r6', productId: 'p17', author: 'Anna P.', rating: 5, date: '2026-03-08', title: 'Visible results in 2 weeks', body: 'My dark spots have faded significantly. Will repurchase.' },
  { id: 'r7', productId: 'p17', author: 'David L.', rating: 4, date: '2026-02-15', title: 'Good serum, slight scent', body: 'Works well but has a mild citrus smell that takes getting used to.' },
  { id: 'r8', productId: 'p7', author: 'Rachel S.', rating: 5, date: '2026-03-02', title: 'Softest sweater ever', body: 'No itchiness at all. Perfect weight for layering.' },
  { id: 'r9', productId: 'p22', author: 'Tom H.', rating: 5, date: '2026-01-25', title: 'Game changer for home gym', body: 'Replaced my entire rack of dumbbells. Dial system is smooth.' },
  { id: 'r10', productId: 'p24', author: 'Chris B.', rating: 5, date: '2026-03-10', title: 'Ice cold all day', body: 'Left it in my car on a hot day and water was still cold 8 hours later.' },
];

export function getReviewsByProductId(productId) {
  return reviews.filter((r) => r.productId === productId);
}
