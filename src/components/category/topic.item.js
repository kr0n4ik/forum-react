import { Link } from "react-router-dom"

const TopicItem = ({tid, title, description, count, nick, time, topic, icon}) => {
    return (
        <div className="item d-flex align-items-center">
            <div className="p-2 flex-fill">
                <h4 className="t-lg">
                    <Link to={`/topic/${tid}`}>
                        {title}
                    </Link>
                </h4>
                <p className="t-sm">
                    Автор {nick}, {time}
                </p>
            </div>
            <div className="p-2 text-right">
                <p className="t-sd">{count}</p>
                <p className="t-sm">posts</p>
            </div>
            <div className="d-none d-xl-block">
                <a href="#">
                    <img className="wh-36" src="/assets/show-offliners_3522.png"/>
                </a>
            </div>
            <div className="p-2 d-none d-lg-block">
                <p className="t-md text-truncate">
                    {nick}
                </p>
                <p className="t-sm text-nowrap">
                    {time}
                </p>
            </div>
        </div>
    )
}
export default TopicItem