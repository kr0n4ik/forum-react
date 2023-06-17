import { useEffect, useLayoutEffect, useState } from "react"
import CategoryItem from "./category.item"
import RestService from "../../services/rest"

const Home = () => {
    const [items, setItems] = useState([])
    useLayoutEffect(() => {
        RestService.getCategory().then(result => {
            setItems(result)
        })
    }, [])
    return (
        <div>
            <div className="box">
                <div>
                    {
                        items.map(item => (
                            <CategoryItem key={item.id} cid={item.id} title={item.title} description={item.description} icon={item.icon} count={item.count} nick={item.last.nick} time={item.last.time} topic={item.last.title} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home