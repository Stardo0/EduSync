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
            document.getElementById("profile_picture").src = "/public/Pictures/icon-256x256.png";
      }
}