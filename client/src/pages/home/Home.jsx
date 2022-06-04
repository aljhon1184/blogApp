import './home.css';
import React from 'react'
import Topbar from '../../components/topbar/Topbar';
import Post from '../../components/post/Post';
import Rightbar from '../../components/rightbar/Rightbar';
import Header from '../../components/header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function Home() {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get("/post" + search);
            setPosts(res.data);
        };
        getPosts();
    }, [search]);
    return (
        <>
            <div>
                <Header />
                <div className="main_container">
                    <Post posts={posts} />
                    <Rightbar />
                </div>
            </div>
        </>
    )
}
