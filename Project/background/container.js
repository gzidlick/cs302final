export class PasswordContainer{

    hasVisited(url){
        // param: url::string the url we are checking against
        // return::bool if the url has been visited
        let urlArray = chrome.storage.sync.get['meta_URLS'];
        if(urlArray === undefined)
            return false;

        return urlArray.includes(url);
    }

	store(obj){
        // param: obj: {url: hashedURL, pass: "encrypted username, password json object",
        //              plaintextURL: plaintextURL}
        //localStorage.setItem(obj.url, JSON.stringify(obj) );
        const key = obj.url;
        const val = obj.pass;
        chrome.storage.sync.set({key: val});

        // add this url to the plaintext list
        let tmpArray = chrome.storage.sync.get['meta_URLS'];
        if(tmpArray === undefined)
            tmpArray = [];

        tmpArray.push(obj.plaintextURL);
        chrome.storage.sync.set({meta_URLS: tmpArray});
	}
}
