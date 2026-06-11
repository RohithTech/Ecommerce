import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import ScrollToTop from './components/layout/ScrollToTop';
import AppRoutes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
       <AuthProvider>
        <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                    <ScrollToTop />
                    <AppRoutes />
              </WishlistProvider>
            </OrderProvider>
            </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
