class FormReader {
	constructor(){
		this.port = chrome.runtime.connect({name: "keyVal"});
	}

    checkVisited(URL){
        var visited = new Promise(function(resolve, reject){
            chrome.runtime.sendMessage({name: "checkURL", url: URL}, function(response) {
                if(response.visited){
                    reject("we've visited this before");
                }else{
                    resolve("We've never recorded this URL");
                }
            });
        });

        visited.then(function(garbage){
            // we've never visited this before
            return false;
        }).catch(function(alsoGarbage){
            // HALT! been there, done this
            return true;
        });
    }

	getFormFields(form){
		let passwordIndex = -1;
		let usernameIndex = -1;

		// search the DOM for any form fields we might need
		for (let i = 0; i < form.elements.length; i++){
			if(!this.isInputType(form.elements[i])) continue;
			
			const DOMtype = form.elements[i].type.toLowerCase();
			const value = form.elements[i].value;

			// TODO: remove this!
			console.debug("processing field with domtype", DOMtype, value);
			
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

			// TODO: remove this! 
			console.debug("processing field with domtype", DOMtype, value);
			if(DOMtype == "text" || DOMtype == "email"){
				usernameIndex = i;
				this.usernameField = form.elements[i];
				break;
			}
		}

		// TODO: REMOVE THIS!!
		console.log("username:", this.usernameField.value);
		console.log("password:", this.passwordField.value);
		return {username: this.usernameField.value, password: this.passwordField.value}
	}


	registerSubmitHandler(form){
		const button = this.getSubmitButton(form);
		if(!button) return; // probably not a login page
		const handler = e => this.submit(e,form);
		button.addEventListener("click", handler);
		form.addEventListener("submit", handler);
	}

	submit(e, form){
		let res = this.getFormFields(form);
		res.url = window.location.href;
		this.port.postMessage(res);
	}

	getSubmitButton(form){
		const possibleButtons = [];
		let button;
		Array.from(form.ownerDocument.getElementsByTagName("button")).forEach(value => {
			if(!value.isConnected) return;
			if(!value.type || value.type != "reset"){
				const possibleNames = [];
				if (value.name) possibleNames.push(value.name.toLowerCase());
				if (value.textContent) possibleNames.push(value.textContent.toLowerCase());
				if (value.value) possibleNames.push(value.value.toLowerCase());
				const button_score = this.scoreButton(possibleNames);
				
				if(button_score == -1) return;
				if(button_score ==  0)	// save it for later
					possibleButtons.push(value);

				if(button_score == 1){
					//The button!
					button = value;
				}
			}
		});
		return button ? button : possibleButtons[0];
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
			if(bad) break;
			const curVal = possibleNames[i].trim(); // remove whitespace
			if(!curVal) continue;					// don't care if it's empty

			for(let j=0; j < badWords.length; j++){
				if(curVal.indexOf(badWords[j]) >= 0 ){
					bad = true;
					break;
				}
			}
		}

		for(let i=0; i < possibleNames.length; i++){
			if(good) break;
			const curVal = possibleNames[i].trim(); // remove whitespace
			if(!curVal) continue;					// don't care if it's empty

			for(let j=0; j < goodWords.length; j++){
				if(curVal.indexOf(goodWords[j]) >= 0){
					good = true;
					break;
				}
			}
		}

		if(good && bad) return 0;
		if(bad) return -1;
		if(good) return 1;
		return 0;	// !good && !bad
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
