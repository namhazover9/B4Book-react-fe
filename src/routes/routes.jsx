/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';


const Home = lazy(() => import('@pages/homepages/Home'));
const Login = lazy(() => import('@pages/login/Login'));
const ForgotPassword = lazy(() => import('@pages/forgotPassword/ForgotPassword'));
const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs'));
const AdminPage = lazy(() => import('@pages/AdminRole/AdminPage'));
const Dashboard = lazy(() => import('@pages/AdminRole/DashBoard'));
const ProductPage = lazy(() => import('@pages/UserRole/ProductPage'));
const Cart = lazy(() => import('@pages/UserRole/Cart'));
const PopupCart = lazy(() => import('@pages/UserRole/PopupCart'));
const ShopPage = lazy(() => import('@pages/UserRole/ShopPage'));
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
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    layout: 'admin',
    isPrivate: false,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    layout: 'admin',
    isPrivate: true,
  },
  {
    path: '/products',
    element: <ProductPage />,
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/cart',
    element: <Cart />,
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/shops',
    element:<ShopPage />,
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
