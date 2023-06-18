import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TopicItem from "./topic.item";
import RestService from "../../services/rest";

const Category = () => {
    const { cid } = useParams()
    const [items, setItems] = useState([])
    useEffect(() => {
        RestService.getTopics(cid).then(result => {
            setItems(result)
        })
    }, [])
    return (
        <>
        <div className="text-end pb-3">
            <Link to={`/topic/add/${cid}`} relative="path" className="btn btn-secondary">Новая тема</Link>
        </div>
        <div className="box">
            <span className="head"></span>
            <div>
            {
                items.map(item => (
                    <TopicItem key={item.id} tid={item.id} title={item.title} description={item.description} icon={item.icon} count={item.count} nick={item.last.nick} time={item.last.time} topic={item.last.title} />
                ))
            }
            </div>
        </div>
        </>
    )
}
export default Category