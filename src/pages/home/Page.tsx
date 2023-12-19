import {Col, Pagination, Row, Space} from "antd";
import {SearchField} from "../../components/searchBar";
import {useEffect, useState} from "react";
import axios from "axios";
import {MovieModel} from "../../models";
import {MovieCard} from "../../components/movieCard";
import {NoDataPlaceholder} from "../../components/noData";
import {useNavigate} from "react-router";


const url = 'https://api.themoviedb.org/3/search/movie';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDRhZmNlOGQxMzk4MjdiNzhmMjdlMDQ3ZjJkYjVkNyIsInN1YiI6IjY1ODE3NjQ3MDI1NzY0MDdkZTQ5M2FhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pvtLOksL7BGQ2R4VoiM4b2AXmPfGE56si1cK1bCdYdk'
    }
}

interface IPaginationConfig {
    total_results?: number
    total_pages?: number
    page: number
}


interface IResponse<T> extends IPaginationConfig {
    results: T[]
}

export default function Home() {

    const [searchKeyWord, setSearchKeyWord] = useState<string>("")
    const [movies, setMovies] = useState<MovieModel[]>([])
    const [paginationData, setPaginationData] = useState<IPaginationConfig>({
        page: 1
    })
    const navigator = useNavigate()
    useEffect(() => {
        const resp = axios.get<IResponse<MovieModel>>(url, {
            ...options,
            params: {
                ...paginationData,
                ...(searchKeyWord ? {query: searchKeyWord} : {})
            }
        })
        resp.then((value) => {
            const {results, ...paginationData} = value.data
            setMovies(results)
            setPaginationData(paginationData)
        })
    }, [searchKeyWord, paginationData])
    return (
        <>
            <Row>
                <Space
                    style={{
                        width: "100%"
                    }}
                    size={"large"} direction={"vertical"}>
                    <Col span={24}>
                        <div>
                            <SearchField
                                onSearch={(keyWord) => {
                                    setSearchKeyWord(keyWord)
                                }}
                            />
                        </div>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[40, 40]}>
                            {movies.length > 0 ? movies.map((movie, index) => {
                                return (
                                    <Col span={6}>
                                        <MovieCard
                                            key={index}
                                            onCardClick={(id) => {
                                                navigator(`/movies/${id}`)
                                            }}
                                            movie={movie}/>
                                    </Col>
                                )
                            }) : <NoDataPlaceholder/>}
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Pagination
                            onChange={(page, pageSize) => {
                                setPaginationData({
                                    ...paginationData,
                                    page: page
                                })
                            }}
                            defaultCurrent={1}
                            current={paginationData.page}
                            total={paginationData.total_results}
                            pageSize={12}
                        />
                    </Col>
                </Space>
            </Row>
        </>
    )
}