import * as React from "react";
import {createBrowserRouter,} from "react-router-dom";
import {HomePage} from "../pages/home";
import MovieDetails from "../pages/movieDetails/Page";
import {FavoritesPage} from "../pages/favorites";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "movies/:id",
        element: <MovieDetails/>,
    },
    {
        path: "my-favorites-movies",
        element: <FavoritesPage/>,
    },

]);