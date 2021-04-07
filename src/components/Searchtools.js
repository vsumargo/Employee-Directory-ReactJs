function Searchtools (props) {
    return(
        <div className="row searchtools">
            <div className="col-12 filtertoolsHeader">Filter Tools</div>
            <form onChange={props.handleSearchTools} className="col">
                <div className="form-row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="First Name" name='first' id="firstNameSearchBar"/>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Last Name" name="last" id="lastNameSearchBar"/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Searchtools;