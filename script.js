//TEXT DATA

let textButton = document.querySelector('#text-btn');
let textDataBody = document.querySelector('#text-data');

textButton.addEventListener('click', function(){
    
    //create an ajax Request
    let xhr = new XMLHttpRequest();

    //prepare the Request.
    xhr.open('GET', './data/message.txt', true);

    //send request
    xhr.send();

    //process the request
    xhr.onload = function (){
        if(xhr.status === 200){
            let data = xhr.responseText;
            // console.log(data);
           let para =  document.createElement('p');
            para.textContent = data
            textDataBody.append(para);
        }
    }
})


// JSON DATA
let jsonButton = document.querySelector('#json-btn');
let jsonDataBody = document.querySelector('#json-data');


jsonButton.addEventListener('click', function(){
    
    //create an ajax Request
    let xhr = new XMLHttpRequest();

    //prepare the Request.
    xhr.open('GET', './data/location.json', true);

    //send request
    xhr.send();

    //process the request
    xhr.onload = function (){
        if(xhr.status === 200){
            let data = xhr.responseText;
            let parseJson = JSON.parse(data);
            displayJsonData(parseJson)
        }
    }
})

const displayJsonData = function (parseJson){
    let ul = document.createElement('ul');
    ul.innerHTML = `
        <li>Street: ${parseJson.street}</li>
        <li>State:  ${parseJson.state}</li>
        <li>Country: ${parseJson.country}</li>
    `
    console.log(parseJson);
    jsonDataBody.append(ul);
}

//API DATA
let apiButton = document.querySelector('#api-btn');
let apiDataBody = document.querySelector('#api-data');


apiButton.addEventListener('click', function(){

    //create an ajax request
    let xhr = new XMLHttpRequest();

     //prepare the Request.
     xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

     //send request
    xhr.send();

    //process the request
    xhr.onload = function (){
        if(xhr.status === 200){
            let data = xhr.responseText;
            let parseUserJsonData = JSON.parse(data);
            //console.log(parseUserJsonData);
            displayUserJsonData(parseUserJsonData);
        }
    }
})


const displayUserJsonData = function (userData) {
    let ul = document.createElement('ul');
    for (let user of userData) {
        // Create a new list item for each user
        let li = document.createElement('li');
        li.innerHTML = `
            ID: ${user.id}<br>
            NAME: ${user.name}<br>
            USERNAME: ${user.username}<br>
            EMAIL: ${user.email}
        `;
        // Append the list item to the unordered list
        ul.appendChild(li);
    }
    // Append the unordered list to the apiDataBody
    apiDataBody.append(ul);
}
