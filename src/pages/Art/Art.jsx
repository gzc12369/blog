import React from 'react';
import { useState, useEffect } from 'react';
import style from "./Art.module.scss"
import { useLocation } from "react-router-dom";
import moment from 'moment';
const Art = () => {
    const [state, setstate] = useState({});
    const item = useLocation().state?.item

    useEffect(() => {
        setstate(item)
    }, [item]);
    
    return (
        <div className={style.content}>
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
                <div className={style.desc} dangerouslySetInnerHTML={{ __html: state?.desc }}></div>
                <span></span>
            </div>
        </div>
    );
}

export default Art;
