import * as React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";
import {HomePage} from "../pages/home";
import MovieDetails from "../pages/movieDetails/Page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "movies/:id",
        element: <MovieDetails/>,
    },

]);