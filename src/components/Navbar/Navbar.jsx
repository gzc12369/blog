import React, { useState, useEffect } from 'react';
import style from "./Navbar.module.scss"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { search } from '../../store/counterSlice.js';

const Navbar = () => {
    const [flag, setFlag] = useState(false); // 用于控制登录框的显示与隐藏
    const [value, setValue] = useState(""); // 搜索框内容关键词
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const dispatch = useDispatch();

    const Login = async () => {

        try {
            const res = await axios.post("/auth/login", { phone, password })
            setCurrentUser(res.data);
            // 清空输入框并隐藏登录div
            setPhone("")
            setPassword("")
            setFlag(false)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    const searchTood = async () => {
        try {
            const res = await axios.get(`/arts/search?keyword=${value}`)
            dispatch(search(res.data))
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className={style.box}>
            <div className={style.content}>
                <div className={style.conone}>
                    <Link to="/">
                        <div className={style.username}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-house__easyic"></use>
                            </svg>
                            小智同学的Blog
                        </div>
                    </Link>
                    <div className={style.search}>
                        <input type="text" placeholder="搜索（Ctrl + K）" value={value} onChange={e => setValue(e.target.value)} />
                        <div className={style.icon} onClick={searchTood}>
                            <svg className={style.iconSon} aria-hidden="true">
                                <use xlinkHref="#icon-31sousuo"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={style.loginkey} onClick={() => setFlag(!flag)}>
                    <svg className={style.iconSon} aria-hidden="true">
                        <use xlinkHref="#icon-yuechi"></use>
                    </svg>
                    {/* 登录 */}
                </div>
                <div className={style.loginWay} style={{ display: flag ? "block" : "none" }}>
                    <div className={style.item}>
                        <label htmlFor="phone">手机号</label>
                        <input type="tel" placeholder="手机号" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className={style.item}>
                        <label htmlFor="password">密码</label>
                        <input type="password" placeholder="密码" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className={style.item} onClick={Login}>
                        <button>登录</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
