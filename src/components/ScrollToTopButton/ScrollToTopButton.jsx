import React, { useState, useEffect } from 'react';
import style from "./ScrollToTopButton.module.scss"

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const topFunction = () => {
        var begin = setInterval(() => {
            document.documentElement.scrollTop = document.documentElement.scrollTop - 50;
            if (document.documentElement.scrollTop <= 20) {
                document.documentElement.scrollTop = 0;
                clearInterval(begin) // 清除定时器，防止内存泄漏
            }
        }, 10)
    };

    useEffect(() => {
        window.onscroll = scrollFunction;

        // 清除effect，以防止内存泄漏
        return () => {
            window.onscroll = null;
        };
    }, []); // 仅在组件挂载和卸载时运行

    return (
        <div>
            {showButton && <div className={style.box} onClick={topFunction}>👆</div>}
        </div>
    );
};

export default ScrollToTopButton;