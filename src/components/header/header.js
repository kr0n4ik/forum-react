import { Link } from 'react-router-dom';
import RestService from '../../services/rest';
import { useState, useEffect } from "react";

const Header = () => {
    return (
        <div className="header d-flex align-items-center">
            <div className="p-2"><Link to='login'>Sign In</Link></div>
            {(!RestService.token) ? <div className="p-2"><Link to='register'>Sign Up</Link></div> : null}
            <div className="p-2"><button onClick={RestService.onLogout}>Logout</button></div>
            <div className="p-2"><i className="bi bi-alarm-fill" style={{ fontSize: 24 }}></i></div>
        </div>
    )
}

export default Header