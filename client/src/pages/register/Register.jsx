import { Link } from 'react-router-dom'
import './register.css'
import axios from 'axios'
import { useState } from 'react'

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(false);
        try{
            const res = await axios.post("/auth/register", {
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login");
        }catch(err){
            setError(true);
        }
    }
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input className="registerInput" required onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your Username..." />
                <label>Email</label>
                <input className="registerInput" required onChange={(e) => setEmail(e.target.value)} type="Email" placeholder="Enter your Email..." />
                <label>Password</label>
                <input className="registerInput" required onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your Password..." />
                <button className="registerButton">Register</button>
            </form>
            <Link className="link" to="/login"><button className="registerloginButton">Login</button></Link>
            {error && <span style={{color:"tomato", marginTop:"10px"}}>Something went wrong!</span>}
        </div>
    )
}
