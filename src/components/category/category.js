import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import TopicItem from "./topic.item";
import RestService from "../../services/rest";
import Paginator from "../paginator/paginator";
import { UserContext } from "../../services/provider";

const Category = () => {
    const { cid } = useParams()
    const { auth } = useContext(UserContext)
    const [items, setItems] = useState([])
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        RestService.getTopics(cid).then(result => {
            setItems(result)
        })
    }, [cid])
    const count = 10
    const data = items.slice(current * count, (current + 1) * count)
    const paginate = number => setCurrent(number)
    return (
        <>
            <div className="d-flex justify-content-between">
                <div>
                    <Paginator total={items.length} count={count} current={current} paginate={paginate} />
                </div>
                {
                    (auth) ?
                        <div className="text-end pb-3">
                            <Link to={`/topic/add/${cid}`} relative="path" className="btn btn-secondary">Новая тема</Link>
                        </div>
                        : null
                }
            </div>

            <div className="box">
                <span className="head"></span>


                {
                    (data.length === 0) ? <h4 className="p-3 text-center">В этой категории нет тем</h4> :
                        data.map(item => (
                            <TopicItem key={item.id} tid={item.id} title={item.title} count={item.count} nick={item.user.nick} time={item.post.time} uid={item.user.uid} avatar={item.user.avatar} joined={item.user.joined} view={item.view} />
                        ))
                }

            </div>
        </>
    )
}
export default Category