function Sort (props) {
    return (
        <div className="col-12">
            <select value={props.value} onChange={props.handleSortChange} >
            <option value="" disabled>Select Option</option>
            <option value="nameAsc">A - Z</option>
            <option value="nameDesc">Z - A</option>
            <option value="oldest">Oldest-Youngest</option>
            </select>
        </div>
        
    )
}

export default Sort