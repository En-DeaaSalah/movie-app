import getFavorites from "./getFavorites";
import {MovieModel} from "../models";
import {LOCALSTORAGE_KEY} from "../constants";
import IsFavorite from "./isFavorite";

export default function setFavorites(movie: MovieModel) {

    const favorites = getFavorites()
    if (IsFavorite(movie.id, favorites)) {
        const temp = favorites.filter((storedMovie) => storedMovie.id != movie.id)
        console.log(temp)
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(temp));
        return
    }
    favorites.push(movie)
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favorites));
}