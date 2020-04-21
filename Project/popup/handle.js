document.addEventListener('DOMContentLoaded', function(){
	console.log("here!");
	var link = document.getElementById('submit');
	link.addEventListener('click', handler);
});

function handler(){
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	console.log("username: " + username);
	console.log("password: " + password);
}
