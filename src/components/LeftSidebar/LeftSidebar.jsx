import React, { useState } from 'react';
import style from "./LeftSidebar.module.scss"
import ava from "../../user.jpg"
import { Link, useNavigate } from "react-router-dom";
import Tooltip from '../../components/Tooltip/Tooltip';

const LeftSidebar = () => {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const [text, setText] = useState(false);
    // 未登录的情况下禁止跳转的默认事件
    const href = (e) => {
        e.preventDefault();
        if (localStorage.getItem("user").length > 4) {
            navigate("/write")
        }
        setFlag(true)
        setText("请登录，暂时没有权限")
    }
    // 隐藏提示框
    const hideTooltip = (bool) => {
        setFlag(bool)
    }
    return (
        <div className={style.box}>
            {flag ? <Tooltip text={text} onClick={hideTooltip}></Tooltip> : ""}
            <div className={style.content}>
                <div className={style.user}>
                    <img src={ava} />
                    <span className={style.uname}>小智同学</span>
                    <span>记录美好生活</span>
                </div>
                <div>
                    <h2>导航</h2>
                    <ul>
                        <Link to="/">
                            <li>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-shouye"></use>
                                </svg>首页
                            </li>
                        </Link>
                    </ul>
                </div>
                <div>
                    <h2>组成</h2>
                    <ul>
                        <Link to="/?cid=1" state={{ "cid": 1 }}>
                            <li>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-wangluo"></use>
                                </svg>前端
                            </li>
                        </Link>
                        <Link to="/?cid=2" state={{ "cid": 2 }}>
                            <li>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-wangluo"></use>
                                </svg>后端
                            </li>
                        </Link>
                        <Link to="/?cid=3" state={{ "cid": 3 }}>
                            <li>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-wangluo"></use>
                                </svg>数据库
                            </li>
                        </Link>
                        <Link to="/?cid=4" state={{ "cid": 4 }}>
                            <li>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-shenghuo"></use>
                                </svg>生活
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className={style.boxFooter}>
                    <Link to="/write" onClick={e => href(e)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-shezhi"></use>
                        </svg>
                    </Link>
                    <Link to="/write" onClick={e => href(e)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-chuangzuo"></use>
                        </svg>
                    </Link>
                    <Link to="https://github.com/gzc12369/blog">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-github"></use>
                        </svg>
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default LeftSidebar;
