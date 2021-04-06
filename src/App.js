import React, {useState , useEffect} from "react";
import EmployeesCardContainer from './components/EmpoyeesCardContainer.js';
import Searchtools from './components/Searchtools'

function App (){
    // const [gender, setGender] = useState([]);
    // const [firstName, setFirstName] = useState([]);
    // const [lastName, setLastName] = useState([]);
    // const [email, setEmail] = useState([]);
    // const [age, setAge] = useState([]);

    const [employeesDatabase, setEmployeesDatabase] = useState([]);
    const [sort, setSort] = useState('');
    const [displayEmployees, setDisplayEmployees] = useState([])

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=8")
        .then( resp => resp.json())
        .then( ({results}) => {
            setEmployeesDatabase(results);
            setDisplayEmployees(results);
        })
        .catch( err => console.log(err));
    }, []);

    function handleSortChange (event) {
        const sortMethod = event.target.value;
        console.log(sortMethod);
        switch (sortMethod){
            case 'nameAsc':
                const sortedNameAsc = displayEmployees.slice().sort((a,b) => {
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
                setDisplayEmployees(sortedNameAsc);
                setSort(sortMethod);
                break;
            case 'nameDesc' :
                const sortedNameDesc = displayEmployees.slice().sort((a,b) => {
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
                setDisplayEmployees(sortedNameDesc);
                setSort(sortMethod);
                break;
            case 'oldest':
                const sortedOldest = displayEmployees.slice().sort((a,b) => {
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
                setDisplayEmployees(sortedOldest);
                setSort(sortMethod);
                break;
            default:
                console.log('error');
        }

    }

    function handleDeleteBtn (event) {
        const index = event.target.getAttribute('index');
        console.log(index);
        const updatedEmployeesArray = employeesDatabase.slice();
        updatedEmployeesArray.splice(index,1);
        setEmployeesDatabase(updatedEmployeesArray);
    }

    function handleSearchTools (event) {
        const filterBy = event.target.name;
        // console.log(filterBy);
        const filterValue = event.target.value.toLowerCase();
        // console.log(filterValue);
        const filterLength = filterValue.length;
        // console.log(filterLength);
    
        const newDisplayEmployees = employeesDatabase.filter( employee => {
            const word = employee.name[filterBy].toLowerCase();
            // console.log(word)
            const slicedWord = word.slice(0,filterLength);
            return ( slicedWord === filterValue && employee)
        })

        setDisplayEmployees(newDisplayEmployees);
    }

    return (
        <div className="App container">
            <Searchtools handleSearchTools={handleSearchTools} />
            <EmployeesCardContainer 
                sortvalue={sort}
                employees={displayEmployees}
                handleSortChange={handleSortChange}
                handleDeleteBtn={handleDeleteBtn}
            />
        </div>
        
    )
}

export default App;