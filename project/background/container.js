export class PasswordContainer{
	constructor(masterPassword){
		this.masterPassword = masterPassword;
		this.passwords = [];
		this.usernames = [];
	}

	store(obj){
		// obj has obj.username, obj.password, and obj.url
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
