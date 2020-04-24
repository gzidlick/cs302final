import { PasswordContainer } from './container.js';

var container = new PasswordContainer();

//var port = chrome.runtime.connect({name: "keyVal"});
chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "keyVal");
    var last = "";
	port.onMessage.addListener(function(msg){
        if(!(last == msg.plaintextURL)){
            let password = prompt("Enter your master password:");
		    container.store(msg,password);
        }
        last = msg.plaintextURL;
	});
});
/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.name == "checkURL"){
        container.hasVisited(request.url).then(function(val){
            sendResponse({visited: val})
            return true;
        });
    }
});*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
	if(request.name == "getObj"){
        let password = prompt("Enter your master password:");
        container.access(request.url,password).then(function(response){

			let obj = JSON.parse(JSON.parse(response));// this is stupid... why does it have to be like this?
			obj.name = "returnObj";
			console.debug(obj);
            sendResponse(obj)
        });
	}else if(request.name == "checkURL"){
        container.hasVisited(request.url).then(function(val){
            sendResponse({visited: val})
        });
    }
    return true;
});

