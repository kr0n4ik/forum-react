import { Link } from "react-router-dom"
import Moment from 'react-moment'
import Utils from "../../utils/utils"

const TopicItem = ({ tid, title, count, nick, time, uid, avatar, joined, view }) => {
    return (
        <div className="item d-flex align-items-center">
            <div className="p-2 flex-fill">
                <h4 className="t-lg">
                    <Link to={`/topic/${tid}`}>
                        {title}
                    </Link>
                </h4>
                <p className="t-sm">
                    Автор {nick}, <Moment unix fromNow>{time}</Moment>
                </p>
            </div>
            <div className="p-2 text-right col-2">
                <p className="t-sm">{view} {Utils.getNoun(view, 'просмотр', 'просмотра', 'просмотров')}</p>
                <p className="t-sm">{count} {Utils.getNoun(count, 'пост', 'поста', 'постов')}</p>
            </div>
            <div className="d-none d-xl-block col-0">
                <Link to={`/profile/${uid}`}>
                    <img className="wh-36" src={`/assets/${avatar}.png`} />
                </Link>
            </div>
            <div className="p-2 d-none d-lg-block col-2">
                <Link to={`/profile/${uid}`} className="t-sm text-truncate">
                    {nick}
                </Link>
                <p className="t-sm text-nowrap">
                    <Moment unix fromNow>{joined}</Moment>
                </p>
            </div>
        </div>
    )
}
export default TopicItem