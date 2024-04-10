function login() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
    
      firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    // Benutzername aus der Firebase Realtime Database holen
    firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      // Überprüfen, ob der Benutzername korrekt abgerufen wurde
      console.log('Benutzername aus der Datenbank:', username);
      // Benutzername und E-Mail im Zwischenspeicher speichern
      localStorage.setItem('username', username);
      localStorage.setItem('email', user.email);
      // Überprüfen, ob das Profilbild in der Firebase Realtime Database vorhanden ist
      if (snapshot.val() && snapshot.val().profilePicture) {
            var profilePicture = snapshot.val().profilePicture;
            // Profilbild im Zwischenspeicher speichern
            localStorage.setItem('profilePicture', profilePicture);
      }
      // Auf eine andere Seite leiten
      window.location.href = '../Home/index.html';
    });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('Fehler beim Einloggen: ' + errorMessage);
  });
}
document.getElementById('loginButton').addEventListener('click', login);

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