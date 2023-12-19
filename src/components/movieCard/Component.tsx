import IProps from './props.interface'
import style from './style.module.scss'
import {Card} from "antd";
import Meta from "antd/es/card/Meta";

export default function Component({movie, onCardClick}: IProps) {
    console.log(movie)
    const {title, id, overview} = movie
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
            <Meta title={title} description={overview}/>
        </Card>
    )
}