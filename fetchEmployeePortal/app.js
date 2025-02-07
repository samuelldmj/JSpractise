import { FetchHttp } from "./requestHandler/fetchHttp.js";

let serverUrl = `http://127.0.0.1:5000/api`;

//Content Load
window.addEventListener('DOMContentLoaded', function (e) {
    // e.preventDefault();
    fetchAllEmployees();
})


//GET OPERATION
let fetchAllEmployees = () => {
    let url = `${serverUrl}/employees`;

    FetchHttp.get(url).then(employees => {
        console.log(employees);

        let tableBody = document.querySelector('#table-body');
        //      // Clear previous entries before adding new ones
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
                    <td>
                        <button type="button" class="btn btn-success btn-sm update">Update</button>
                        <button type="button" class="btn btn-warning btn-sm delete">DELETE</button>
                    </td>
                    </tr>
               `
            tableBody.insertAdjacentHTML('beforeend', html);
        }
    }).catch(err => {
        console.error(err);
    });
}

//POST OPERATION
let employeeForm = document.querySelector('#add-employee');

employeeForm.addEventListener('submit', function(e){
    let url = `${serverUrl}/employees`;

    let addEmployee = {
        first_name: document.getElementById('add-first-name').value,
        last_name: document.getElementById('add-last-name').value,
        email: document.getElementById('add-email').value,
        ip_address: document.getElementById('add-ip').value,
        gender: document.querySelector('input[name="inlineRadioOptions"]:checked')?.value || 'unknown'
    };

    FetchHttp.post(url, addEmployee).then(response => {
        alert(JSON.stringify(response));
            fetchAllEmployees(); // Refresh the employee list
            employeeForm.reset(); // Reset form

            // Close the modal after form submission
            let modal = bootstrap.Modal.getInstance(document.getElementById('add-employee-form'));
            if (modal) {
                modal.hide();
            }
    }).catch(err => {
        console.error(err);
    })
})


//DELETE OPERATION
let tableBody = document.querySelector('#table-body');

tableBody.addEventListener('click', function(e){
    let targetElement = e.target;
    let emID = targetElement.parentElement.parentElement.firstElementChild.textContent;
   
    if(targetElement.closest('.delete')){
        //let selectedEmployeeRecordId = targetElement.textContent
        // console.log(selectedEmployeeRecordId);

        let url = `${serverUrl}/employees/${emID}`
        FetchHttp.delete(url).then( response => {
            console.log(response);
            fetchAllEmployees();
        }).catch(err => {
            console.error(err);
        })
    }

    /*
    ==================================================================================================================
                                            END OF DELETE OPERATIONS
    ==================================================================================================================
    */

    //UPDATE OPERATION
    if(targetElement.closest('.update')){

        let url = `${serverUrl}/employees`;
        FetchHttp.get(url).then(employees => {
            let selectedEmployeeRecord =  employees.find(employee => {
               return  employee.id === emID;
            })
                // console.log(selectedEmployeeRecord);
                populateSelectedModal(selectedEmployeeRecord);
        })
        .catch(err => console.error(err));
    }
})


let populateSelectedModal = (selectedEmployeeRecord) => {

    let updateEmpId = document.querySelector('#update-emp-id');
    if (updateEmpId) updateEmpId.value = selectedEmployeeRecord.id;
    else console.error('Element with id update-emp-id not found');

    document.querySelector('#update-first-name').value = selectedEmployeeRecord.first_name;
    document.querySelector('#update-last-name').value = selectedEmployeeRecord.last_name;
    document.querySelector('#update-email').value = selectedEmployeeRecord.email;
    document.querySelector('#update-ip').value = selectedEmployeeRecord.ip_address;

    let genderRadios = document.getElementsByName('inlineRadioOptions');
    for (let radio of genderRadios) {
        if (radio.value === selectedEmployeeRecord.gender) {
            radio.checked = true;
            break;
        }
    }

    let modalElement = document.getElementById('update-employee-form');
    if (modalElement) {
        let modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        console.error('Modal element not found');
    }

}


let updateEmployeeForm = document.querySelector('#update-employee');

updateEmployeeForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    let employeeId = document.querySelector('#update-emp-id').value.trim();
    let url = `${serverUrl}/employees/${employeeId}`;

    let updateEmployee = {
        first_name: document.getElementById('update-first-name').value,
        last_name: document.getElementById('update-last-name').value,
        email: document.getElementById('update-email').value,
        ip_address: document.getElementById('update-ip').value,
        gender: document.querySelector('input[name="inlineRadioOptions"]:checked')?.value || 'unknown'
    };

    FetchHttp.put(url, updateEmployee).then(response => {
        console.log(response);
        fetchAllEmployees();
        
        let modalElement = document.getElementById('update-employee-form');
        if (modalElement) {
            let modal = new bootstrap.Modal(modalElement);
            modal.hide();
        }

    }).catch(err => {
        console.error(err);
    })

})



