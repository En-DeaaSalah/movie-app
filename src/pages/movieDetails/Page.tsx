import {useParams} from "react-router";
import {useQuery} from "react-query";
import getMovieDetailsApi from "../../api/services/movieDetailsApi/getMovieDetailsApi";
import {Col, Image, Row, Spin, Typography} from "antd";
import style from './style.module.scss'
import {IMAGE_BASE_URL} from "../../constants";
import getSimilarMovieApi from "../../api/services/similarMovieApi/getSimilarMovieApi";
import {MovieCard} from "../../components/movieCard";


function DetailsItem(
    {
        value,
        label
    }: {
        label: string,
        value?: any
    }) {
    return (
        <div>
            <div className={style.label}>{label}</div>
            <div className={style.value}>{value}</div>
        </div>
    )
}

export default function MovieDetails() {
    const {Text} = Typography;
    const {id} = useParams()
    const {data, isLoading, isSuccess} = useQuery({
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

    return (
        <div className={style.pageContainer}>
            <Spin spinning={isLoading}>
                <div className={style.content}>
                    <Row>
                        <Col span={12}>
                            <div className={style.imageContainer}>
                                <Image preview={false}
                                       src={`${IMAGE_BASE_URL}/${data?.backdrop_path}`}/>
                                <div style={{
                                    marginTop: 5
                                }}>
                                    <span>original title : </span>
                                    {data?.original_title}
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
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
                    <Row gutter={[10, 10]}>
                        <Col span={24}><h2>Similar Movies</h2></Col>
                        <Col span={24}>
                            <Row gutter={[10, 10]}>
                                {similarMovies?.results.slice(0, 10).map((movie) => {
                                    return (
                                        <Col className={style.movieCardContainer} span={6}>
                                            <MovieCard
                                                onCardClick={() => {
                                                }}
                                                movie={movie}/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Spin>
        </div>
    )
}