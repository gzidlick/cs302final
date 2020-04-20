import { PasswordContainer } from './container.js';

var container = new PasswordContainer();

//var port = chrome.runtime.connect({name: "keyVal"});
chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "keyVal");

	port.onMessage.addListener(function(msg){
		console.log(msg);
		container.store(msg);
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.name == "checkURL"){
        sendResponse({visited: container.hasVisited(request.url)});
    }
});
