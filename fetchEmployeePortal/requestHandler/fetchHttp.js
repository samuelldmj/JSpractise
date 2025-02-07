export class FetchHttp {
     static get(url){

        return new Promise((resolve, reject) => {
            fetch(url).then(response => {
                return response.json()
            }).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
     }

     static post(url, data){
        return new Promise((resolve, reject) => {
            fetch(url, {
               method : 'POST',
               headers : {
                'Content-type' : 'application/json'
               },
               body : JSON.stringify(data)
            }).then(response => {
               return response.json();
            }).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err)
            })
        })
     }



     static put(url, data){
        return new Promise((resolve, reject) => {
            fetch(url, {
                method : 'PUT',
                headers : {
                 'Content-type' : 'application/json'
                },
                body : JSON.stringify(data)
             }).then(response => {
                return response.json()
             }).then(data => {
                 resolve(data);
             }).catch(err => {
                 reject(err)
             })
         })
     }

     static delete(url){
        return new Promise((resolve, reject) => {
            fetch(url, {
                method : 'DELETE',
             }).then(response => {
                return response.json()
             }).then(data => {
                 resolve(data);
             }).catch(err => {
                 reject(err)
             })
         })
     }
}




/*
======================================================================================================
                    USING ASYNC AND AWAIT
======================================================================================================

 */


// export class FetchHttp {


//     static async get(url) {
//         try {
//             const response = await fetch(url);
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             FetchHttp.handleError(error)
//         }
//     }


//     static async post(url, data) {
//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })

//             const jsonResponse = await response.json();
//             return jsonResponse;
//         } catch (error) {
//             FetchHttp.handleError(error)
//         }
//     }

//     static async put(url, data) {
//         try {
//             const response = await fetch(url, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })

//             const jsonResponse = await response.json();
//             return jsonResponse;
//         } catch (error) {

//             FetchHttp.handleError(error)
//         }
//     }

//     static async delete(url) {
//         try {
//             const response = await fetch(url, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) { // Check if response status is not in the range 200-299
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             // If you expect a JSON response, then parse it, otherwise, you might just return the response or a success message
//             return await response.json(); // This line might be unnecessary unless you're expecting a response body
//         } catch (error) {
//             FetchHttp.handleError(error)
//         }
//     }

//     static async handleError(error) {
//         console.error('Fetch error:', error);
//         throw error;
//     }

// }