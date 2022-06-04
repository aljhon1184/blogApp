import './write.css'
import { AuthContext } from "../../context/AuthContext"
import { useContext, useState } from "react"
import axios from 'axios'
export default function Write() {
    const[title, setTitle] = useState("");
    const[desc, setDesc] = useState("");
    const[file, setFile] = useState(null);
    const { user } = useContext(AuthContext);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try{
                await axios.post("/upload", data);
            }catch(err){
                console.log(err);
            }
        }
        try{
            const res = await axios.post("/post", newPost);
            window.location.replace("/post/" + res.data._id);
        }catch(err){
            console.log(err);
        }
    };
    return (
        <div className="write">
            {file && (
                <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
            )}
            <form className="writeform" onSubmit={handleSubmit}>
                <div className="writeformGroup">
                    <label htmlFor="fileInput">
                        <i class="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id='fileInput' style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} className="writeInput" autoFocus={true} />
                </div>
                <div className="writeformGroup">
                    <textarea placeholder="Share your Story...." type="text" onChange={e=>setDesc(e.target.value)} className="writeInput writeText"></textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}
