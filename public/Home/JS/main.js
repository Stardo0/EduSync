// Check if the local storage has a username
if (localStorage.getItem("username")) {
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


// Check if the local storage has a profile picture
if (localStorage.getItem("profilePicture")) {
      // Get the profile picture from the local storage
      const profilePicture = localStorage.getItem("profilePicture");

      // Check if the profile picture is not null and not equal to "none"
      if (profilePicture !== null && profilePicture !== "none") {
            // Replace the image source with the profile picture
            document.getElementById("profile_picture").src = profilePicture;
      } else {
            // Replace the image source with the default profile picture
            document.getElementById("profile_picture").src = "../Pictures/icon-256x256.png";
      }
}
