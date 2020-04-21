
let profiles = [];
        // example {id:1592304983049, title: 'Deadpool', year: 2015}
const addProfile = (ev) => {
   ev.preventDefault();  //to stop the form submitting
   let profile = {
       id: document.getElementById('profile').value,
       username: document.getElementById('username').value,
       password: document.getElementById('password').value
   }
   profiles.push(profile);
   document.forms[0].reset(); // to clear the form for the next entries
   //document.querySelector('form').reset();

   //saving to localStorage
localStorage.setItem(profile.id, JSON.stringify(profiles) );
}

document.addEventListener('DOMContentLoaded', () => {
   document.getElementById('btn').addEventListener('click',addProfile);
});

var importObject = {
   imports: {
    imported_func: function(arg) {
    console.log(arg);
    }
   }
 };

var response = null;
var bytes = null;
var results = null;


var wasmPath = chrome.runtime.getURL("rc4_wasm_bg.wasm");
fetch(wasmPath).then(response =>
    response.arrayBuffer()
    ).then(bytes =>
       WebAssembly.instantiate(bytes, importObject)
        ).then(results => {
        console.log(results.instance.exports);
  });
