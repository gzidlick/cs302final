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
            document.getElementById('btn').addEventListener('click', addProfile);
        });
