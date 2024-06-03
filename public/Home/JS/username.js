
// Check if the local storage has a username
if (localStorage.getItem("username")) {

      if (localStorage.getItem("username") === "null") {
            // Redirect to another page
            console.log("Username is null");
      }     
      // Get the username from the local storage
      const username = localStorage.getItem("username");

      // Replace all occurrences of "[Name]" with the username
      document.body.innerHTML = document.body.innerHTML.replace(/\[Name\]/g, username);
}



// Check if the local storage has a email
if (localStorage.getItem("email")) {
      // Get the email from the local storage
      const email = localStorage.getItem("email");

      // Replace all occurrences of "[email]" with the email
      document.body.innerHTML = document.body.innerHTML.replace(/\[Email\]/g, email);
}


if (!localStorage.getItem("username") || !localStorage.getItem("email")) {
      // Redirect to another page
      window.location.href = "/Login%20and%20Register/Login.html";
}

firebase.auth().onAuthStateChanged((user) => {
      console.log(user.uid);
      if (user) {
            // Check if the user logged in with Google
            const providerId = user.providerData[0].providerId;
            if (providerId !== "google.com") {
                  // Get the username from the database
                  firebase.database().ref('users/' + user.uid + '/username').once('value')
                        .then((snapshot) => {
                              const usernameFromDatabase = snapshot.val();
                              console.log(usernameFromDatabase);

                              localStorage.setItem('username', usernameFromDatabase);
                              // Use the usernameFromDatabase variable as needed
                        })
                        .catch((error) => {
                              console.log(error);
                        });
            }
      }
});
