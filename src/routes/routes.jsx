/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

const Home = lazy(() => import('@pages/homepages/Home'));
const Login = lazy(() => import('@pages/login/Login'));
const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs'));
const AdminPage = lazy(() => import('@pages/AdminRole/AdminPage'));
const Dashboard = lazy(() => import('@pages/AdminRole/DashBoard'));
const ProductPage = lazy(() => import('@pages/UserRole/ProductPage'));
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
    path: '/aboutus',
    element: <AboutUs />,
    layout: 'user',
    isPrivate: false,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    layout: 'admin',
    isPrivate: true,
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
    isPrivate: true,
  },
  // {
  //   path: "/sales",
  //   element: <SalePage />,
  //   layout: "sale",
  //   isPrivate: true,
  // },
];
