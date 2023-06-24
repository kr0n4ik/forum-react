import Moment from 'react-moment'
import { Link } from "react-router-dom"

const PostItem = ({ time, nick, html, avatar, uid, posts }) => {
    return (
        <article className="box">
            <div className="d-flex">
                <Link to={`/profile/${uid}`} className="w-184 p-2 text-center">
                    {nick}
                </Link>
                <Moment className='p-2' unix fromNow>{time}</Moment>
                <div className="ml-auto p-2 text-left">
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
            <div className="d-flex">
                <div className="w-184 text-center d-none d-sm-block">
                    <div className="position-relative w-110 ml-auto mb-4">
                        <Link to={`/profile/${uid}`}>
                            <img className="wh-110" src={`/assets/${avatar}.png`} />
                        </Link>
                        <div className='position-absolute top-100 start-0 translate-middle'>
                            <i className="bi bi-android2 wh-36"></i>
                        </div>
                    </div>
                    <p>Administrators</p>
                    <p><i className="bi bi-chat"></i> {posts} &nbsp; <i className="bi bi-check-circle"></i> 5</p>
                </div>
                <div className="p-2" dangerouslySetInnerHTML={{ __html: html }}>
                </div>
            </div>
        </article>
    )
}

export default PostItem