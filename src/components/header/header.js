import { Link } from 'react-router-dom';
import { UserContext } from "../../services/provider";
import { useContext } from 'react';

const Header = () => {
    const { auth } = useContext(UserContext)
    return (
        <>
            <div className='d-block d-md-none mobile-header mb-3 d-flex align-items-center p-2'>
                <div className='flex-fill d-flex align-items-center'>
                    <img src="/logo.png" className='m-2' alt='forum' />
                    <h2>Форум</h2>
                </div>
                <div className='p-2 d-flex align-items-center'>
                    <Link to="/" className='btn btn-secondary'><i className="bi bi-house"></i></Link>
                    &nbsp;
                    {
                        (auth) ?
                            <>
                                <Link to={`profile/${auth.id}`} className='btn btn-secondary'><i className="bi bi-person-fill"></i></Link>
                                &nbsp;
                                <Link to='logout' className='btn btn-secondary'><i className="bi bi-escape"></i></Link>
                            </> : <>
                                <Link to='register' className='btn btn-secondary'><i className="bi bi-universal-access"></i></Link>
                                &nbsp;
                                <Link to='login' className='btn btn-secondary'><i className="bi bi-fingerprint"></i></Link>
                            </>
                    }
                </div>
            </div>
            <div className='box d-none d-md-block'>
                <span className="head"></span>
                <div className='d-flex align-items-center'>
                    <img src="/logo.png" className='p-2' alt='logo' />
                    <h2 className='flex-fill'>
                        <Link to='/' >
                            Home
                        </Link>
                    </h2>
                    <div className='p-2 d-flex align-items-center'>
                        {
                            (auth) ?
                                <>
                                    <Link to={`profile/${auth.id}`} className='btn btn-secondary'><i className="bi bi-person-fill hbtn"></i></Link>
                                    &nbsp;
                                    <Link to='logout' className='btn btn-secondary'><i className="bi bi-escape hbtn"></i></Link>
                                </> : <>
                                    <Link to='register' className='btn btn-secondary'><i className="bi bi-universal-access hbtn"></i></Link>
                                    &nbsp;
                                    <Link to='login' className='btn btn-secondary'><i className="bi bi-fingerprint hbtn"></i></Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header