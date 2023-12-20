import {MovieModel} from "./movie.model";

export default interface MovieDetailsModel extends MovieModel {
    belongs_to_collection: string,
    budget: number,
    genres: {
        id: number,
        name: string
    }[],
    homepage: string

    production_companies: {
        id: number,
        logo_path: string,
        name: string,
        origin_country: string
    }[],
    production_countries: {
        iso_3166_1: string,
        name: string
    }[],

    revenue: number,
    runtime: number,
    spoken_languages: {
        english_name: string,
        iso_639_1: string,
        name: string
    }[],
    status: string,
}