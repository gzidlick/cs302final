class FormReader {
	getFormFields(form){
		let passwordIndex = -1;
		let usernameIndex = -1;

		// search the DOM for any form fields we might need
		for (let i = 0; i < form.elements.length; i++){
			if(!this.isInputType(form.elements[i])) continue;
			
			const DOMtype = form.elements[i].type.toLowerCase();
			const value = form.elements[i].value;

			console.log("processing field with domtype", DOMtype, value);
			
			if(DOMtype == "password"){
				passwordIndex = i;
				this.passwordField = form.elements[i];
				break;
			}
		}
		for(let i = passwordIndex; i >= 0; i--){
			if(!this.isInputType(form.elements[i])) continue;

			const DOMtype = form.elements[i].type.toLowerCase();
			const value = form.elements[i].value;

			console.log("processing field with domtype", DOMtype, value);
			if(DOMtype == "text"){
				usernameIndex = i;
				this.usernameField = form.elements[i];
				break;
			}
		}
		console.log("username:", this.usernameField);
		console.log("password:", this.passwordField);
	}


	isInputType(element){
		if(element.localName.toLowerCase() != "input" &&
			(element.type == undefined || element.type == null))
			return false; // not a username or password field
		if(element.type.toLowerCase() == "fieldset")
			return false; // probably not a fieldset
		if(["radio", "select-one", "checkbox", "submit"].includes(element.type.toLowerCase()))
			return false;
		return true;
	}
}
