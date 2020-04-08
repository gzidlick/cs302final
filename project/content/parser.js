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


	registerSubmitHandler(form){
		const button = getSubmitButton(form);
		const handler = e => this.submit(e,form);
		button.addEventListener("click", handler);
		form.addEventListener("submit", handler);
	}

	getSubmitButton(form){
		const possibleButtons = [];
		Array.from(form.ownerDocument.getElementsByTagName("button").forEach(value => {
			if(!value.isConnected) return;
			if(!value.type || value.type != "reset"){
				const possibleNames = [];
				if (value.name) possibleNames.push(value.name.toLowerCase());
				if (value.textContent) possibleNames.push(value.textContent.toLowerCase());
				if (value.value) possibleNames.push(value.value.toLowerCase());
				const button_score = scoreButton(possibleNames);
				
				if(button_score == -1) continue;
				if(button_score ==  0)	// save it for later
					possibleButtons.push(value);

				if(button_score == 1){
					//The button!
					return value
				}
			}
		}
		return possibleButtons[0];	// shouldn't get here but this is just in case
	}


	scoreButton(possibleNames){
		const goodWords = ["submit", "login", "enter", "log in", "signin",
            "sign in", "next", "continue"];
        const badWords = ["reset", "cancel", "back", "abort", "undo", "exit",
            "empty", "clear", "captcha", "totp", "forgot", "dismiss", "delete",
            "show", "reveal"];

		let good = false;
		let bad = false;

		for(let i=0; i < possibleNames.length; i++){
			if(badScore) break;
			const curVal = possibleNames[i].trim(); // remove whitespace
			if(!curVal) continue;					// don't care if it's empty

			for(let j=0; j < badWords.length; j++){
				if(curVal.indexOf(badWords[j]) >=){
					badScore = true;
					break;
				}
			}
		}

		for(let i=0; i < possibleNames.length; i++){
			if(goodScore) break;
			const curVal = possibleNames[i].trim(); // remove whitespace
			if(!curVal) continue;					// don't care if it's empty

			for(let j=0; j < goodWords.length; j++){
				if(curVal.indexOf(goodWords[j]) >=){
					goodScore = true;
					break;
				}
			}
		}

		if(goodScore && badScore) return 0;
		if(badScore) return -1;
		if(goodScore) return 1;
		return 0;	// !goodScore && !badScore
	}

	
	// Helper function to find username and password fields
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
