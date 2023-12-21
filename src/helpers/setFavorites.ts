import getFavorites from "./getFavorites";
import {MovieModel} from "../models";
import {LOCALSTORAGE_KEY} from "../constants";
import IsFavorite from "./isFavorite";

export default function setFavorites(movie: MovieModel) {

    const favorites = getFavorites()
    if (IsFavorite(movie.id, favorites)) {
        return
    }
    favorites.push(movie)
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favorites));
}