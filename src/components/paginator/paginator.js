const Paginator = ({ total, count, current, paginate }) => {
    const lis = []
    const all = Math.ceil(total / count)
    for (let i = 0; i < all; i++) {
        lis.push(i)
    }

    const onPrevious = () => {
        if (current > 0) {
            paginate(--current)
        }
    }

    const onNext = () => {
        if (current < all - 1) {
            paginate(++current)
        }
    }

    return (
        (lis.length > 1) ?
        <div className="btn-group pb-3">
                <button type="button" className="btn btn-secondary" onClick={() => onPrevious()}>Пред.</button>
                {
                    lis.map(li => (
                        <button key={li} className={current === li ? "btn btn-primary" : "btn btn-secondary"} onClick={() => paginate(li)}>{li + 1}</button>
                    ))
                }
            <button type="button" className="btn btn-secondary" onClick={() => onNext()}>След.</button>
        </div>
        :null
    )
}
export default Paginator