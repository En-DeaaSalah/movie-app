import {MovieModel} from "../../models";

export default interface IProps {
    onCardClick: (id: number) => void
    movie: MovieModel
    isFavorite: boolean
    handleOnFavorite: (movie: MovieModel) => void

}