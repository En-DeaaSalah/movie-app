import {MovieModel} from "../../../models";
import {IResponse} from "../../interfaces";
import axios from "axios";
import {API_KEY, SERVER_BASE_URL} from "../../../constants";

export default async function getAllMoviesApi(queryParams: any) {
    const url = `${SERVER_BASE_URL}/search/movie`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    }
    const response = await axios.get<IResponse<MovieModel>>(url, {
        ...options,
        params: {
            ...queryParams
        }
    })
    return response.data
}