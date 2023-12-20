import axios from "axios";
import {API_KEY, SERVER_BASE_URL} from "../../../constants";
import MovieDetailsModel from "../../../models/movieDetails.model";

export default async function getMovieDetailsApi(id: number) {
    const url = `${SERVER_BASE_URL}/movie/${id}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    }
    const response = await axios.get<MovieDetailsModel>(url, {
        ...options,
    })
    return response.data
}