class FormReader {
	getFormFields(form){
		let pwFields = [];
		let userFields = [];

		// search the DOM for any form fields we might need
		for (let i = 0; i < form.elements.length; i++){
			if(form.elements[i].localName.toLowerCase() != "input" &&
				(form.elements[i].type == undefined || form.elements[i].type == null))
				continue; // it's not a username or password field

			const DOMtype = form.elements[i].type.toLowerCase();

			if(DOMtype == "fieldset")
				continue; // probably not a fieldset

			if(DOMtype == "radio") continue;
			if(DOMtype == "select-one") continue;
			console.log("processing field with domtype", DOMtype);
		}
	}
}
