import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import style from "./Write.module.scss"
import Tooltip from '../../components/Tooltip/Tooltip';
const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [img, setImg] = useState(state?.img || null);
    const [cid, setCid] = useState(state?.cid || "");
    const [tag, setTag] = useState(state?.tag || "");

    const [flag, setFlag] = useState(false);
    const [text, setText] = useState(false);
    const navigate = useNavigate()

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        // [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];
    const modules = {
        toolbar: toolbarOptions
    }

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data.url;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (file) {
            const imgUrl = await upload()
            setImg(imgUrl)
        }

        try {
            const res = state ?
                // 更新文章
                await axios.put(`/arts/${state.id}`, {
                    title,
                    desc: value,
                    cid,
                    tag,
                    img: img ? img : "https://ts1.cn.mm.bing.net/th/id/R-C.b0ea268fa1be279d112489ce83ad4696?rik=qItsh%2fBiy33hlg&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303215009.jpg&ehk=S6PLWamt%2bMzQV8uO9ugcU5d5M19BpXtCpNz2cRJ7q9M%3d&risl=&pid=ImgRaw&r=0",
                }) :
                // 上传文章
                await axios.post(`/arts`, {
                    title,
                    desc: value,
                    cid,
                    tag,
                    img: img ? img : "https://ts1.cn.mm.bing.net/th/id/R-C.b0ea268fa1be279d112489ce83ad4696?rik=qItsh%2fBiy33hlg&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303215009.jpg&ehk=S6PLWamt%2bMzQV8uO9ugcU5d5M19BpXtCpNz2cRJ7q9M%3d&risl=&pid=ImgRaw&r=0",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
            setText(res.data)
            setFlag(true)
        } catch (err) {
            console.log(err);
        }

    };
    // 隐藏提示框
    const hideTooltip = (bool) => {
        setFlag(bool)
        setTimeout(() => {
            navigate("/")
        }, 2000);
    }

    return (
        <div className={style.box}>
            {flag && <Tooltip text={text} onClick={hideTooltip}></Tooltip>}
            <div className={style.title}>
                <span>小智同学的写作室</span>
                <span>我的天空里没有太阳，总是黑夜，但并不暗，因为有东西代替了太阳</span>
            </div>
            <div className={style.write}>
                {/* 输入框 */}
                <div className={style.content}>
                    <input type="text" placeholder="标题" value={title} onChange={e => setTitle(e.target.value)} />
                    <div className={style.editorContainer}>
                        <ReactQuill className={style.editor} theme="snow" modules={modules} value={value} onChange={setValue} />
                    </div>
                </div>
                {/* 侧边栏 */}
                <div className={style.menu}>
                    <div className={style.item}>
                        <h1>发布</h1>
                        <span>
                            <b>状态:</b> 草稿
                        </span>
                        <span>
                            <b>可见性:</b> 公开
                        </span>
                        <input style={{ display: "none" }} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])} />
                        <label className={style.file} htmlFor="file">Upload Image</label>
                        <div className={style.buttons}>
                            <button>修改文章</button>
                            <button onClick={handleClick}>发布文章</button>
                        </div>
                    </div>
                    <div className={style.item}>
                        <h1>分类</h1>
                        <div className={style.cat}>
                            <input type="radio" checked={cid === 1} name="cid" id="art" value="art" onChange={e => setCid(1)} />
                            <label htmlFor="art">前端</label>
                        </div>

                        <div className={style.cat}>
                            <input type="radio" checked={cid === 2} name="cid" id="science" value="science" onChange={e => setCid(2)} />
                            <label htmlFor="science">后端</label>
                        </div>

                        <div className={style.cat}>
                            <input type="radio" checked={cid === 3} name="cid" id="technology" value="technology" onChange={e => setCid(3)} />
                            <label htmlFor="technology">数据库</label>
                        </div>

                        <div className={style.cat}>
                            <input type="radio" checked={cid === 4} name="cid" id="cinema" value="cinema" onChange={e => setCid(4)} />
                            <label htmlFor="cinema">生活</label>
                        </div>
                        <div className={style.cat}>
                            <label htmlFor="tag">标签：</label>
                            <input type="text" placeholder="tag" id="tag" style={{ padding: "5px", marginLeft: "10px" }} value={tag} onChange={e => setTag(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="ql-snow" style={{ backgroundColor: "#FFF", borderRadius: "20px", padding: "30px", color: "#000", boxShadow: "0 0 8  px 1px #999", fontFamily: "AaBanRuoKaiShu" }}>
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }}></div>
            </div>
            <ScrollToTopButton></ScrollToTopButton>
        </div>
    );
}

export default Write;
