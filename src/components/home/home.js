import { useEffect, useLayoutEffect, useState } from "react"
import CategoryItem from "./category.item"
import RestService from "../../services/rest"

const Home = () => {
    const [items, setItems] = useState([])
    useLayoutEffect(() => {
        RestService.getCategory().then(result => {
            console.log(result)
            setItems(result)
        })
    }, [])
    return (
        <div>
            <div className="box">
                <div>
                    {
                        items.map(item => (
                            <CategoryItem key={item.id} cid={item.id} title={item.title} description={item.description} icon={item.icon} count={item.count} nick={item.user.nick} avatar={item.user.avatar} time={item.post.time} topic={item.post.title} uid={item.user.uid} tid={item.post.tid}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home