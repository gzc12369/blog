import React from 'react';
import style from "./Tootip.module.scss"
import delete1 from "../../assets/img/delete.png"
const Tooltip = ({ text, onClick }) => {
    const hide = () => {
        onClick(false)
    }
    return (
        <div className={style.box}>
            {text}
            <div className={style.imgBox}>
                <img src={delete1} onClick={hide} />
            </div>
        </div>
    );
}

export default Tooltip;
