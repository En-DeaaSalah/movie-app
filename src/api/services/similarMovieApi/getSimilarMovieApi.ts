import axios from "axios";
import {API_KEY, SERVER_BASE_URL} from "../../../constants";
import MovieDetailsModel from "../../../models/movieDetails.model";
import {IResponse} from "../../interfaces";
import {MovieModel} from "../../../models";

export default async function getSimilarMovieApi(id: number) {
    const url = `${SERVER_BASE_URL}/movie/${id}/similar`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    }
    const response = await axios.get<IResponse<MovieModel>>(url, {
        ...options,
    })
    return response.data
}