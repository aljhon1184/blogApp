import { Link } from 'react-router-dom'
import { useContext, useRef } from 'react';
import './login.css'
import { loginCall } from "../../apiCall";
import { AuthContext } from '../../context/AuthContext'


export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const {dispatch, isFetching } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        loginCall({
            username: userRef.current.value, password: passwordRef.current.value },
            dispatch
        );
    };
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input className="loginInput" ref={userRef} type="text" placeholder="Enter your Username..." />
                <label>Password</label>
                <input className="loginInput" ref={passwordRef} type="password" placeholder="Enter your Password..." />
                <button className="loginButton">Login</button>
            </form>
            <Link className="link" to="/register"><button className="RegisterButton">Register</button></Link>
        </div>
    )
}
