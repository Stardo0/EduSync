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