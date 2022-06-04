import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
    const { user, dispatch } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleLogout = () =>{
        dispatch({ type: "LOGOUT"});
    };
    return (
        <div className="top">
            <div className="topLeft">
                <Link className="link" to="/">Blogger</Link>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    
                    <li className="topListItem">
                        <Link className="link" to="/">Home</Link>
                    </li>
                    <li className="topListItem"> <Link className="link" to="/">About</Link></li>
                    <li className="topListItem"> <Link className="link" to="/">Contact</Link></li>
                    <li className="topListItem"> <Link className="link" to="/write">Write</Link></li>
                    {user ? <li className="topListItem" onClick={handleLogout}>Logout</li> : ""}
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                        <Link to="/settings">
                        <img 
                        className="profileImg"
                        src={PF+user?.imageprofile} alt="" />
                        </Link>        
                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">Login</Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/Register">Register</Link>
                            </li>
                        </ul>
                    )
                }
            <i className="topicon fab fa-facebook-square"></i>
            <i className="topicon fab fa-twitter-square"></i>
            <i className="topicon fab fa-youtube"></i>
            <i className="topicon fab fa-instagram"></i>
            </div>
        </div>
    )
}

