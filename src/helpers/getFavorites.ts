import {LOCALSTORAGE_KEY} from "../constants";
import {MovieModel} from "../models";

export default function getFavorites(): MovieModel[] {
    return JSON.parse(<string>localStorage.getItem(LOCALSTORAGE_KEY)) as MovieModel[]  ?? [];
}