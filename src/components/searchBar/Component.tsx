import IProps from './props.interface'
import {Input} from "antd";
import style from './style.module.scss'
import {SearchOutlined} from "@ant-design/icons";
import {debounce} from 'lodash';

export default function ({onSearch}: IProps) {
    return (
        <div className={style.inputContainer}>
            <Input
                suffix={<SearchOutlined/>}
                placeholder={"Search from movie"}
                name={"value"}
                onChange={(event) => {
                    debounce(() => {
                        onSearch(event.target.value)
                    }, 500)()
                }}
                className={style.input}/>
        </div>
    )
}