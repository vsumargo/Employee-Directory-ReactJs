import Sort from './Sort.js';
import EmployeesCard from './EmployeesCard.js'

function EmployeesCardContainer (props) {
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
            {populateCards()}
        </div>
    )
}

export default EmployeesCardContainer;