// testing with yahoo login page because who uses yahoo?
// (and my browser didn't have cookies saved to log me in)
// so this is the form id only for Yahoo. 
// We'll have to find it programmatically...TODO!

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
		reader.registerSubmitHandler(curForm);
	}
});
