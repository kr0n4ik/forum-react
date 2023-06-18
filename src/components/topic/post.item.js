const PostItem = (props) => {
    return (
        <article className="box">
            <div className="d-flex header">
                <div className="w-184 p-2 text-center">{props.nick}</div>
                <div className="p-2">{props.time}</div>
                <div className="ml-auto p-2 dropdown">
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
            <div className="d-flex">
                <div className="w-184 text-center d-none d-sm-block">
                    <div className='position-relative img-110'>
                        <a href=''>
                            <img  src="/assets/show-offliners_3522.png"/>
                        </a>
                        <div className='position-absolute top-100 start-0 translate-middle'>
                            <img  src="test.svg" height={'37px'}/>
                        </div> 
                    </div>
                    <p>Administrators</p>
                    <p><i className="bi bi-chat"></i> 22 <i className="bi bi-check-circle"></i> 5</p>
                </div>
                <div className="p-2" dangerouslySetInnerHTML={{__html: props.html}}>
                </div>
            </div>
        </article>
    )
}
export default PostItem