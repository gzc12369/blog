import React from 'react';
import { useState, useEffect } from 'react';
import style from "./Home.module.scss"
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import moment from 'moment';
import { useSelector } from 'react-redux'

const Home = () => {
    const [HomeList, setHomeList] = useState([])
    const cid = useLocation().state?.cid

    // 搜索框内容更新
    const newState = useSelector((state) => state.counter.value);
    useEffect(() => {
        setHomeList(newState)
    }, [newState]);

    useEffect(() => {
        const HomeArts = async () => {
            try {
                const res = await axios.get("arts")
                setHomeList(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        const CidArts = async () => {
            try {
                const res = await axios.get(`arts?cid=${cid}`)
                setHomeList(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        cid ? CidArts() : HomeArts()
    }, [cid]);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className={style.content}>
            <div className={style.title}>
                <span>小智同学的Blog</span>
                <span>远赴人间惊鸿宴，一睹人间盛世颜</span>
            </div>

            {HomeList ? HomeList.map(item => (
                <Link to={`/arts/${item.id}`} state={{ item }} key={item.id}>
                    <div className={style.card}>
                        <div className={style.boxTitle}>{item.title}</div>
                        <div className={style.desc}>{getText(item.desc)}</div>
                        {/* dangerouslySetInnerHTML={{__html:item.desc}} */}
                        <span></span>
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
                                {moment(item.date).format('YYYY年MM月DD日')}
                            </div>
                            <div>
                                <svg className={style.icon} aria-hidden="true">
                                    <use xlinkHref="#icon-tag"></use>
                                </svg>
                                {item.tag}
                            </div>
                        </div>
                    </div>
                </Link>
            )) : null
            }
        </div>
    );
}

export default Home;
