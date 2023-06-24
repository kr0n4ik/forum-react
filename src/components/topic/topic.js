import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RestService from '../../services/rest';
import { useParams, useNavigate, Link } from "react-router-dom";
import PostItem from "./post.item";
import Paginator from "../paginator/paginator";



function Topic() {
    const navigate = useNavigate()
    const { tid } = useParams()
    const [items, setItems] = useState([])
    const [value, setValue] = useState('')
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        RestService.getPosts(tid).then(result => {
            setItems(result)
        })
    }, [tid])
    const sendClick = () => {
        RestService.addPost(tid, value).then(result => {
            RestService.getPosts(tid).then(result => {
                setValue('')
                setItems(result)
            })
        }) 
    }

    const count = 10
    const data = items.slice(current * count, (current + 1) * count)
    const paginate = number => setCurrent(number)

    return (
        <>
            <Paginator total={items.length} count={count} current={current} paginate={paginate}/>
            {
                data.map(item => (
                    <PostItem key={item.id} html={item.html} nick={item.user.nick} time={item.time} avatar={item.user.avatar} posts={item.user.posts} uid={item.user.uid} group={item.user.group} reputation={item.user.reputation}/>
                ))
            }
            <Paginator total={items.length} count={count} current={current} paginate={paginate}/>
            <div className="box">
                <ReactQuill value={value} onChange={setValue} className="p-2" />
                <div className="text-end p-2">
                    <button className="btn btn-secondary" onClick={sendClick}>Отправить ответ</button>
                </div>
            </div>
            <div className="box p-3" >
                <Link onClick={()=> navigate(-1)}>
                    <i className="bi bi-chevron-left"></i>Вернутся к списку тем
                </Link>
            </div>
        </>
    )
}
export default Topic