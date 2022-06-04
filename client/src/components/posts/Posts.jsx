import './posts.css'
import { format } from "timeago.js";
import { Link } from 'react-router-dom';

export default function Posts({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="postContent">
            {post.photo && (
                <img className="postImg" src={PF + post.photo} alt="" />
            )}
            <div className="postCats">
                {post.categories.map((c) => (
                    <span className="postCat">{c.name}</span>
                ))}
            </div>
            <Link to={`/post/${post._id}`} className="link">
                <span className="postTitle">{post.title}</span>
            </Link>
            <span className="date">
                {format(post.createdAt)}
            </span>
            <span className="postDesc">{post.desc}</span>
            
        </div>
    )
}
