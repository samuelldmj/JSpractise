let serverUrl = `http://127.0.0.1:5000/api`;


// GET request

let getBtn = document.getElementById('get-btn');
getBtn.addEventListener('click', function(){
   fetchEmployees();
})


async function fetchEmployees() {
    try {
        let url = `${serverUrl}/employees`;
        const response = await axios.get(url);
        let employeesData = await response.data;
        console.log(employeesData);
        let tableBody = document.querySelector('#table-body');
     // Clear previous entries before adding new ones
     tableBody.innerHTML = '';

     for (const employee of employeesData) {
       let html = `
            <tr>
            <td>${employee.id}</td>
            <td>${employee.first_name}</td>
            <td>${employee.last_name}</td>
            <td>${employee.email}</td>
            <td>${employee.gender}</td>
            <td>${employee.ip_address}</td>
            </tr>
       `    
       tableBody.insertAdjacentHTML('beforeend', html);  
     }
        
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}



// POST request
let postBtn = document.getElementById('post-btn');

postBtn.addEventListener('click', function(){
    createEmployee();
    fetchEmployees();

})

async function createEmployee(){
    let url = `${serverUrl}/employees`;
    try{
        let employeeData = {
            first_name: 'bola',
            last_name: 'Ade',
            email: 'bolade@hotmail.com',
            ip_address: '127.0.0.4',
            gender: 'male'
        };

        let createEmployee = await axios.post(url, employeeData);
        
            console.log(createEmployee);
            return createEmployee;
        }catch(err ) {
         console.error(err);
        }
}


// PuT request
let putBtn = document.getElementById('put-btn');

putBtn.addEventListener('click', function(){
    updateEmployee();
    fetchEmployees();

})

async  function updateEmployee(){
    let emID = '_0blo03j' ;
    let url = `${serverUrl}/employees/${emID}`;
    try{
      
    let updateEmployee = {
        id : emID,
        first_name : 'Samuel',
        last_name: 'bolu',
        gender : 'male',
        email : 'samb@hotmail.com',
        ip_address : '127.0.0.1'
    }

        let createEmployee = await axios.put(url, updateEmployee)
            console.log(createEmployee);
            return createEmployee;
        }catch(err ) {
         console.error(err);
        }
}



// delete request
let deleteBtn = document.querySelector('#delete-btn');

deleteBtn.addEventListener('click', function(){
    deleteEmployee();
    fetchEmployees();
})


async function deleteEmployee(){
    try {
     let emID = '_tuxaot1' ;
     let url = `${serverUrl}/employees/${emID}`;

     let jsonResponse = await axios.delete(url);
     console.log(jsonResponse);
     return jsonResponse;
    } catch (error) {
        console.error(error);
    }
}