import { Link, useNavigate } from 'react-router-dom';
import RestService from '../../services/rest';

const Header = () => {
    const navigate = useNavigate()
    const goHome = () => {
        navigate('/')
    }
    return (
        <>
            <div className='box'>
                <span className="head"></span>
                <h2 className='p-4'>
                    <Link to='/' >
                        Home
                    </Link>
                </h2>
            </div>
            <div className="header d-flex align-items-center">
                <div className="p-2"><Link to='login'>Sign In</Link></div>
                <div className="p-2"><Link to='register'>Sign Up</Link></div>
                <div className="p-2"><button onClick={RestService.onLogout}>Logout</button></div>
            </div>
        </>

    )
}

export default Header