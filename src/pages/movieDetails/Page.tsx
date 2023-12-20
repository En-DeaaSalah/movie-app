import {useParams} from "react-router";
import {useQuery} from "react-query";
import getMovieDetailsApi from "../../api/services/mocieDetailsApi/getMovieDetailsApi";
import {Col, Image, Row, Spin, Typography} from "antd";
import style from './style.module.scss'
import {IMAGE_BASE_URL} from "../../constants";


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


    return (
        <div className={style.pageContainer}>
            <Spin spinning={isLoading}>
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
            </Spin>
        </div>
    )
}