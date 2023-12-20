import style from './style.module.scss'
import {Empty} from "antd";


export default function Component() {
    return (
        <div className={style.container}>
            <Empty/>
        </div>
    )
}