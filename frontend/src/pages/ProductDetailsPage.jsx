import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatPrice';
import ProductGallery from '../components/product/ProductGallery';
import ReviewsList from '../components/product/ReviewsList';
import { ProductGrid } from '../components/product/ProductCard';
import Rating from '../components/ui/Rating';
import Badge from '../components/ui/Badge';
import QuantitySelector from '../components/ui/QuantitySelector';
import Button from '../components/ui/Button';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => addItem(product, quantity);
  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/account/checkout');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          <div className="flex flex-wrap gap-2">
            {discount > 0 && <Badge variant="sale">-{discount}% OFF</Badge>}
            {product.stock > 0 ? (
              <Badge variant="new">In Stock</Badge>
            ) : (
              <Badge variant="stock">Out of Stock</Badge>
            )}
          </div>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{product.name}</h1>
          <Rating value={product.rating} showValue count={product.reviewCount} className="mt-3" />
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="mt-6 leading-relaxed text-slate-600 dark:text-slate-400">{product.description}</p>
          {product.colors && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold">Color: {selectedColor}</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-xl border-2 px-4 py-2 text-sm transition-all ${
                      selectedColor === color
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          {product.sizes && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold">Size: {selectedSize}</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-xl border-2 px-4 py-2 text-sm transition-all ${
                      selectedSize === size
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock} />
            <Button size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
              Add to Cart
            </Button>
            <Button size="lg" variant="secondary" onClick={handleBuyNow} disabled={product.stock === 0}>
              Buy Now
            </Button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="rounded-xl border border-slate-300 p-3 dark:border-slate-600"
            >
              <svg
                className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`}
                fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ReviewsList productId={product.id} productRating={product.rating} reviewCount={product.reviewCount} />
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">Related Products</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
