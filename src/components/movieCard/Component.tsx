import IProps from './props.interface'
import style from './style.module.scss'
import {Avatar, Card, Image, Space, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import {FULL_BACK_IMAGE_URL, FULL_BACK_USER_AVATAR, IMAGE_BASE_URL} from "../../constants";

export default function Component({movie, onCardClick}: IProps) {
    const {Paragraph, Text} = Typography;
    const {title, id, overview, release_date, backdrop_path, poster_path} = movie
    return (

        <Card
            onClick={() => {
                onCardClick(id)
            }}
            className={style.container}
            style={{
                width: 240,
            }}
            cover={
                <Image
                    draggable={false}
                    preview={false}
                    fallback={FULL_BACK_IMAGE_URL}
                    alt="example"
                    height={250}
                    src={`${IMAGE_BASE_URL}/${backdrop_path}`}/>
            }
            hoverable
        >
            <Meta
                avatar={<Avatar src={poster_path ? `${IMAGE_BASE_URL}/${poster_path}` : FULL_BACK_USER_AVATAR}/>}
                title={
                    <div>
                        <Space
                            style={{
                                width: "100%"
                            }} direction={"vertical"}>
                            <Text>{title}</Text>
                            <Text>{release_date}</Text>
                        </Space>
                    </div>
                }
                description={
                    <Paragraph
                        ellipsis={{
                            rows: 2
                        }}>{overview}
                    </Paragraph>}/>
        </Card>
    )
}