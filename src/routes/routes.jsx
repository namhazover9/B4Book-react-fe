import { lazy } from "react";


//---------------------------
// imports
//---------------------------
const Home = lazy(() => import("@pages/homepages/Home"));
const Login = lazy(() => import("@pages/login/Login"));
const AboutUs = lazy(() => import("@pages/AboutUs/AboutUs"));



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
    //routes in objects
];