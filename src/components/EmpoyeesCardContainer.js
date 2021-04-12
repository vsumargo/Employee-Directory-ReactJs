import Sort from './Sort.js';
import EmployeesCard from './EmployeesCard.js'

function EmployeesCardContainer (props) {
    if (props.employees === null){
        return
    }

    function populateCards () {
        let employeesCard = props.employees.map( ({gender, name: {first,last}, email, dob:{age}, picture},index) => {
            return (
                <EmployeesCard 
                    key={index}
                    gender={gender}
                    firstname={first}
                    lastname={last}
                    email={email}
                    age={age}
                    picture={picture.large}
                    handleDeleteBtn={props.handleDeleteBtn}
                />
            )
        })
        return employeesCard;
    }

    return (
        <div className="row employeesContainer">
            <Sort 
            value={props.sortvalue} 
            handleSortChange={props.handleSortChange}   
            />
            { props.employees.length === 0 ? <div className="col-12">No employee found matching the searched name</div> : populateCards()}
        </div>
    )
}

export default EmployeesCardContainer;