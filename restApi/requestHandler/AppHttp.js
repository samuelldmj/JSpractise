export class AppHttp {
    constructor(){
       this.http = new XMLHttpRequest();
    }

    get(url){
        this.http.open('GET', url, true );
        this.http.send();
        this.http.onload = function(){
            if(this.http.status === 200){
                let data = this.http.responseText;
                console.log(data);
            }
            // console.log(this.http);
        }.bind(this);
    }
}