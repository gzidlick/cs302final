reader = new FormReader();
console.log("NEW FORMREADER"); 
// testing with yahoo login page because who uses yahoo?
// (and my browser didn't have cookies saved to log me in)
// so this is the form id only for Yahoo. 
// We'll have to find it programmatically...TODO!
reader.getFormFields(document.getElementById("login-username-form"));
