import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import style from "./Write.module.scss"
const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [cid, setCid] = useState("");
    const [tag, setTag] = useState("");
    // const navigate = useNavigate()

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
            let imgUrl = await upload()


            try {
                state ?
                    await axios.put(`/posts/${state.id}`, {
                        title,
                        desc: value,
                        cid,
                        tag,
                        img: imgUrl ? imgUrl : "https://ts1.cn.mm.bing.net/th/id/R-C.b0ea268fa1be279d112489ce83ad4696?rik=qItsh%2fBiy33hlg&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303215009.jpg&ehk=S6PLWamt%2bMzQV8uO9ugcU5d5M19BpXtCpNz2cRJ7q9M%3d&risl=&pid=ImgRaw&r=0",
                    }) :
                    await axios.post(`/arts`, {
                        title,
                        desc: value,
                        cid,
                        tag,
                        img: imgUrl ? imgUrl : "https://ts1.cn.mm.bing.net/th/id/R-C.b0ea268fa1be279d112489ce83ad4696?rik=qItsh%2fBiy33hlg&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303215009.jpg&ehk=S6PLWamt%2bMzQV8uO9ugcU5d5M19BpXtCpNz2cRJ7q9M%3d&risl=&pid=ImgRaw&r=0",
                        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                    });
                // navigate("/")
            } catch (err) {
                console.log(err);
            }
        }
    };
    return (
        <div className={style.box}>
            <div className={style.title}>
                <span>小智同学的写作室</span>
                <span>我的天空里没有太阳，总是黑夜，但并不暗，因为有东西代替了太阳</span>
            </div>
            <div className={style.write}>
                {/* 输入框 */}
                <div className={style.content}>
                    <input type="text" placeholder="标题" value={title} onChange={e => setTitle(e.target.value)} />
                    <div className={style.editorContainer}>
                        <ReactQuill className={style.editor} theme="snow" value={value} onChange={setValue} />
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
        </div>
    );
}

export default Write;
