import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../data/products';
import { formatPrice } from '../../utils/formatPrice';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const products = wishlist.map(getProductById).filter(Boolean);

  if (products.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        description="Save items you love for later."
        action={
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {products.map((product) => (
        <div key={product.id} className="glass-card flex gap-4 p-4">
          <Link to={`/products/${product.slug}`} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
          </Link>
          <div className="flex flex-1 flex-col">
            <Link to={`/products/${product.slug}`} className="font-semibold hover:text-indigo-600">
              {product.name}
            </Link>
            <p className="mt-1 font-bold">{formatPrice(product.price)}</p>
            <div className="mt-auto flex gap-2 pt-2">
              <Button size="sm" onClick={() => addItem(product)}>Add to Cart</Button>
              <Button size="sm" variant="ghost" onClick={() => removeFromWishlist(product.id)}>Remove</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
