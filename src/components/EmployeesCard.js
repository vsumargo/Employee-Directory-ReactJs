function EmployeesCard (props) {
    return(
        <div className="card col-6 col-md-4 col-lg-3">
            <span index={props.index} onClick={props.handleDeleteBtn}>X</span>
            <img className="card-img-top" src={props.picture} alt={`${props.firstname} ${props.lastname} profile pic`} />
            <div className="card-body"> 
                <div className="card-text"> {props.firstname + ' ' + props.lastname} </div>
                <div className="card-text"> {props.gender + ', ' + props.age} </div>
                <div className="card-text"> {props.email} </div>
            </div>
        </div>
    )
}

export default EmployeesCard;