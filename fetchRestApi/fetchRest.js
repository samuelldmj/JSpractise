// import { FetchHttp } from "./requestHandler/fetchHttp.js";

// let serverUrl = `http://127.0.0.1:5000/api`;


//GET OPERATION
// let getBtn = document.getElementById('get-btn');
// getBtn.addEventListener('click', function(){
//    fetchEmployees();
// })

//display all employees
// let fetchEmployees = function(){
//     let url = `${serverUrl}/employees`;

//     FetchHttp.get(url).then( employees => {
//      console.log(employees);
//      let tableBody = document.querySelector('#table-body');
//      // Clear previous entries before adding new ones
//      tableBody.innerHTML = '';

//      for (const employee of employees) {
//        let html = `
//             <tr>
//             <td>${employee.id}</td>
//             <td>${employee.first_name}</td>
//             <td>${employee.last_name}</td>
//             <td>${employee.email}</td>
//             <td>${employee.gender}</td>
//             <td>${employee.ip_address}</td>
//             </tr>
//        `    
//        tableBody.insertAdjacentHTML('beforeend', html);  
//      }

     
//     }).catch(err => {
//      console.error(err);
//     })
// }


//POST operations

// let postBtn = document.getElementById('post-btn');

// postBtn.addEventListener('click', function(){
//         let url = `${serverUrl}/employees`;
    
//         let employeeData = {
//             first_name: 'bola',
//             last_name: 'Ade',
//             email: 'bolade@hotmail.com',
//             ip_address: '127.0.0.4', // Corrected IP format
//             gender: 'male'
//         };

//         FetchHttp.post(url, employeeData).then(jsonResponse => {

//             console.log(jsonResponse);
//             fetchEmployees();
//         }).catch(err => {
//      console.error(err);
//     })
// })


//PUT OPERATION
// let putBtn = document.getElementById('put-btn');

// putBtn.addEventListener('click', function(){

//     let emID = '_0jwqbx4';
//     let url = `${serverUrl}/employees/${emID}`;

//     let updateEmployee = {
//         id : emID,
//         first_name : 'Samuel',
//         last_name: 'bolu',
//         gender : 'male',
//         email : 'samb@hotmail.com',
//         ip_address : '127.0.0.1'
//     }

//     FetchHttp.put(url, updateEmployee).then(jsonResponse => {
//         console.log(jsonResponse);
//         fetchEmployees()
//     })
//     .catch(err => {
//         console.error(err)
//     })
// })

//DELETE OPERATION
// let deleteBtn = document.querySelector('#delete-btn');

// deleteBtn.addEventListener('click', function(){
//     let emID = '_e03lls2';
//     let url = `${serverUrl}/employees/${emID}`;

//     FetchHttp.delete(url).then(jsonResponse => {
//             console.log(jsonResponse);
//             console.log('Hello');
//             fetchEmployees();
//     }).catch(err => {
//         console.error(err);
//     })
// })




/*
======================================================================================================
                    USING ASYNC AND AWAIT
======================================================================================================

 */

import { FetchHttp } from "./requestHandler/fetchHttp.js";

let serverUrl = `http://127.0.0.1:5000/api`;


// GET request

let getBtn = document.getElementById('get-btn');
getBtn.addEventListener('click', function(){
   fetchEmployees();
})


async function fetchEmployees() {
    try {
        let url = `${serverUrl}/employees`;
        const employees = await FetchHttp.get(url);

        let tableBody = document.querySelector('#table-body');
     // Clear previous entries before adding new ones
     tableBody.innerHTML = '';

     for (const employee of employees) {
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

async  function createEmployee(){
    let url = `${serverUrl}/employees`;
    try{
        let employeeData = {
            first_name: 'bola',
            last_name: 'Ade',
            email: 'bolade@hotmail.com',
            ip_address: '127.0.0.4',
            gender: 'male'
        };

        let createEmployee = await FetchHttp.post(url, employeeData)
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
    let emID = '_dyf79y5' ;
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

        let createEmployee = await FetchHttp.put(url, updateEmployee)
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
     let emID = '_7v564dr' ;
     let url = `${serverUrl}/employees/${emID}`;

     let jsonResponse = await FetchHttp.delete(url);
     console.log(jsonResponse);
     return jsonResponse;
    } catch (error) {
        console.error(error);
    }
}