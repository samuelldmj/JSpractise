export class FetchHttp {

     constructor(){
            //this.http = fetch();
     }


     get(url){

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

     post(url, data){
        return new Promise((resolve, reject) => {
            fetch(url, {
               method : 'POST',
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



     put(url, data){
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

     delete(url){
        return new Promise((resolve, reject) => {
            fetch(url, {
                method : 'DELETE',
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
}