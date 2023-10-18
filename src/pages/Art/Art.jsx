import React from 'react';
import { useState, useEffect } from 'react';
import style from "./Art.module.scss"
import { useLocation, useNavigate } from "react-router-dom";
import delete1 from "../../assets/img/delete.png";
import edit from "../../assets/img/deit.png";
import moment from 'moment';
import axios from 'axios';
import Tooltip from '../../components/Tooltip/Tooltip';
const Art = () => {
    const [state, setstate] = useState({});
    const item = useLocation().state?.item

    const [flag, setFlag] = useState(false);
    const [text, setText] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setstate(item)
    }, [item]);

    // 删除文章
    const deleteArt = async () => {
        try {
            const res = await axios.delete(`/arts/${state.id}`)
            setText(res.data)
            setFlag(true)
        } catch (err) {
            console.log(err);
        }
    }

    // 编辑文章
    const editArt = () => {
        navigate("/write", { state })
    }

    // 隐藏提示框
    const hideTooltip = (bool) => {
        setFlag(bool)
        setTimeout(() => {
            navigate(-1)
        }, 1200);
    }
    return (
        <div className={style.content}>
            {flag ? <Tooltip text={text} onClick={hideTooltip}></Tooltip> : ""}
            <div className={style.title}>
                <span>{state?.title}</span>
                <div className={style.info}>
                    <div>
                        <svg className={style.icon} aria-hidden="true">
                            <use xlinkHref="#icon-geren"></use>
                        </svg>
                        小智同学
                    </div>
                    <div>
                        <svg className={style.icon} aria-hidden="true">
                            <use xlinkHref="#icon-shizhong"></use>
                        </svg>
                        {moment(state?.date).format('YYYY年MM月DD日')}
                    </div>
                    <div>
                        <svg className={style.icon} aria-hidden="true">
                            <use xlinkHref="#icon-tag"></use>
                        </svg>
                        {state?.tag}
                    </div>
                </div>
            </div>

            <div className={style.card} key={state?.id}>
                <div className={style.edit} onClick={editArt}><img src={edit} /></div>
                <div className={style.delete} onClick={deleteArt}><img src={delete1} /></div>
                <div className={style.desc} dangerouslySetInnerHTML={{ __html: state?.desc }}></div>
                <span></span>
            </div>
        </div>
    );
}

export default Art;
