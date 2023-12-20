import {Col, Pagination, Row, Space, Spin} from "antd";
import {SearchField} from "../../components/searchBar";
import {useState} from "react";
import {MovieCard} from "../../components/movieCard";
import {NoDataPlaceholder} from "../../components/noData";
import {useNavigate} from "react-router";
import {useQuery} from "react-query";
import {IPaginationConfig} from "../../api";
import getAllMoviesApi from "../../api/services/moivesIndexApi/getAllMoviesApi";
import style from './style.module.scss'

export default function Home() {

    const [searchKeyWord, setSearchKeyWord] = useState<string>("")
    const [paginationData, setPaginationData] = useState<IPaginationConfig>({
        page: 1
    })
    const {data, isLoading, isSuccess} = useQuery({
        enabled: Boolean(searchKeyWord),
        onError: (err) => {
            console.log(err)
        },
        onSuccess: ({results, ...paginationData}) => {
            setPaginationData({
                ...paginationData,
            })
        },
        queryFn: () => getAllMoviesApi({
            page: paginationData.page,
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
            <Spin spinning={isLoading} size={"large"}>
                <Row style={{
                    height: "100vh",
                }}>
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
                        {data &&
                        <Col span={24}
                             className={style.paginationContainer}>
                            <Pagination
                                responsive
                                hideOnSinglePage
                                onChange={(page, pageSize) => {
                                    setPaginationData({
                                        ...paginationData,
                                        page: page
                                    })
                                }}
                                showSizeChanger={false}
                                defaultCurrent={1}
                                current={paginationData.page}
                                total={paginationData.total_pages}
                            />
                        </Col>
                        }
                        <Col
                            span={24}
                        >
                            <Row className={style.contentContainer} gutter={[20, 20]}>
                                {data && data.results.length > 0 ? data.results.map((movie, index) => {
                                    return (
                                        <Col
                                            xxl={6}
                                            xl={6}
                                            lg={8}
                                            md={12}
                                            sm={12}
                                            xs={24}
                                            className={style.cardContainer}>
                                            <MovieCard
                                                key={index}
                                                onCardClick={(id) => {
                                                    navigator(`/movies/${id}`)
                                                }}
                                                movie={movie}/>
                                        </Col>
                                    )
                                }) : !isLoading && <NoDataPlaceholder/>}
                            </Row>
                        </Col>
                    </Space>
                </Row>
            </Spin>
        </>
    )
}