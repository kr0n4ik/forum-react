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
        <ul className="pagination">
            <li className="page-item">
                <a className="page-link" href="#" onClick={() => onPrevious()}>Пред.</a></li>
                {
                    lis.map(li => (
                        <li key={li} className={current == li ? "page-item active" : "page-item"} ><a className="page-link" href="#" onClick={() => paginate(li)}>{li + 1}</a></li>
                    ))
                }
            <li className="page-item"><a className="page-link" href="#" onClick={() => onNext()}>След.</a></li>
        </ul>
    )
}
export default Paginator