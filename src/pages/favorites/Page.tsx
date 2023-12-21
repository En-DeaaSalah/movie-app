import style from './style.module.scss'
import {useNavigate} from "react-router";
import {ArrowLeftOutlined} from "@ant-design/icons";
import getFavorites from "../../helpers/getFavorites";
import {Col, message, Row} from "antd";
import {MovieCard} from "../../components/movieCard";
import {NoDataPlaceholder} from "../../components/noData";
import setFavorites from "../../helpers/setFavorites";

export default function Favorites() {
    const navigator = useNavigate()
    const myFavoritesMovies = getFavorites()

    return (
        <div className={style.pageContainer}>
            <div className={style.pageHeader}>
                <ArrowLeftOutlined onClick={() => navigator("/")}/>
            </div>
            <div>
                {
                    myFavoritesMovies.length > 0 ?
                        <Row gutter={[20, 20]}>
                            {

                                myFavoritesMovies.map((movie) => {
                                    return (
                                        <Col
                                            xxl={6}
                                            xl={6}
                                            lg={8}
                                            md={12}
                                            sm={12}
                                            xs={24}
                                            className={style.cardContainer}
                                            key={movie.id}>
                                            <MovieCard
                                                handleOnFavorite={(movie) => {}}
                                                isFavorite={true}
                                                key={movie.id}
                                                onCardClick={(id) => {
                                                    navigator(`/movies/${id}`)
                                                }}
                                                movie={movie}/>
                                        </Col>
                                    )
                                })

                            }
                        </Row> : <NoDataPlaceholder/>
                }
            </div>
        </div>
    )
}