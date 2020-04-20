import { RC4 } from './encryption.js';

export class PasswordContainer{

    hasVisited(url){
        // param: url::string the url we are checking against
        // return::bool if the url has been visited
        let urlArray = chrome.storage.sync.get['meta_URLS'];
        if(urlArray === undefined)
            return false;

        return urlArray.includes(url);
    }

	store(obj, masterPass){
        // param: obj: {pass: "string to be encrypted",
        //              plaintextURL: plaintextURL}
        // param: masterPass: unencrypted master password

        // ENCRYPTION HAPPENS HERE
        console.debug(obj, masterPass);
        const key = RC4.randomHashNotRC4(obj.plaintextURL);
        const val = RC4.crypt(obj.pass);
        chrome.storage.sync.set({[key]:val});

        // add this url to the plaintext list
        let tmpArray = chrome.storage.sync.get['meta_URLS'];
        if(tmpArray === undefined)
            tmpArray = [];

        tmpArray.push(obj.plaintextURL);
        chrome.storage.sync.set({meta_URLS: tmpArray});
	}
}
