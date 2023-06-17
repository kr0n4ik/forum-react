import { Link, useNavigate } from 'react-router-dom';
import RestService from '../../services/rest';

const Header = () => {
    const navigate = useNavigate()
    const goHome = () => {
        navigate('/')
    }
    return (
        <div className="header d-flex align-items-center">
            <div className="p-2"><Link to='login'>Sign In</Link></div>
            <div className="p-2"><Link to='register'>Sign Up</Link></div>
            <div className="p-2"><button onClick={RestService.onLogout}>Logout</button></div>
            <div className="p-2"><button onClick={goHome}>Домой</button></div>
            <div className="p-2"><i className="bi bi-alarm-fill" style={{ fontSize: 24 }}></i></div>
        </div>
    )
}

export default Header