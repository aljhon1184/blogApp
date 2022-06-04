import './post.css';
import  Header  from '../header/Header'
import Posts from '../posts/Posts';

export default function Post({ posts }) {
    return (
        <div className="post">
            {posts.map((p) =>(
                <Posts key={p._id} post={p}/>
            ))}
        </div>
    );
}
