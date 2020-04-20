import { RC4 } from './encryption.js';

export class PasswordContainer{

    hasVisited(url){
        /**
         *@param: url::string the url we are checking against
         *@return::bool if the url has been visited
         */
        return new Promise(function(resolve, reject){
            chrome.storage.sync.get(['meta_URLS'],function(urlArray){
                if(urlArray['meta_URLS'] === undefined){
                    resolve(false);
                }else{
                    let resVal = urlArray['meta_URLS'].includes(url);
                    resolve(resVal);
                }
            });
        });
    }

	store(obj, masterPass){
        /**
         *@param: obj: {pass: "string to be encrypted",
         *              plaintextURL: plaintextURL}
         *@param: masterPass: unencrypted master password
         */

        // ENCRYPTION HAPPENS HERE
        console.debug(obj, masterPass);
        const key = RC4.randomHashNotRC4(obj.plaintextURL + ":" + masterPass);
        const val = RC4.crypt(obj.pass, key, true);
        chrome.storage.sync.set({[key]:val});

        // add this url to the plaintext list
        let tmpArray = chrome.storage.sync.get['meta_URLS'];
        if(tmpArray === undefined)
            tmpArray = [];

        tmpArray.push(obj.plaintextURL);
        chrome.storage.sync.set({meta_URLS: tmpArray});
	}

    access(url, masterPass){
        /**
         * @param: plaintext url
         * @param: masterPass: unencrypted masterpassword
         * @return: obj {a: username, b: password}
         */
        console.debug(url, masterPass);
        const key = RC4.randomHashNotRC4(url + ":" + masterPass);
        const object = RC4.crypt(chrome.storage.sync.get[key], key, false);
        
        console.debug("decrypted: ", object);
        let ret = JSON.parse(object);
        return ret;
    }
}
