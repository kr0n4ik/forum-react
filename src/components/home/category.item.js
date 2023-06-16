import { Link } from "react-router-dom"

const CategoryItem = ({cid, title, description, icon, count, nick, time}) => {
    return (
        <div className="item d-flex align-items-center">
            <div className="p-2 img-36">
                <img src={`${icon}.png`}/>
            </div>
            <div className="p-2 flex-fill">
                <h4>
                    <Link to={`/category/${cid}`}  className="logo">
                        {title}
                    </Link>
                </h4>
                <p className="small">
                    {description}
                </p>
            </div>
            <div className="p-2 text-right">
                <p className="middle">{count}</p>
                <p className="small">posts</p>
            </div>
            <div className="d-none d-xl-block img-36">
                <a href="#">
                    <img src="spiderman.jpg"/>
                </a>
            </div>
            <div className="p-2 d-none d-lg-block">
                <p className="middle text-nowrap">
                    A cheese toasty
                </p>
                <p className="small text-nowrap">
                    By {nick}, {time}
                </p>
            </div>
        </div>
    )
}

export default CategoryItem