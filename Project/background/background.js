import { PasswordContainer } from './container.js';

var container = new PasswordContainer();

//var port = chrome.runtime.connect({name: "keyVal"});
chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "keyVal");

	port.onMessage.addListener(function(msg){
        let password = prompt("Enter your master password: \n(TODO: make this not plaintext)");
		container.store(msg,password);
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.name == "checkURL"){
        container.hasVisited(request.url).then(function(val){
            sendResponse({visited: val});
        });
        return true;
    }else if(request.name == "getObj"){
        let password = prompt("Enter your master password: \n(TODO: make this not plaintext)");
        let response = container.access(request.url,password);
        response.name = "returnObj";
        sendResponse(response);
        return true;
    }
});

