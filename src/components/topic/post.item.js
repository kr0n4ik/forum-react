import Moment from 'react-moment'
import { Link } from "react-router-dom"
import Utils from '../../utils/utils'

const PostItem = ({ time, nick, html, avatar, uid, posts, group, reputation }) => {
    return (
        <article className="box">
            <div className="d-flex align-items-center head">
                <Link to={`/profile/${uid}`} className="w-184 p-2 text-center d-none d-md-block">
                    {nick}
                </Link>
                <Moment className='p-2 flex-fill' unix fromNow>{time}</Moment>
                <div className="ml-auto p-2 text-left">
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
            <div className="d-flex">
                <div className="w-184 text-center d-none d-md-block">
                    <div className="pb-4 pt-2">
                        <div className="position-relative wh-110 ml-auto">
                            <Link to={`/profile/${uid}`} className=''>
                                <img className="wh-110" src={`/assets/${avatar}.png`} alt="avatar" />
                            </Link>
                            <div className='position-absolute top-100 start-0 translate-middle'>
                                <i className="bi bi-android2 wh-36"></i>
                            </div>
                        </div>
                    </div>
                    <p>{Utils.GroupIdToString(group)}</p>
                    <p><i className="bi bi-chat"></i> {posts} &nbsp; <i className="bi bi-check-circle"></i> {reputation}</p>
                </div>
                <div className="p-2" dangerouslySetInnerHTML={{ __html: html }}>
                </div>
            </div>
        </article>
    )
}

export default PostItem