import getFavorites from "./getFavorites";
import {MovieModel} from "../models";
import {LOCALSTORAGE_KEY} from "../constants";
import IsFavorite from "./isFavorite";

export default function setFavorites(movie: MovieModel): boolean {

    const favorites = getFavorites()
    if (IsFavorite(movie.id, favorites)) {
        return false
    }
    favorites.push(movie)
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favorites));
    return true
}