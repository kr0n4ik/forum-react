import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RestService from '../../services/rest';
import { useParams, useNavigate } from "react-router-dom";
import PostItem from "./post.item";


function Topic() {
    const navigate = useNavigate()
    const { tid } = useParams()
    const [items, setItems] = useState([])
    const [value, setValue] = useState('')
    useEffect(() => {
        RestService.getPosts(tid).then(result => {
            setItems(result)
        })
    }, [])
    const sendClick = () => {
        RestService.addPost(tid, value).then(result => {
            RestService.getPosts(tid).then(result => {
                setValue('')
                setItems(result)
            })
        }) 
    }
    return (
        <>
            {
                items.map(item => (
                    <PostItem key={item.id} html={item.html} nick={item.nick} time={item.time} avatar={item.avatar}/>
                ))
            }
            <div className="box">
                <span className="head"></span>
                <ReactQuill value={value} onChange={setValue} />
                <div className="text-end pb-3">
                    <button className="btn btn-secondary" onClick={sendClick}>Submit Reply</button>
                </div>
            </div>
            <div className="box p-3" >
                <a href="" onClick={()=> navigate(`/category/${tid}`)}>
                    <i className="bi bi-chevron-left"></i>Вернутся к списку тем
                </a>
            </div>
        </>
    )
}
export default Topic