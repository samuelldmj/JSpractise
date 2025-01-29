import { AppHttp } from "./httpHandler/AppHttp.js";


const serverUrl = `http://127.0.0.1:5000/api`;
//
window.addEventListener('DOMContentLoaded', function(){
    fetchAllEmployees();
})

let fetchAllEmployees = function (){
    let http = new AppHttp();
    let url = `${serverUrl}/employees`;

    http.get(url, function(err, employeesData){
        if (err) {
            console.error(err);
        } else {
            let tableBody = document.querySelector('#table-body');
            // Clear previous entries before adding new ones
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
                        <button type="button" id="put-btn" class="btn btn-success btn-sm">Update</button>
                        <button type="button" id="delete-btn" class="btn btn-warning btn-sm">DELETE</button>
                    </td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML("beforeend", html); // Use 'beforeend' to append at the end
            });
            console.log(employeesData);
        }
    })
}


