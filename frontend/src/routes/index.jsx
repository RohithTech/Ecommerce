import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import StoreLayout from '../layouts/StoreLayout';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import HomePage from '../pages/HomePage';
import ProductListingPage from '../pages/ProductListingPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/dashboard/CheckoutPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ProfilePage from '../pages/dashboard/ProfilePage';
import OrdersPage from '../pages/dashboard/OrdersPage';
import WishlistPage from '../pages/dashboard/WishlistPage';
import AddressesPage from '../pages/dashboard/AddressesPage';
import AdminOverviewPage from '../pages/admin/AdminOverviewPage';
import AdminProductsPage from '../pages/admin/AdminProductsPage';
import AdminOrdersPage from '../pages/admin/AdminOrdersPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AddProduts from '../pages/Products/AddProducts'


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListingPage />} />
        <Route path="products/:slug" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
      
    <Route path="account" element={<DashboardLayout />}>
      <Route index element={<Navigate to="profile" replace />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="wishlist" element={<WishlistPage />} />
      <Route path="addresses" element={<AddressesPage />} />
      <Route path="checkout" element={<CheckoutPage /> }/>
    </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminOverviewPage />} />
        <Route path="products" element={<AdminProductsPage />}/>
        <Route path="ProductsAdd" element={<AddProduts/>}/>
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>
    </Routes>
  );
}
