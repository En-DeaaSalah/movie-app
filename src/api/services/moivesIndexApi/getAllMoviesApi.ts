import {MovieModel} from "../../../models";

import {IResponse} from "../../interfaces";
import axios from "axios";

export default async function getAllMoviesApi(queryParams: any) {
    const url = 'https://api.themoviedb.org/3/search/movie';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDRhZmNlOGQxMzk4MjdiNzhmMjdlMDQ3ZjJkYjVkNyIsInN1YiI6IjY1ODE3NjQ3MDI1NzY0MDdkZTQ5M2FhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pvtLOksL7BGQ2R4VoiM4b2AXmPfGE56si1cK1bCdYdk'
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