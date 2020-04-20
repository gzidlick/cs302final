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
        sendResponse({visited: container.hasVisited(request.url)});
    }
});
