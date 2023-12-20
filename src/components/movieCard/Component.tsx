import IProps from './props.interface'
import style from './style.module.scss'
import {Card, Space, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import {HeartOutlined} from "@ant-design/icons";

export default function Component({movie, onCardClick}: IProps) {
    const {Paragraph, Text} = Typography;
    const {title, id, overview, release_date} = movie
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
                <img alt="example" height={250}
                     src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
            }
            hoverable
        >
            <Meta title={
                <div>
                    <Space direction={"vertical"}>
                        <Text>{title}</Text>
                        <Text>{release_date}</Text>
                    </Space>
                </div>
            } description={<Paragraph
                ellipsis={{
                    rows: 2
                }}>{overview}</Paragraph>}/>
        </Card>
    )
}