import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RestService from '../../services/rest';

const TopicAdd = () => {
    const navigate = useNavigate()
    const { cid } = useParams()
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const sendClick = () => {
        RestService.addTopic(cid, title, value).then(result => {
            if (result) {
                navigate(`/category/${cid}`)
            }
        })
    }
    return (
        <>
        <div className="box">
                <div className='head'></div>
                <h1 className='p-3'>Новая тема</h1>
            </div>
            <div className="box p-3">
                <label className="form-label">Название темы</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={title} onChange={event => setTitle(event.target.value)} placeholder="Название темы" />
                </div>
                <ReactQuill value={value} onChange={setValue} />
                <div className="text-center p-2">
                    <button onClick={sendClick} type="button" className="btn btn-secondary btn-lg">Создать тему</button>
                </div>
            </div> 
        </>
    )
}

export default TopicAdd