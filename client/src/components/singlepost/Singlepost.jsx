import './singlepost.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { format } from 'timeago.js'
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

export default function Singlepost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [title, setTitle] = useState("");
    const [desc, setDecs] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    useEffect(() => {
        const getSinglePost = async () => {
            const res = await axios.get("/post/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDecs(res.data.desc);
        };
        getSinglePost();
    }, [path]);

    const handleDelete = async () =>{
        try{
            await axios.delete(`/post/${post._id}`, {
                data: {username: user.username },
            });
            window.location.replace("/");
        }catch(err){
            console.log(err);
        }
    }

    const handleUpdate = async () =>{
        try{
            await axios.put(`/post/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
        }catch (err){
            console.log(err);
        }
    };
    return (
        <div className="singlePost">
            <div className="siglePostWrapper">
                {post.photo && (
                    <img className="singlePostImg" src={PF + post.photo} alt="" />
                )}
                {updateMode ? (
                    <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)} />
                ) : (
                    <h1 className="singlePostTitle">{title}
                    {post.username === user?.username && (
                         <div className="singlePostEdit">
                         <i className="singPostIcon fas fa-edit" 
                         onClick={() => setUpdateMode(true)}></i>
                         <i className="singPostIcon fas fa-trash-alt" onClick={handleDelete}></i>
                     </div>
                    )}
                   </h1>
                )}
               
                <div className="singpostInfo">
                    <span className="singlePostAuthor">Author:
                    <Link to={`/?user=${post.username}`} className="link">
                        <b>{post.username}</b>
                    </Link>
                     </span>
                    <span className="singlePostDate">{format(post.createdAt)}</span>
                </div>
                {updateMode ? (
                    <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDecs(e.target.value)} />
                ) : (
                    <p className="singlePostDesc">{desc}</p>
                )}
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                )}
            </div>
        </div>
    )
}
