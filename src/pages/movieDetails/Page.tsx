import {useParams} from "react-router";

export default function MovieDetails() {
    const {id} = useParams()
    return (<>movie number {id}</>)
}