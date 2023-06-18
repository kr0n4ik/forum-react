import { useEffect, useState } from "react";
import RestService from "../../services/rest.service";
import { useParams, Link, useNavigate } from "react-router-dom";
import PostItem from "../items/post.item";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

function Topic() {
    const { tid } = useParams()
    const [items, setItems] = useState([])
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    useEffect(() => {
        RestService.getPosts(tid).then(result => {
            setItems(result)
        })
    }, [])
    const sendClick = () => {
        
    }
    const navigate = useNavigate()
    return (
        <>
            {
                items.map(item => (
                    <PostItem key={item.id} html={item.html} nick={item.nick} time={item.time} avatar={item.avatar}/>
                ))
            }
            <div className="box">
                <span className="head"></span>
                <Editor
                    editorClassName="editor-style"
                    wrapperClassName="editor-wrapper-style"
                    toolbarClassName="editor-toolbar-style"
                    onEditorStateChange={setEditorState}
                    editorState={editorState}
                />
                <div className="text-end pb-3">
                    <button className="btn btn-secondary" onClick={sendClick}>Submit Reply</button>
                </div>
            </div>
            <div className="box p-3" onClick={()=> navigate(-1)}>
                <i className="bi bi-chevron-left"></i>Go to topic listing
            </div>
        </>
    )
}
export default Topic