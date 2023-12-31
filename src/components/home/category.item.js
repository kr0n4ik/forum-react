import { Link } from "react-router-dom"
import Moment from 'react-moment'
import Utils from "../../utils/utils"

const CategoryItem = ({ cid, title, description, icon, count, nick, time, topic, uid , tid, avatar}) => {
    return (
        <div className="item d-flex align-items-center">
            <div className="p-2">
                <img src={`assets/${icon}.png`} className="wh-36" alt="icon" />
            </div>
            <div className="p-2 flex-fill">
                <h4 className="t-lg">
                    <Link to={`/category/${cid}`}>
                        {title}
                    </Link>
                </h4>
                <p className="t-sm">
                    {description}
                </p>
            </div>
            {(count === 0) ? null :
                <>
                    <div className="p-2 w-1s5">
                        <p className="t-md text-right">{count}</p>
                        <p className="t-sm">{Utils.getNoun(count, 'пост', 'поста', 'постов')}</p>
                    </div>
                    <div className="d-none d-xl-block w-s">
                        <Link to={`/profile/${uid}`}>
                            <img className="wh-36" src={`/assets/${avatar}.png`} alt="avatar" />
                        </Link>
                    </div>
                    <div className="p-2 d-none d-lg-block lastPost">
                        <Link className="t-md" to={`/topic/${tid}`}>
                            {topic}
                        </Link>
                        <p className="t-sm">
                            <Link className="t-sm" to={`/profile/${uid}`}>
                                Автор {nick}
                            </Link>,&nbsp; 
                            <Moment unix fromNow>{time}</Moment>
                        </p>
                    </div>
                </>
            }
        </div>
    )
}

export default CategoryItem