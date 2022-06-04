import './rightbar.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Rightbar() {
    const [cat, setCat] = useState([]);

    useEffect(() => {
        const getCat = async () =>{
            const res = await axios.get("/categories");
            setCat(res.data);
        };
        getCat();
    }, []);
    return (
        <div className="rightbar">
            <span className="cat">Category</span>
            <ul className="rightbarList">
                {cat.map((c) =>(
                    <Link to={`/?cat=${c.name}`} className="link"> 
                        <li className="rightbarListitem">{c.name}</li>
                    </Link> 
                ))}
            </ul>
        </div>
    )
}
