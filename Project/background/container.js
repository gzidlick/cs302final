export class PasswordContainer{
	constructor(masterPassword){
		this.masterPassword = masterPassword;
		this.passwords = [];
		this.usernames = [];
	}

    hasVisited(url){
        // check plaintext list of urls to see if we've been
        // to `url` before
        return false;
    }

	store(obj){
		// obj has obj.username, obj.password, and obj.url
        localStorage.setItem(obj.url, JSON.stringify(obj) );
	}

	loadFromStorage(){
		// this needs to load from the browsers local storage
	}

	saveToStorage(){
		// well the opposite
		// should eventually encrypt and the load should decrypt, but lets do that later
	}

	encrypt(){

	}

	decrypt(){

	}

}
