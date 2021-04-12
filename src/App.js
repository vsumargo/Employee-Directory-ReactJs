import React, {useState , useEffect} from "react";
import EmployeesCardContainer from './components/EmpoyeesCardContainer.js';
import Searchtools from './components/Searchtools';
import useDebounce from './utils/useDebounce.js';

function App (){
    // const [gender, setGender] = useState([]);
    // const [firstName, setFirstName] = useState([]);
    // const [lastName, setLastName] = useState([]);
    // const [email, setEmail] = useState([]);
    // const [age, setAge] = useState([]);

    const [employeesDatabase, setEmployeesDatabase] = useState([]);
    const [sort, setSort] = useState('');
    const [displayEmployees, setDisplayEmployees] = useState([]);
    const [searchFirstName , setSearchFirstName] = useState('');
    const [searchLastName , setSearchLastName] = useState('');

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=20")
        .then( resp => resp.json())
        .then( ({results}) => {
            setEmployeesDatabase(results);
            // setDisplayEmployees(results);
        })
        .catch( err => console.log(err));
    }, []);

    const searchName = searchFirstName + searchLastName;
    const debounceTerms = useDebounce(searchName,500);

    useEffect(() => {
        if (debounceTerms === ''){
            return setDisplayEmployees(employeesDatabase);
        }
        if (debounceTerms){
            const newDisplayEmployees = employeesDatabase.filter( employee => {
                const firstName = employee.name.first.toLowerCase();
                const lastName = employee.name.last.toLowerCase();
                // console.log(word)
                const slicedFirstName = firstName.slice(0,searchFirstName.length);
                const slicedLastName = lastName.slice(0,searchLastName.length);
                if (slicedFirstName === searchFirstName && slicedLastName === searchLastName){
                    return employee;
                }
                // return ( slicedFirstName === filterValue && employee)
            })
    
            return setDisplayEmployees(newDisplayEmployees);
        }
    }, [debounceTerms]);

    useEffect(() => {
        setDisplayEmployees(employeesDatabase);
        setSearchFirstName('');
        setSearchLastName('');
    }, [employeesDatabase])

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
                setEmployeesDatabase(sortedNameAsc);
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
                setEmployeesDatabase(sortedNameDesc);
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
                setEmployeesDatabase(sortedOldest);
                setSort(sortMethod);
                break;
            default:
                console.log('error');
        }

    }

    function handleDeleteBtn (event) {
        const firstName = event.target.getAttribute('firstname');
        // console.log(firstName);
        const lastName = event.target.getAttribute('lastname');
        // console.log(lastName);
        const updatedEmployeesArray = employeesDatabase.filter( employee => {
            return (
                (firstName !== employee.name.first && lastName !== employee.name.last) && employee
            )
        });
        // console.log(updatedEmployeesArray);
        document.getElementById('firstNameSearchBar').value = '';
        document.getElementById('lastNameSearchBar').value = '';
        setEmployeesDatabase(updatedEmployeesArray);
    }

    function handleSearchTools (event) {
        const filterBy = event.target.name;
        // console.log(filterBy);
        const filterValue = event.target.value.toLowerCase();
        // console.log(filterValue);
        switch (filterBy){
            case 'first':
                setSearchFirstName(filterValue);
                break;
            case 'last':
                setSearchLastName(filterValue);
                break;
            default:
                setSearchLastName('');
                setSearchFirstName('');
        }
        // const filterLength = filterValue.length;
        // // console.log(filterLength);
    
        // const newDisplayEmployees = employeesDatabase.filter( employee => {
        //     const word = employee.name[filterBy].toLowerCase();
        //     // console.log(word)
        //     const slicedWord = word.slice(0,filterLength);
        //     return ( slicedWord === filterValue && employee)
        // })

        // setDisplayEmployees(newDisplayEmployees);
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