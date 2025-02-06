export class FetchHttp {

     constructor(){
            //this.http = fetch();
     }


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