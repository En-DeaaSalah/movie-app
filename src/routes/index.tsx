import * as React from "react";
import {Suspense} from "react";
import {createBrowserRouter,} from "react-router-dom";
import {Spin} from "antd";

const HomePage = React.lazy(() => import( "../pages/home/Page"))
const MovieDetailsPage = React.lazy(() => import( "../pages/movieDetails/Page"))
const FavoritePage = React.lazy(() => import( "../pages/favorites/Page"))


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Spin fullscreen={true} spinning={true}/>}><HomePage/></Suspense>,
    },
    {
        path: "movies/:id",
        element: <Suspense fallback={<Spin fullscreen={true} spinning={true}/>}><MovieDetailsPage/></Suspense>,
    },
    {
        path: "my-favorites-movies",
        element: <Suspense fallback={<Spin fullscreen={true} spinning={true}/>}><FavoritePage/></Suspense>,
    },

]);