import { lazy } from "react";


//---------------------------
// imports
//---------------------------
const Home = lazy(() => import("@pages/homepages/Home"));
const Login = lazy(() => import("@pages/login/Login"));
const AboutUs = lazy(() => import("@pages/AboutUs/AboutUs"));
const ProductPage = lazy(() => import("@pages/UserRole/ProductPage"));



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
        path: "/products",
        element: <ProductPage />,
        isPrivate: false,
    },
    //routes in objects
];