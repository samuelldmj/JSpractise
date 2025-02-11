
//HANDLING TEXT
let textBtn = document.getElementById('text-btn');
let textData = document.getElementById('text-data')

textBtn.addEventListener('click', function(){
    fetchText();
})

let fetchText =  () => {
    axios.get('../data/message.txt').then( (response) => {
        if(response.status !== 200){
            console.log(`Something went wrong : ${response.status}` )
        }
        let fileContent = response.data;
        textData.innerHTML = fileContent;
        console.log(fileContent);
    }).catch((error) => {
        console.error('Error fetching text:', error);
    });
}



//HANDLING JSON
let jsonBtn = document.getElementById('json-btn');
let jsonBody = document.getElementById('json-data');

jsonBtn.addEventListener('click', function(){
    fetchJson();
})


let fetchJson = () => {
    axios.get('../data/location.json').then( (response) => {
        if(response.status !== 200){
            console.log(`Something went wrong : ${response.status}` )
        }
        let fileContent = response.data;
        jsonBody.innerHTML = JSON.stringify(fileContent);
        console.log(fileContent);
    }).catch((error) => {
        console.error('Error fetching text:', error);
    });
}



//HANDLING EXTERNAL RESOURCE
let apiButton = document.querySelector('#api-btn');
let apiDataBody = document.querySelector('#api-data');


apiButton.addEventListener('click', function(){
    fetchExternalJson();
})

let fetchExternalJson = function(){
    axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
        
        if(response.status !== 200){
            console.log(`Something went wrong : ${response.status}` )
        }
        let fileContent = response.data;
        // apiDataBody.innerHTML = JSON.stringify(fileContent);
        let ul = document.createElement('ul');

        for (const data of fileContent) {
            let li = document.createElement('li');
            
            let liAttri = document.createAttribute('list-group-item');
            li.innerHTML = `
            ID: ${data.id}<br>
            NAME: ${data.name}<br>
            USERNAME: ${data.username}<br>
            EMAIL: ${data.email}<br>
            ADDRESS:<br>
            <ul>
                CITY : ${data.address.city}<br>
                STREET : ${data.address.street}
            </ul>
          `
          ul.appendChild(li);
        }
        apiDataBody.innerHTML = '';
        apiDataBody.append(ul);
        console.log(fileContent);

    }).catch((error) => {
        console.error('Error fetching text:', error);
    });
}