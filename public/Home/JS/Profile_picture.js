// Check if the local storage has a profile picture
if (localStorage.getItem("profilePicture")) {
      // Get the profile picture from the local storage
      const profilePicture = localStorage.getItem("profilePicture");

      // Check if Profilepicture is null in local storage
      if (localStorage.getItem('profilePicture') == "null") {
            // Profilepicture is null
            console.log('Profilepicture is null');
            document.getElementById("profile_picture").src = "http://localhost:5500/public/Pictures/icon-256x256.png";
      } else {
            // Profilepicture is not null
            console.log('Profilepicture is not null');
            document.getElementById("profile_picture").src = profilePicture;
      }
}