function Searchtools (props) {
    return(
        <form onChange={props.handleSearchTools}>
            <div className="form-row">
                <div className="col">
                    <input type="text" className="form-control" placeholder="First Name" name='first' id="firstNameSearchBar"/>
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Last Name" name="last" id="lastNameSearchBar"/>
                </div>
            </div>
        </form>
    )
}

export default Searchtools;