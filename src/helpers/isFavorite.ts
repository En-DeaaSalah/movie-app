import {MovieModel} from "../models";

export default function IsFavorite(id: number, movies: MovieModel[]) {
    for (const movie of movies) {
        if (movie.id === id) {
            return true
        }
    }
    return false
}