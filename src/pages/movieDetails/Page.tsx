import {useNavigate, useParams} from "react-router";
import {useQuery} from "react-query";
import getMovieDetailsApi from "../../api/services/movieDetailsApi/getMovieDetailsApi";
import {Col, Image, message, Row, Spin} from "antd";
import style from './style.module.scss'
import {FULL_BACK_IMAGE_URL, IMAGE_BASE_URL} from "../../constants";
import getSimilarMovieApi from "../../api/services/similarMovieApi/getSimilarMovieApi";
import {MovieCard} from "../../components/movieCard";
import {ArrowLeftOutlined} from "@ant-design/icons";
import setFavorites from "../../helpers/setFavorites";
import IsFavorite from "../../helpers/isFavorite";
import getFavorites from "../../helpers/getFavorites";


function DetailsItem(
    {
        value,
        label
    }: {
        label: string,
        value?: any
    }) {
    return (
        <div className={style.detailsItem}>
            <div className={style.label}>{label}</div>
            <div className={style.value}>{value}</div>
        </div>
    )
}

export default function MovieDetailsPage() {
    const {id} = useParams()
    const navigator = useNavigate()
    const {data, isLoading} = useQuery({
        onError: (err) => {
            console.log(err)
        },
        onSuccess: (data) => {
            console.log(data)
        },
        queryFn: () => getMovieDetailsApi(Number(id)),
        queryKey: [Number(id)],
    })
    const {data: similarMovies, isLoading: isSimilarMoviesLoading} = useQuery({
        onError: (err) => {
            console.log(err)
        },
        onSuccess: (data) => {
            console.log(data)
        },
        queryFn: () => getSimilarMovieApi(Number(id)),
        queryKey: ["similar", Number(id)],
    })
    const [messageApi, contextHolder] = message.useMessage();
    const favoritesMovie = getFavorites()
    const handleClick = () => {
        messageApi.success({
            type: 'success',
            content: 'Added To Favorites',
        });
    };
    return (
        <div className={style.pageContainer}>
            {contextHolder}
            <Spin spinning={isLoading}>
                <div style={{
                    marginLeft: 20
                }}>
                    <ArrowLeftOutlined
                        onClick={() => {
                            navigator('/')
                        }}/>
                </div>
                <div className={style.content}>
                    <Row>
                        <Col xxl={12}
                             xl={12}
                             lg={12}
                             md={24}
                             sm={24}
                             xs={24}>
                            <div className={style.imageContainer}>
                                <Image preview={false}
                                       fallback={FULL_BACK_IMAGE_URL}
                                       className={style.img}
                                       src={`${IMAGE_BASE_URL}/${data?.backdrop_path}`}/>
                                <div
                                    style={{
                                        marginTop: 5
                                    }}>
                                    <span>original title : </span>
                                    {data?.original_title}
                                </div>
                            </div>
                        </Col>
                        <Col xxl={12}
                             xl={12}
                             lg={12}
                             md={24}
                             sm={24}
                             xs={24}>
                            <div className={style.movieInfo}>
                                <DetailsItem label={"Title"}
                                             value={data?.title}/>
                                <DetailsItem label={"OverView"}
                                             value={data?.overview}/>
                                <DetailsItem label={"Genres"}
                                             value={data?.genres.map(({id, name}) => <span key={id}>{name}</span>)}/>
                                <DetailsItem label={"Release Date"}
                                             value={data?.release_date}/>
                                <DetailsItem label={"Status"}
                                             value={data?.status}/>
                                <DetailsItem label={"Producer"}
                                             value={data?.production_companies.map(({id, name}) => <span
                                                 key={id}>{name}</span>)}/>
                            </div>
                        </Col>
                    </Row>
                    {similarMovies && similarMovies.results.length > 0 &&
                        <Row gutter={[10, 10]}>
                            <Spin spinning={isSimilarMoviesLoading}>
                                <Col span={22} push={1}><h2>Similar Movies</h2></Col>
                                <Col span={24}>
                                    <Row gutter={[10, 10]}>
                                        {similarMovies?.results.slice(0, 8).map((movie) => {
                                            return (
                                                <Col
                                                    xxl={6}
                                                    xl={6}
                                                    lg={8}
                                                    md={12}
                                                    sm={12}
                                                    xs={24}
                                                    className={style.movieCardContainer}>
                                                    <MovieCard
                                                        handleOnFavorite={(movie) => {
                                                            if (setFavorites(movie)) {
                                                                handleClick()
                                                            }

                                                        }}
                                                        isFavorite={IsFavorite(movie.id, favoritesMovie)}
                                                        onCardClick={() => {
                                                        }}
                                                        movie={movie}/>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Col>
                            </Spin>
                        </Row>
                    }
                </div>
            </Spin>
        </div>
    )
}