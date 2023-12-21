import style from './style.module.scss'
import {Button, Image} from "antd";
import notFound from '../../assets/404-page.jpg'
import {useNavigate} from "react-router";

export default function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <div className={style.pageContainer}>
            <Image draggable={false} preview={false} src={notFound}/>
            <Button shape={"round"} type={"primary"} onClick={() => navigate("/")}>Back To Home</Button>
        </div>
    )
}