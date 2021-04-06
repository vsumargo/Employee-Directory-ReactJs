import React, {useState , useEffect} from "react";
import EmployeesCard from './components/EmployeesCard.js'
import Sort from './components/Sort.js'

function App (){
    // const [gender, setGender] = useState([]);
    // const [firstName, setFirstName] = useState([]);
    // const [lastName, setLastName] = useState([]);
    // const [email, setEmail] = useState([]);
    // const [age, setAge] = useState([]);

    const [employees, setEmployees] = useState([]);
    const [sort, setSort] = useState('');

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

    function handleSortChange (event) {
        const sortMethod = event.target.value;
        console.log(sortMethod);
        switch (sortMethod){
            case 'nameAsc':
                const sortedNameAsc = employees.slice().sort((a,b) => {
                    const objA = a.name.first.toLowerCase();
                    const objB = b.name.first.toLowerCase();
                    
                    if (objA < objB){
                        return -1;
                    } else if (objA > objB){
                        return 1;
                    } else {
                        return 0;
                    }
                })
                console.log(sortedNameAsc);
                setEmployees(sortedNameAsc);
                setSort(sortMethod);
                break;
            case 'nameDesc' :
                const sortedNameDesc = employees.slice().sort((a,b) => {
                    const objA = a.name.first.toLowerCase();
                    const objB = b.name.first.toLowerCase();
                    
                    if (objA < objB){
                        return 1;
                    } else if (objA > objB){
                        return -1;
                    } else {
                        return 0;
                    }
                })
                console.log(sortedNameDesc);
                setEmployees(sortedNameDesc);
                setSort(sortMethod);
                break;
            case 'oldest':
                const sortedOldest = employees.slice().sort((a,b) => {
                    const objA = a.dob.age;
                    const objB = b.dob.age;
                    
                    if (objA < objB){
                        return 1;
                    } else if (objA > objB){
                        return -1;
                    } else {
                        return 0;
                    }
                })
                console.log(sortedOldest);
                setEmployees(sortedOldest);
                setSort(sortMethod);
                break;
            default:
                console.log('error');

        }

    }

    return (
        <div className="App container">
            {/* <Searchtools /> */}
            {/* <EmployeesCardContainer > */}
                <Sort value={sort} handleSortChange={handleSortChange} />
                <div className="row">
                    {populateCards()}
                </div>
                
            {/* </EmployeesCardContainer> */}
        </div>
        
    )
}

export default App;