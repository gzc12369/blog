import React from 'react';
import style from "./Footer.module.scss"
const Footer = () => {
    return (
        <div className={style.box}>
            <div className={style.content}>
                <div>商务合作 weChat：XiaozhiClassmate</div>
                <div>© 2023 小智教你写博客.</div>
            </div>
        </div>
    );
}

export default Footer;
