


  // Funktion zum Erstellen eines neuen Benutzers
  function register() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var name = document.getElementById('name').value;
  
      firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                  var user = userCredential.user;

                  firebase.database().ref('users/' + user.uid).set({
                        username: name,
                        email: email,
                        profilePicture: "none" // Include the profile picture variable
                  });

                  alert('Benutzer erfolgreich registriert');
            })
            .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  alert('Fehler bei der Registrierung: ' + errorMessage);
            });
      }

      // Fügen Sie einen Event-Listener für den Klick-Event der Schaltfläche "Registrieren" hinzu
      document.getElementById('register_button').addEventListener('click', register);

      document.getElementById('google').addEventListener('click', loginWithGoogle);

function loginWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      
      firebase.auth().signInWithPopup(provider)
            .then((result) => {
                  var user = result.user;
                  var username = user.displayName;
                  var email = user.email;
                  var profilePicture = user.photoURL; // Get profile picture URL

                  // Save to local storage
                  localStorage.setItem('username', username);
                  localStorage.setItem('email', email);
                  localStorage.setItem('profilePicture', profilePicture); // Save profile picture URL to local storage

                  window.location.href = '../Home/index.html';
            })
            .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  alert('Fehler beim Einloggen mit Google: ' + errorMessage);
            });
}

// Überprüfen, ob der Benutzer bereits eingeloggt ist
if (localStorage.getItem('username') && localStorage.getItem('email')) {
      // Auf eine andere Seite leiten
      window.location.href = '../Home/index.html';
}