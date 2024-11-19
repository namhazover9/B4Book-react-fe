import { lazy } from "react";


//---------------------------
// imports
//---------------------------
const Home = lazy(() => import("@pages/homepages/Home"));
const Login = lazy(() => import("@pages/login/Login"));
const AboutUs = lazy(() => import("@pages/AboutUs/AboutUs"));
const AdminPage = lazy(() => import("@pages/AdminRole/AdminPage"));
const Dashboard = lazy(() => import("@pages/AdminRole/DashBoard"));
const Product = lazy(() => import("@pages/AdminRole/Product"));




//---------------------------
// exports
//---------------------------
export const routes_here = [
    {
        path: "/",
        element: <Home />,
        isPrivate: false,
    },
    {
        path: "/login",
        element: <Login />,
        isPrivate: false,
    },
    {
        path: "/aboutus",
        element: <AboutUs />,
        isPrivate: false,
    },
    {
        path: "/admin",
        element: <AdminPage />,
        isPrivate: false,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        isPrivate: false,
    },
    {
        path: "/products",
        element: <Product />,
        isPrivate: false,
    },
    //routes in objects
];