firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
            // User is signed in.
            console.log("User is signed in");
            localStorage.setItem('email', user.email);
            localStorage.setItem('username', user.displayName);
            localStorage.setItem('profilePicture', user.photoURL);
            localStorage.setItem('uid', user.uid);
            let AdminButton = document.getElementById('AdminButton');
                  firebase.database().ref('admins').on('value', function(snapshot) {
                        if (snapshot.val()) {
                              console.log("User has access to admin area");
                              firebase.database().ref('admins').once('value', function(snapshot) {
                                    if (snapshot.child(user.uid).exists()) {
                                          console.log("User is an admin");
                                          AdminButton.style.display = 'flex';
                                          AdminButton.addEventListener('click', function() {
                                                window.location.href = "/Admin/Admin.html";
                                          });
                                    } else {
                                          console.log("User is not an admin");
                                          // Your code here for when the user is not an admin
                                    }
                              });
                        } else {
                              console.log("User is not an admin");
                              // Your code here for when the user is not an admin
                        }
                  });
      } else {
            // User is signed out.
            console.log("User is signed out");
            // Your code here for when the user is signed out
      }
});

