import {Col, Pagination, Row, Space} from "antd";
import {SearchField} from "../../components/searchBar";
import {useEffect, useState} from "react";
import axios from "axios";
import {MovieModel} from "../../models";
import {MovieCard} from "../../components/movieCard";
import {NoDataPlaceholder} from "../../components/noData";
import {useNavigate} from "react-router";
import {IPaginationConfig} from "../../api/interfaces/pagination.interface";
import {IResponse} from "../../api/interfaces/baseResponse.interface";
import {useQuery} from "react-query";
import {getAllMoviesApi} from "../../api/services/moivesIndexApi/getAllMoviesApi";


export default function Home() {

    const [searchKeyWord, setSearchKeyWord] = useState<string>("")
    const [movies, setMovies] = useState<MovieModel[]>([])
    const [paginationData, setPaginationData] = useState<IPaginationConfig>({
        page: 1
    })
    const {data} = useQuery<unknown, unknown, MovieModel[]>({
        onSuccess: (data) => {
            setMovies(data)
        },
        queryFn: () => getAllMoviesApi({
            ...paginationData,
            ...(searchKeyWord ? {query: searchKeyWord} : {})
        }),
        queryKey: [{
            ...paginationData,
            ...(searchKeyWord ? {query: searchKeyWord} : {})
        }],
    })
    const navigator = useNavigate()
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