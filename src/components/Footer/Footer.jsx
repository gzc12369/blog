import React from 'react';
import style from "./Footer.module.scss"
const Footer = () => {
    return (
        <div className={style.box}>
            <div className={style.content}>
                <div>© 2023 All rights reserved.</div>
                <div>京ICP备17006801号-2  Theme by handsome</div>
            </div>
        </div>
    );
}

export default Footer;
