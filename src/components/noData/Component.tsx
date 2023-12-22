import style from './style.module.scss'
import {Empty} from "antd";


export default function Component() {
    return (
        <div className={style.container}>
            <Empty description={<span className={style.title}>Not Movie Found</span>}/>
        </div>
    )
}