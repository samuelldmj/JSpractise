import{ AppHttp } from "./requestHandler/AppHttp.js";

const serverUrl = `http://127.0.0.1:5000/api`;

//GET REQUEST
let getBtn = document.querySelector('#get-btn');

getBtn.addEventListener('click', function(){
    fetchEmployees();
});


let fetchEmployees = function (){
    let http = new AppHttp();
    let url = `${serverUrl}/employees`;
    http.get(url);
}