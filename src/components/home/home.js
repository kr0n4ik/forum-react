import { useEffect, useState } from "react"
import CategoryItem from "./category.item"
import RestService from "../../services/rest"

const Home = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        RestService.getCategory().then(result => {
            setItems(result)
        })
    }, [])
    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <h2 className="t-md p-2 flex-fill">Общая группа</h2>
                <i className="bi bi-dash-square p-2"></i>
            </div>
            <div className="box">
                {
                    items.map(item => (
                        <CategoryItem key={item.id} cid={item.id} title={item.title} description={item.description} icon={item.icon} count={item.count} nick={item.user.nick} avatar={item.user.avatar} time={item.post.time} topic={item.post.title} uid={item.user.uid} tid={item.post.tid} />
                    ))
                }
            </div>
        </>
    )
}

export default Home