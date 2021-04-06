function Searchtools (props) {
    return(
        <form onChange={props.handleSearchTools}>
            <div className="form-row">
                <div className="col">
                    <input type="text" className="form-control" placeholder="First Name" name='first' />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Last Name" name="last" />
                </div>
            </div>
        </form>
    )
}

export default Searchtools;