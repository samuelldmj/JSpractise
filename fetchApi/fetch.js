

let textButton = document.querySelector('#text-btn');
let textDataBody = document.querySelector('#text-data');

textButton.addEventListener('click', function(){
    fetchText();
});


let fetchText = function() {
    fetch("../data/message.txt").then(response => {

        if(response.status !== 200 ) {
            console.error(`Something Went Wrong: ${response.status}`);
            return;
        }
      return response.text();
    }).then(data =>  {
        let p = document.createElement('p');
        p.append(data);
        textDataBody.append(p)
    })
}



/*
JSON FETCH
*/
let jsonButton = document.querySelector('#json-btn');
let jsonDataBody = document.querySelector('#json-data');

jsonButton.addEventListener('click', function(){
    fetchJson();
})

let fetchJson  =  function(){
    fetch("../data/location.json").then(response => {
        if(response.status !== 200 ) {
            console.error(`Something Went Wrong: ${response.status}`);
            return;
        }

        return response.json();
    }).then(jsonData => {

        // console.log(jsonData);
        let ul = document.createElement('ul');
        ul.innerHTML = `
            <li>${jsonData.street}</li>
            <li>${jsonData.state}</li>
            <li>${jsonData.country}</li>
        `
        jsonDataBody.append(ul);

    })
    
}


/*
EXTERNAL API 
*/
let apiButton = document.querySelector('#api-btn');
let apiDataBody = document.querySelector('#api-data');

apiButton.addEventListener('click', function(){
    fetchExternalJsonApi()
})

let fetchExternalJsonApi = function  (){
    fetch('https://jsonplaceholder.typicode.com/users').
    then(response => {

        if(response.status !== 200 ) {
            console.error(`Something Went Wrong: ${response.status}`);
            return;
        }
        return response.json();
    }).then(users => {
        console.log(users)
        let ul = document.createElement('ul')
        users.forEach(user => {
          let li = document.createElement('li');
          li.innerHTML = `
            ID: ${user.id}<br>
            NAME: ${user.name}<br>
            USERNAME: ${user.username}<br>
            EMAIL: ${user.email}<br>
            ADDRESS:<br>
            <ul>
                CITY : ${user.address.city}<br>
                STREET : ${user.address.street}
            </ul>
          `
         ul.appendChild(li);
          
        });

        apiDataBody.append(ul);
    })
}