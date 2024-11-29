/* eslint-disable react-refresh/only-export-components */
import { User } from 'lucide-react';
import { path, tr } from 'framer-motion/client';
import { lazy } from 'react';

//home Page
const Home = lazy(() => import('@pages/homepages/Home'));
const Login = lazy(() => import('@pages/login/Login'));
const ForgotPassword = lazy(() => import('@pages/forgotPassword/ForgotPassword'));
const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs'));
const Details = lazy(() => import('@pages/homepages/Details'));

// user Role
const ProductPage = lazy(() => import('@pages/UserRole/ProductPage'));
const Cart = lazy(() => import('@pages/UserRole/Cart'));
const PopupCart = lazy(() => import('@pages/UserRole/PopupCart'));
const UserProfile = lazy(() => import('@pages/UserRole/UserProfile'));
const ShopPage = lazy(() => import('@pages/UserRole/ShopPage'));
const Order = lazy(() => import('@pages/UserRole/Order'));
const DetailShop = lazy(() => import('@pages/UserRole/DetailShop'));
const OrderConfirm = lazy(() => import('@pages/UserRole/OrderConfirm'));
const Checkout = lazy(() => import('@pages/UserRole/Checkout'));

// seller Role
const SellerPage = lazy(() => import('@pages/SellerRole/SellerPage'));
const OrderPageOfSeller = lazy(() => import('@pages/SellerRole/OrderPageOfSeller'));

// admin Role
const AccountManager = lazy(() => import('@pages/AdminRole/AccountManager'));
// const AdminPage = lazy(() => import('@pages/AdminRole/AdminPage'));
const Dashboard = lazy(() => import('@pages/AdminRole/DashBoard'));

// const SalePage = lazy(() => import("@pages/SaleRole/SalePage"));

export const routes_here = [
  {
    path: '/',
    element: <Home />,
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/login',
    element: <Login />,
    layout: null,
    isPrivate: false,
  },
  {
    path: '/forgotPassword',
    element: <ForgotPassword />,
    layout: null,
    isPrivate: false,
  },
  {
    path: '/aboutus',
    element: <AboutUs />,
    layout: null,
    isPrivate: false,
  },
  {
    path: '/admin',
    element: <AccountManager />,
    layout: 'admin',
    isPrivate: false,
  },
  {
    path: '/admin/dashboard',
    element: <Dashboard />,
    layout: 'admin',
    isPrivate: false,
  },
  {
    path: '/cart',
    element: <Cart />,
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/products',
    element: <ProductPage />,
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/shops',
    element: <ShopPage />,
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/shop/:name/home/:id',
    element: <SellerPage />,
    layout: 'seller',
    isPrivate: false,
  },
  {
    path: '/shop/:name/orders/:id',
    element: <OrderPageOfSeller />,
    layout: 'seller',
    isPrivate: false,
  },
  {
    path: '/userprofile',
    element: <UserProfile />,
    layout: 'user',
    isPrivate: false,
  },

  {
    path: '/details',
    element: <Details />,
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/order',
    element: <Order />,
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/shops/detailShop/:id',
    element: <DetailShop />,
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/orderconfirm',
    element: <OrderConfirm />,
    layout: 'user',
    isPrivate: false,
  },
  // {
  //   path: '/shops',
  //   element: <SellerPage />,
  //   layout: 'user',
  //   isPrivate: false,
  // },
  // {
  //   path: "/sales",
  //   element: <SalePage />,
  //   layout: "sale",
  //   isPrivate: true,
  // },
];
