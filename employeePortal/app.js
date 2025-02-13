// import { AppHttp } from "./httpHandler/AppHttp.js";


// const serverUrl = `http://127.0.0.1:5000/api`;
// //GET REQUEST ON PAGE LOAD
// window.addEventListener('DOMContentLoaded', function(){
//     fetchAllEmployees();
// })

// let fetchAllEmployees = function (){
//     let http = new AppHttp();
//     let url = `${serverUrl}/employees`;

//     http.get(url, function(err, employeesData){
//         if (err) {
//             console.error(err);
//         } else {
//             let tableBody = document.querySelector('#table-body');
//             // Clear previous entries before adding new ones
//             tableBody.innerHTML = '';

//             employeesData.forEach(element => {
//                 let html = `
//                     <tr>
//                     <td>${element.id}</td>
//                     <td>${element.first_name}</td>
//                     <td>${element.last_name}</td>
//                     <td>${element.gender}</td>
//                     <td>${element.email}</td>
//                     <td>${element.ip_address}</td>
//                     <td>
//                         <button type="button" id="put-btn" class="btn btn-success btn-sm">Update</button>
//                         <button type="button" id="delete-btn" class="btn btn-warning btn-sm">DELETE</button>
//                     </td>
//                     </tr>
//                 `;
//                 tableBody.insertAdjacentHTML("beforeend", html); // Use 'beforeend' to append at the end
//             });
//             console.log(employeesData);
//         }
//     })
// }


//POST OPERATION when form is submitted using FormData API
// let employeeForm = document.querySelector('#add-employee');

// employeeForm.addEventListener('submit', function(e){
//     e.preventDefault();
//     let formData = new FormData(employeeForm);

//     for (let [key, value] of formData.entries()) {
//         console.log(`${key}: ${value}`);
//       }

//       //reset form input
//     //   employeeForm.reset();

//       // Close the modal after form submission
//       let modal = bootstrap.Modal.getInstance(document.getElementById('add-employee-form'));
//       if (modal) {
//           modal.hide();
//       }

// })


/*
============================================================================================
REFACTORED CODE
===========================================================================================
 */

import { AppHttp } from "./httpHandler/AppHttp.js";

const serverUrl = `http://127.0.0.1:5000/api`;



// Function to fetch all employees
let fetchAllEmployees = function () {
    let http = new AppHttp();
    let url = `${serverUrl}/employees`;

    http.get(url, function (err, employeesData) {
        if (err) {
            console.error(err);
        } else {
            renderEmployees(employeesData);
            console.log(employeesData);
        }
    });
}



// Function to render employees in the table
function renderEmployees(employeesData) {
    let tableBody = document.querySelector('#table-body');
    // Clear previous entries
    tableBody.innerHTML = '';

    employeesData.forEach(element => {
        let html = `
            <tr>
            <td>${element.id}</td>
            <td>${element.first_name}</td>
            <td>${element.last_name}</td>
            <td>${element.gender}</td>
            <td>${element.email}</td>
            <td>${element.ip_address}</td>
            <td>
                <button type="button" class="btn btn-success btn-sm update">Update</button>
                <button type="button" class="btn btn-warning btn-sm delete">DELETE</button>
            </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", html);
    });
}

// GET REQUEST ON PAGE LOAD
window.addEventListener('DOMContentLoaded', fetchAllEmployees);


// POST OPERATION when form is submitted
let employeeForm = document.querySelector('#add-employee');

employeeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let url = `${serverUrl}/employees`;

    let employee = {
        first_name: document.getElementById('add-first-name').value,
        last_name: document.getElementById('add-last-name').value,
        email: document.getElementById('add-email').value,
        ip_address: document.getElementById('add-ip').value,
        gender: document.querySelector('input[name="inlineRadioOptions"]:checked')?.value || 'unknown'
    };

    let http = new AppHttp();

    http.post(url, employee, function (err, response) {
        if (err) {
            console.error(err);
        } else {
            alert(JSON.stringify(response));
            fetchAllEmployees(); // Refresh the employee list
            employeeForm.reset(); // Reset form

            // Close the modal after form submission
            let modal = bootstrap.Modal.getInstance(document.getElementById('add-employee-form'));
            if (modal) {
                modal.hide();
            }
        }
    });
});

//HANDLING DELETE REQUEST ON EMPLOYER
let tableBody = document.querySelector('#table-body');

tableBody.addEventListener('click', function (e) {
    let http = new AppHttp();

    let targetElement = e.target;
    if (targetElement.classList.contains('delete')) {
        let selectedEmployeeRecordId = targetElement.parentElement.parentElement.firstElementChild.textContent;
        let url = `${serverUrl}/employees/${selectedEmployeeRecordId}`;

        http.delete(url, function (response) {
            alert(JSON.stringify(response));
            fetchAllEmployees();
        })
    }


    //PUT OR UPDATE OPERATION
    if (targetElement.classList.contains('update')) {
        let selectedEmployeeRecordId = targetElement.parentElement.parentElement.firstElementChild.textContent;
        let url = `${serverUrl}/employees`;
        http.get(url, function (err, employeesData) {
            if (err) {
                console.error(err);
            } else {
                let selectedEmployeeRecord = employeesData.find(employee => {
                    return employee.id === selectedEmployeeRecordId.trim();
                })

                console.log(selectedEmployeeRecord);
                populateSelectedModal(selectedEmployeeRecord);
            }
        });
    }
})

let populateSelectedModal = (selectedEmployeeRecord) => {
    let updateEmpId = document.querySelector('#update-emp-id');
    if (updateEmpId) updateEmpId.value = selectedEmployeeRecord.id;
    else console.error('Element with id update-emp-id not found');

    // document.querySelector('#update-emp-id').value = selectedEmployeeRecord.id;
    document.querySelector('#update-first-name').value = selectedEmployeeRecord.first_name;
    document.querySelector('#update-last-name').value = selectedEmployeeRecord.last_name;
    document.querySelector('#update-email').value = selectedEmployeeRecord.email;

    // Check the appropriate gender radio button
    let genderRadios = document.getElementsByName('inlineRadioOptions');
    for (let radio of genderRadios) {
        if (radio.value === selectedEmployeeRecord.gender) {
            radio.checked = true;
            break;
        }
    }

    document.querySelector('#update-ip').value = selectedEmployeeRecord.ip_address;

    let modalElement = document.getElementById('update-employee-form');
    if (modalElement) {
        let modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        console.error('Modal element not found');
    }
}


let updateEmployeeForm = document.querySelector('#update-employee');

updateEmployeeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let employeeId = document.querySelector('#update-emp-id').value.trim();
    let http = new AppHttp();

    let url = `${serverUrl}/employees/${employeeId}`;

    let employee = {
        first_name: document.getElementById('update-first-name').value,
        last_name: document.getElementById('update-last-name').value,
        email: document.getElementById('update-email').value,
        ip_address: document.getElementById('update-ip').value,
        gender: document.querySelector('input[name="inlineRadioOptions"]:checked')?.value || 'unknown'
    };


    http.put(url, employee, function (err, response) {
        if (err) {
            console.error(err);
        } else {
            alert(JSON.stringify(response));
            fetchAllEmployees(); // Refresh the employee list
            console.log(employee);
            console.log(url);
            // Close the modal after form submission
            let modalElement = document.getElementById('update-employee-form');
            if (modalElement) {
                let modal = new bootstrap.Modal(modalElement);
                modal.hide();
            }
        }
    });

})