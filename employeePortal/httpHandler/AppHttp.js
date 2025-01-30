export class AppHttp {
    constructor() {
        this.http = new XMLHttpRequest();
    }

    // GET request with a callback to handle the response
    get(url, callback) {
        // Open a new HTTP GET request. 
        // The 'GET' method indicates that we are requesting data from the server.
        // The 'true' argument means the request will be asynchronous.
        this.http.open('GET', url, true);

        // Set up an event listener for the 'onload' event. This will be triggered when the request successfully completes.
        this.http.onload = () => {
            // Check if the response status code is 200 (HTTP OK).
            // Status code 200 indicates that the server has processed the request successfully.
            if (this.http.status === 200) {
                // If the status is 200, parse the response text as JSON.
                // This converts the JSON string returned by the server into a JavaScript object.
                let data = this.http.responseText;
                let jsonToObj = JSON.parse(data);

                // Call the callback function and pass 'null' as the first parameter (indicating no error),
                // and the parsed data as the second parameter.
                // This lets the caller handle the successful response (the parsed JSON object).
                callback(null, jsonToObj);
            } else {
                // If the status code is not 200, an error occurred on the server side.
                // Pass the error message (constructed using the status code) to the callback.
                // The callback will handle the error (e.g., by displaying an error message).
                callback(`Error: ${this.http.status}`, null);
            }
        };

        // Set up an event listener for the 'onerror' event. This is triggered if there's a network error
        // or if the request cannot be completed (e.g., server is unreachable).
        this.http.onerror = () => {
            // Call the callback function with a 'Network Error' message to indicate that something went wrong
            // at the network level (e.g., no connection or DNS issues).
            callback('Network Error', null);
        };

        // Finally, send the GET request to the server.
        // This sends the request to the URL specified and will trigger the events (onload and onerror)
        // based on the result of the request.
        this.http.send();
    }


    // POST request with a callback to handle the response
    post(url, employeeData, callback) {
        // Open a new HTTP request. The method is POST and we are sending data to the given URL.
        // 'true' indicates the request should be asynchronous.
        this.http.open('POST', url, true);

        // Set the request header to tell the server that the data we're sending is in JSON format.
        // This is important so that the server knows how to interpret the body of the request.
        this.http.setRequestHeader('Content-Type', 'application/json');

        // Convert the JavaScript object (employeeData) to a JSON string and send it in the body of the POST request.
        this.http.send(JSON.stringify(employeeData));

        // The 'onload' event handler is triggered when the request is successfully completed (status code 200-299).
        this.http.onload = () => {
            // Check if the status code of the response is in the success range (200 - 299).
            if (this.http.status >= 200 && this.http.status < 300) {
                // Parse the JSON response into a JavaScript object
                let jsonToObj = JSON.parse(this.http.responseText);

                // If the request was successful, pass 'null' as the error parameter and the parsed data as the second argument to the callback function.
                callback(null, jsonToObj);
            } else {
                // If the status code is not in the success range, pass an error message with the status text to the callback.
                callback(`Error: ${this.http.statusText}`, null);
            }
        };

        // The 'onerror' event handler is triggered if there's a network error or if the request could not be sent.
        this.http.onerror = () => {
            // If there's a network error, pass an error message to the callback.
            callback('Network Error', null);
        };
    }

    //PUT REQUEST HANDLING
    put(url, employeeData, callback) {
        this.http.open('PUT', url, true);
        this.http.setRequestHeader('Content-Type', 'application/json');
        this.http.send(JSON.stringify(employeeData));
        this.http.onload = () => {
            // Check if the status code of the response is in the success range (200 - 299).
            if (this.http.status >= 200 && this.http.status < 300) {
                // Parse the JSON response into a JavaScript object
                let jsonToObj = JSON.parse(this.http.responseText);


                callback(null, jsonToObj);
            } else {

                callback(`Error: ${this.http.statusText}`, null);
            }
        };

        this.http.onerror = () => {
            // If there's a network error, pass an error message to the callback.
            callback('Network Error', null);
        };
    }

    //DELETE REQUEST HANDLING
    delete(url, callback){
        this.http.open('DELETE', url, true);
        this.http.send();

        this.http.onload = () => {
            // Check if the status code of the response is in the success range (200 - 299).
            if (this.http.status >= 200 && this.http.status < 300) {
                // Parse the JSON response into a JavaScript object
                let jsonToObj = JSON.parse(this.http.responseText);


                callback(jsonToObj);
            } else {

                callback(`Error: ${this.http.statusText}`, null);
            }
        };

        this.http.onerror = () => {
            // If there's a network error, pass an error message to the callback.
            callback('Network Error', null);
        };
    }

}

