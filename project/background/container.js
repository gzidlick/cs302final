export class PasswordContainer{
	constructor(masterPassword: string){
		this.masterPassword = masterPassword;
	}

	this.passwords = [];
	this.usernames = [];
	loadFromStorage(){
		// this needs to load from the browsers local storage
	}

	saveToStorage(){
		// well the opposite
		// should eventually encrypt and the load should decrypt, but lets do that later
	}

	#encrypt(){

	}
	#decrypt(){

	}

}
