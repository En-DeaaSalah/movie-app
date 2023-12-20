import {IResponse} from "../../interfaces";
import axios from "axios";
import {API_KEY, SERVER_BASE_URL} from "../../../constants";

export default async function getMovieDetailsApi(id: number) {
    const url = `${SERVER_BASE_URL}/movie/${id}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    }
    const response = await axios.get<IResponse<any>>(url, {
        ...options,
    })
    return response.data
}