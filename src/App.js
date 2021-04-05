import React, {useState , useEffect} from "react";
import EmployeesCard from './components/EmployeesCard.js'

function App (){
    // const [gender, setGender] = useState([]);
    // const [firstName, setFirstName] = useState([]);
    // const [lastName, setLastName] = useState([]);
    // const [email, setEmail] = useState([]);
    // const [age, setAge] = useState([]);

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=8")
        .then( resp => resp.json())
        .then( ({results}) => setEmployees(results))
        .catch( err => console.log(err));
    }, []);

    function populateCards () {
        
        let employeesCard = employees.map( ({gender, name: {first,last}, email, dob:{age}, picture},index) => {
            return (
                <EmployeesCard 
                    key={index}
                    index={index}
                    gender={gender}
                    firstname={first}
                    lastname={last}
                    email={email}
                    age={age}
                    picture={picture.large}
                />
            )
        })
        return employeesCard;
    }

    return (
        <div className="App container">
            {/* <Searchtools /> */}
            {/* <EmployeesCardContainer > */}
                {/* <Sort /> */}
                <div className="row">
                    {populateCards()}
                </div>
                
            {/* </EmployeesCardContainer> */}
        </div>
        
    )
}

export default App;