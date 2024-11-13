import { lazy } from "react";


//---------------------------
// imports
//---------------------------
const Home = lazy(() => import("@pages/homepages/Home"));
const Login = lazy(() => import("@pages/login/Login"));



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
    //routes in objects
];