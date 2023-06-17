import { Link } from "react-router-dom"

const CategoryItem = ({cid, title, description, icon, count, nick, time, topic}) => {
    return (
        <div className="item d-flex align-items-center">
            <div className="p-2">
                <img src={`assets/${icon}.png`} className="wh-36"/>
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
            <div className="p-2 text-right">
                <p className="t-md">{count}</p>
                <p className="t-sm">постов</p>
            </div>
            <div className="d-none d-xl-block">
                <a href="#">
                    <img className="wh-36" src="assets/show-offliners_3522.png"/>
                </a>
            </div>
            <div className="p-2 d-none d-lg-block">
                <p className="t-md text-truncate">
                    {topic}
                </p>
                <p className="t-sm text-nowrap">
                    Автор {nick}, {time}
                </p>
            </div>
        </div>
    )
}

export default CategoryItem