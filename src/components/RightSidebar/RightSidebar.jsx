import React, { useState, useEffect } from 'react';
import style from "./RightSidebar.module.scss"
import logo1 from "../../assets/img/仓鼠.svg"
import logo2 from "../../assets/img/绵羊.svg"
import logo3 from "../../assets/img/狼.svg"
import logo4 from "../../assets/img/猪.svg"
import logo5 from "../../assets/img/狐狸.svg"
import axios from "axios"
import moment from "moment"
// 时间格式设置为中文
moment.defineLocale('zh-cn', {
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        m: '1 分钟',
        mm: '%d 分钟',
        h: '1 小时',
        hh: '%d 小时',
        d: '1 天',
        dd: '%d 天',
        M: '1 个月',
        MM: '%d 个月',
        y: '1 年',
        yy: '%d 年'
    },
});
const RightSidebar = () => {
    const [infos, setInfos] = useState({});
    const [value1, setValue1] = useState([]);
    const [value2, setValue2] = useState([]); // 最新文章暂时存储容器
    const [title, setTitle] = useState("随机文章");
    // 博客信息
    useEffect(() => {
        const getInfo = async () => {
            const res = await axios.get("/info/infos")
            setInfos(res.data)
        }
        getInfo()
    }, []);



    // 随机文章
    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await axios.get("/info/randomArt")
                setValue1(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        getInfo()
    }, []);

    // 随机文章
    const getValue1 = async () => {
        try {
            const res = await axios.get("/info/randomArt")
            setValue1(res.data)
            setTitle("随机文章")
        } catch (err) {
            console.log(err);
        }
    }
    // 最新文章
    const getValue2 = async () => {
        // 避免重复请求，直接应用第一次保存的数据
        if (value2.length) {
            setValue1(value2)
            setTitle("最新文章")
            return
        }
        try {
            const res = await axios.get("/info/newArt")
            setValue1(res.data)
            setValue2(res.data)
            setTitle("最新文章")
        } catch (err) {
            console.log(err);
        }
    }

    // 个人语录
    const getValue3 = async () => {
        try {
            const res = await axios.get("/info/saying")
            setValue1(res.data)
            setTitle("个人语录")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={style.content}>
            <div className={style.tag}>
                <div onClick={getValue1}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-dianzan"></use>
                    </svg>
                </div>
                <div onClick={getValue2}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-shijian"></use>
                    </svg>
                </div>
                <div onClick={getValue3}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-liwu"></use>
                    </svg>
                </div>
            </div>
            <div className={style.box}>
                <div className={style.title}>{title}</div>
                <ul>
                    <li>
                        <div><img src={logo1} /></div>
                        <span>{value1[0]?.title} {value1[0]?.author ? "--" + value1[0]?.author : ""}</span>
                    </li>
                    <li>
                        <div><img src={logo2} /></div>
                        <span>{value1[1]?.title} {value1[1]?.author ? "--" + value1[1]?.author : ""}</span>
                    </li>
                    <li>
                        <div><img src={logo3} /></div>
                        <span>{value1[2]?.title} {value1[2]?.author ? "--" + value1[2]?.author : ""}</span>
                    </li>
                    <li>
                        <div><img src={logo4} /></div>
                        <span>{value1[3]?.title} {value1[3]?.author ? "--" + value1[3]?.author : ""}</span>
                    </li>
                    <li>
                        <div><img src={logo5} /></div>
                        <span>{value1[4]?.title} {value1[4]?.author ? "--" + value1[4]?.author : ""}</span>
                    </li>
                </ul>
            </div>
            <div className={style.box}>
                <div className={style.title}>博客信息</div>
                <ul className={style.sec}>
                    <li>
                        <span>文章数目</span>
                        <span>{infos.artNum}</span>
                    </li>
                    <li>
                        <span>运行天数</span>
                        <span>{moment(infos.firstDate).fromNow()}</span>
                    </li>
                    <li>
                        <span>最后活动</span>
                        <span>{moment(infos.latestDate).fromNow()}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default RightSidebar;
