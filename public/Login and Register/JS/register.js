

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
                        email: email
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
