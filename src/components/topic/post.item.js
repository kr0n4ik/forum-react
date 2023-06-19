const PostItem = (props) => {
    return (
        <article className="box">
            <div className="d-flex">
                <div className="w-184 p-2 text-center">{props.nick}</div>
                <div className="p-2">{props.time}</div>
                <div className="ml-auto p-2 text-left">
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
            <div className="d-flex">
                <div className="w-184 text-center d-none d-sm-block">
                    <div className="position-relative w-110 ml-auto mb-4">
                        <a href=''>
                            <img src="/assets/show-offliners_3522.png" className="wh-110" />
                        </a>
                        <div className='position-absolute top-100 start-0 translate-middle'>
                            <i className="bi bi-android2 wh-36"></i>
                        </div>
                    </div>
                    <p>Administrators</p>
                    <p><i className="bi bi-chat"></i> 22 &nbsp; <i className="bi bi-check-circle"></i> 5</p>
                </div>
                <div className="p-2" dangerouslySetInnerHTML={{ __html: props.html }}>
                </div>
            </div>
        </article>
    )
}
export default PostItem