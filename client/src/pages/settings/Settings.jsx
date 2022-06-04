import './settings.css'
import Rightbar from '../../components/rightbar/Rightbar'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';

export default function Settings() {
    const { user, dispatch } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({ type: "UPDATE_START"});
        const updateUser = {
            userid: user._id,
            username,
            email,
            password,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updateUser.imageprofile = filename;
            try{
                await axios.post("/upload", data);
            }catch(err){
                console.log(err);
            }
        }
        try{
            const res = await axios.put("/user/" + user._id, updateUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data});
        }catch(err){
            dispatch({type: "UPDATE_FAILURE"});
        }
    };
    return (
        <div className="settings">
            <div className="settingWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img className="ProfileImg" src={file ? URL.createObjectURL(file) : PF + user.imageprofile} alt="" />
                        <label htmlFor="fileInput">
                            <i className="profileIcon far fa-user"></i>
                        </label>
                        <input type="file" id="fileInput" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}} />
                    </div>
                    <label>Username</label>
                    <input type="text" required onChange={(e) => setUsername(e.target.value)} placeholder={user.username} />
                    <label>Email</label>
                    <input type="Email" required onChange={(e) => setEmail(e.target.value)} placeholder={user.email} />
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password"/>
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && (
                            <span
                            style={{ color: "teal", textAlign: "center", marginTop: "20px" }}
                            >
                            Profile has been updated...
                            </span>
                        )}
                </form>
            </div>
            <Rightbar/>
        </div>
    )
}
