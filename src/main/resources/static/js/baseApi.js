class Ajax{
    static get(url,onsuccess,onerror){
        let request = new XMLHttpRequest();
        request.open("GET",url,true);
        request.onreadystatechange=function () {
            if(request.readyState!==4) return;
            if(request.status===200)
                onsuccess(request.responseText);
            else if(onerror)
                onerror(request.status,request.statusText);
        };
        request.send();
    }
    static _bodyRequest(method,url,params,onsuccess,onerror){
        let request = new XMLHttpRequest();
        request.open(method,url,true);
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        request.onreadystatechange=function () {
            if(request.readyState!==4) return;
            if(request.status===200)
                onsuccess(request.responseText);
            else if(onerror)
                onerror(request.status,request.statusText);
        };
        let _params = [];
        for(let i in params) _params.push(i+"="+encodeURIComponent(params[i]));
        request.send(_params.join("&"));
    }

    static post(url,params,onsuccess,onerror){
        this._bodyRequest("POST",url,params,onsuccess,onerror);
    }

    static put(url,params,onsuccess,onerror){
        this._bodyRequest("PUT",url,params,onsuccess,onerror);
    }

    static delete(url,params,onsuccess,onerror){
        this._bodyRequest("DELETE",url,params,onsuccess,onerror);
    }

    static postMultiPart(url,params,onsuccess,onerror){
        let request = new XMLHttpRequest();
        request.open("POST",url,true);
        request.onreadystatechange=function () {
            if(request.readyState!==4) return;
            if(request.status===200)
                onsuccess(request.responseText);
            else if(onerror)
                onerror(request.status,request.statusText);
        };
        request.send(params);
    }
}
class Module{
    constructor(selector){
        this.selector = selector;
    }
    get(selector){
        return this.container.querySelector(selector);
    }
    getAll(selector){
        return Array.prototype.slice.call(this.container.querySelectorAll(selector));
    }
    init(){
        this.container = document.querySelector(this.selector);
        this.onComponentsLoading();
        this.onBindEvents();
        this.onCreate();
    }

    onCreate(){

    }

    onComponentsLoading() {

    }

    onBindEvents() {

    }
}
class Page{
    constructor(){
        this.modules=[];
    }
    registerModule(module){
        this.modules.push(module);
    }
    init(){
        this.modules.forEach(m=>m.init())
    }
    start(){
        window.addEventListener("load",e=>this.init());
    }
}
