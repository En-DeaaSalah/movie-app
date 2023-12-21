import {Col, Pagination, Row, Space, Spin} from "antd";
import {SearchField} from "../../components/searchBar";
import {useState} from "react";
import {MovieCard} from "../../components/movieCard";
import {NoDataPlaceholder} from "../../components/noData";
import {useNavigate} from "react-router";
import {useQuery, useQueryClient} from "react-query";
import {IPaginationConfig} from "../../api";
import getAllMoviesApi from "../../api/services/moivesIndexApi/getAllMoviesApi";
import style from './style.module.scss'
import {SmileOutlined} from "@ant-design/icons";
import getFavorites from "../../helpers/getFavorites";
import IsFavorite from "../../helpers/isFavorite";
import setFavorites from "../../helpers/setFavorites";


export default function HomePage() {

    const [searchKeyWord, setSearchKeyWord] = useState<string>("")
    const navigator = useNavigate()
    const [paginationData, setPaginationData] = useState<IPaginationConfig>({
        page: 1
    })
    const queryClient = useQueryClient()
    const {
        data,
        isLoading,
    } = useQuery({
        enabled: Boolean(searchKeyWord),
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
            page: paginationData.page,
            ...(searchKeyWord ? {query: searchKeyWord} : {})
        }],
    })

    const favoritesMovie = getFavorites()

    return (
        <>
            <Spin spinning={isLoading} size={"default"}>
                <Row style={{
                    height: "100vh",
                }}>
                    <Space
                        style={{
                            width: "100%"
                        }}
                        size={"large"} direction={"vertical"}>
                        <Col span={24}>
                            <Row>
                                <Col span={22}>
                                    <div>
                                        <SearchField
                                            onSearch={(keyWord) => {
                                                setSearchKeyWord(keyWord)
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    span={2}
                                    className={style.myFavorites}
                                >
                                    <SmileOutlined onClick={() => navigator("my-favorites-movies")}/>
                                </Col>
                            </Row>

                        </Col>
                        {data &&
                        <Col span={24}
                             className={style.paginationContainer}>
                            <Pagination
                                responsive
                                hideOnSinglePage
                                onChange={(page) => {
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
                                {
                                    data && data.results.length > 0 ? data.results.map((movie, index) => {
                                        return (
                                            <Col
                                                xxl={6}
                                                xl={6}
                                                lg={8}
                                                md={12}
                                                sm={12}
                                                xs={24}
                                                key={index}
                                                className={style.cardContainer}>
                                                <MovieCard
                                                    handleOnFavorite={(movie) => {
                                                        setFavorites(movie)
                                                        queryClient.invalidateQueries([{
                                                            page: paginationData.page,
                                                            ...(searchKeyWord ? {query: searchKeyWord} : {})
                                                        }])


                                                    }}
                                                    isFavorite={IsFavorite(movie.id, favoritesMovie)}
                                                    key={movie.id}
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