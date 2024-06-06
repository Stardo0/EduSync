// Check if the local storage has a username
if (localStorage.getItem("selectedSubject")) {
      // Get the username from the local storage
      const subject = localStorage.getItem("selectedSubject");

      // Capitalize the first letter of the subject
      const capitalizedSubject = subject.charAt(0).toUpperCase() + subject.slice(1);

      // Replace all occurrences of "[Titel]" with the capitalized subject
      document.body.innerHTML = document.body.innerHTML.replace(/\[Titel\]/g, capitalizedSubject);
}

document.getElementById("Planner").addEventListener("click", function() {
      window.location.href = "/Home/Planner/index.html";
});

// Add event listener to the logout div
document.getElementById("Logout").addEventListener("click", function() {
      // Remove username from local storage
      localStorage.removeItem("username");

      // Remove email from local storage
      localStorage.removeItem("email");

      // Remove profile picture from local storage
      localStorage.removeItem("profilePicture");

      // Redirect to another page
      window.location.href = "/Login%20and%20Register/Login.html"; // Replace "https://example.com" with the desired URL
});

// Check if the local storage has a selected subject
if (localStorage.getItem("selectedSubject")) {
      // Get the selected subject from local storage
      const selectedSubject = localStorage.getItem("selectedSubject");

      // Retrieve the HTML content from the Firebase Realtime Database
      firebase.database().ref("subjects/" + selectedSubject + "/HTML").once("value")
      .then(function(snapshot) {
            console.log(snapshot.val()); // Log the returned object
            const htmlContent = snapshot.val();
            document.querySelector(".explainer").innerHTML = htmlContent;
      })
            .catch(function(error) {
                  console.error("Error retrieving HTML content from Firebase Realtime Database:", error);
            });
}


