import {IPaginationConfig} from "./pagination.interface";

export interface IResponse<T> extends IPaginationConfig {
    results: T[]
}