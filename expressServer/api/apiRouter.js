const express = require('express');
const router = express.Router();


//create a unique id
let getId = () => {
    return '_' + Math.random().toString(36).substring(2, 9);
}

//EMPLOYEES DATA 
let employees  = [
    {
        id: getId(),
        first_name: 'Samuel',
        last_name: 'Bol',
        gender: 'male', 
        email : 'samb@hotmail.com',
        ip_address : '127.0.0.1'
    },
    {
        id: getId(),
        first_name: 'Daniel',
        last_name: 'Akin',
        gender: 'male',
        email : 'danK@hotmail.com',
        ip_address : '127.0.0.2'
    },
    
]

//The client (e.g., a web browser) initiates the communication by sending an HTTP request to the server.
//The server sends an HTTP response back to the client.

//GET  EMPLOYEES
router.get('/employees', (request, response) => {
    console.log(`GET Request Received at server .. ${new Date().toLocaleDateString()}`);
    response.json(employees); 
  });

//POST REQUEST
router.post('/employees', (request, response) => {
    let employee = {
        id : getId(),
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        gender: request.body.gender,
        email : request.body.email,
        ip_address : request.body.ip_address
    }
     employees.push(employee);
     console.log(`POST Request Received at server .. ${new Date().toLocaleDateString()}`); 
     response.json({msg : 'POST request is successful'});
})

//PUT REQUEST
router.put('/employees/:id', (request, response) => {
    let emID = request.params.id;
    let updateEmployee = {
        id: emID,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        gender: request.body.gender,
        email : request.body.email,
        ip_address : request.body.ip_address
    }

    let existingEmployee = employees.find((employee) => {
        return employee.id === emID;
    })

    employees.splice(employees.indexOf(existingEmployee), 1, updateEmployee);
    console.log(`PUT Request Received at server .. ${new Date().toLocaleDateString()}`); 
    response.json({msg : 'PUT request is successful'});
});

//DELETE REQUEST
router.delete('/employees/:id', (request, response) =>{
    let emID = request.params.id;
    employees = employees.filter( (employee)=>{
        return employee.id !== emID;
    })
    console.log(`Delete Request Received at server .. ${new Date().toLocaleDateString()}`); 
    response.json({msg : 'Delete request is successful'});
})



module.exports = router;