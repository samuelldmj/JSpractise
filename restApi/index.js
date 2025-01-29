
import { AppHttp } from "./requestHandler/AppHttp.js";

const serverUrl = `http://127.0.0.1:5000/api`;

// GET REQUEST
let getBtn = document.querySelector('#get-btn');

getBtn.addEventListener('click', function() {
    fetchEmployees();
});

let fetchEmployees = function() {
    let http = new AppHttp();
    let url = `${serverUrl}/employees`;

    http.get(url, function(err, employeeData) {
        if (err) {
            console.error(err);
        } else {
            let tableBody = document.querySelector('#table-body');
            // Clear previous entries before adding new ones
            tableBody.innerHTML = '';
            
            employeeData.forEach(element => {
                let html = `
                    <tr>
                    <td>${element.id}</td>
                    <td>${element.first_name}</td>
                    <td>${element.last_name}</td>
                    <td>${element.gender}</td>
                    <td>${element.email}</td>
                    <td>${element.ip_address}</td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML("beforeend", html); // Use 'beforeend' to append at the end
            });
        }
    });
};



//alternative for better performance
// let fetchEmployees = function() {
//     let http = new AppHttp();
//     let url = `${serverUrl}/employees`;

//     // Use callback to handle the response or error
//     http.get(url, function(err, employeeData) {
//         if (err) {
//             console.error(err); // Log error if there's one
//         } else {
//             console.log(employeeData); // Log successful response

//             // Build all table rows first
//             let html = '';
//             employeeData.forEach((element) => {
//                 html += `
//                     <tr>
//                         <td>${element.id}</td>
//                         <td>${element.first_name}</td>
//                         <td>${element.last_name}</td>
//                         <td>${element.gender}</td>
//                         <td>${element.email}</td>
//                         <td>${element.ip_address}</td>
//                     </tr>
//                 `;
//             });

//             // Now insert the entire HTML into the table body
//             let tableBody = document.querySelector('#table-body');
//             tableBody.innerHTML = html; // Insert all rows at once
//         }
//     });
// };



//POST REQUEST
let postBtn = document.querySelector('#post-btn');
postBtn.addEventListener('click', function(){
    let http = new AppHttp();
    let url = `${serverUrl}/employees`;

    let employeeData = {
        first_name: 'bola',
        last_name: 'Ade',
        email: 'bolade@hotmail.com',
        ip_address: '127.0.0.4', // Corrected IP format
        gender: 'male'
    };

    http.post(url, employeeData, function(err, response) {
        if (err) {
            alert(`Failed to add employee: ${err}`);
        } else {
            alert(JSON.stringify(response));
            fetchEmployees(); // Fetch updated list after successful POST
        }
    });
})


//PUT REQUEST
let putBtn = document.querySelector('#put-btn');
putBtn.addEventListener('click', function(){
    let http = new AppHttp();
    let emID = '_eadrpg3';

    let updateEmployee = {
        id : emID,
        first_name : 'Samuel',
        last_name: 'bolu',
        gender : 'male',
        email : 'samb@hotmail.com',
        ip_address : '127.0.0.1'
    }

    let url = `${serverUrl}/employees/${emID}`;
   
    http.put(url, updateEmployee ,function(err, response){
        if (err) {
            alert(`Failed to add employee: ${err}`);
        } else {
            alert(JSON.stringify(response));
            fetchEmployees(); // Fetch updated list after successful PUT
        }
    })

});

//DELETE  REQUEST
let deleteBtn = document.querySelector('#delete-btn');
deleteBtn.addEventListener('click', function(){
    let http = new AppHttp();
    let emID = '_eadrpg3';
    let url = `${serverUrl}/employees/${emID}`;

    http.delete(url, function(response){
        alert(JSON.stringify(response));
        fetchEmployees();
    })
    
})
