function getLoginForm(){
	let list = document.getElementsByTagName("form");
	if(list.length >1){
		return null;
	}else{
		return list[0];
	}
}

window.addEventListener("pageshow", ev => {
	var reader = new FormReader();
	// register the submit handler
	var curForm = getLoginForm();
	if(curForm != null){
        // check the list to see if we have been to this website before
        let url = window.location.href;
        if(reader.checkVisited(url)){
            // autofill
        }else{
            // register submit handler so we can save
            console.log("here?");
		    reader.registerSubmitHandler(curForm);
        }
	}
});
