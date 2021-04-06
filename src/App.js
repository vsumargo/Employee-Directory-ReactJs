import React, {useState , useEffect} from "react";
import EmployeesCardContainer from './components/EmpoyeesCardContainer.js'

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

    function handleDeleteBtn (event) {
        const index = event.target.getAttribute('index');
        console.log(index);
        const updatedEmployeesArray = employees.slice();
        updatedEmployeesArray.splice(index,1);
        setEmployees(updatedEmployeesArray);
    }

    return (
        <div className="App container">
            {/* <Searchtools /> */}
            <EmployeesCardContainer 
                sortvalue={sort}
                employees={employees}
                handleSortChange={handleSortChange}
                handleDeleteBtn={handleDeleteBtn}
            />
        </div>
        
    )
}

export default App;