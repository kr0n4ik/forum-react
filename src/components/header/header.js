import { Link } from 'react-router-dom';
import useAuth from '../../hooks/use.auth';

const Header = () => {
    const {auth} = useAuth()
    console.log(auth)
    return (
        <>
            <div className='box d-none d-md-block'>
                <span className="head"></span>
                <div className='d-flex align-items-center'>
                    <h2 className='p-4 flex-fill'>
                        <Link to='/' >
                            Home
                        </Link>
                    </h2>
                    <div className='p-2 d-flex align-items-center'>
                        {
                            (auth?.id) ? 
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