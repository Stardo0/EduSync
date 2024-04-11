// Add event listener to the Planner div
document.getElementById("Home").addEventListener("click", function() {
      // Redirect to another page
      window.location.href = "../index.html"; // Replace "https://example.com/planner" with the desired URL
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
      window.location.href = "../../Login%20and%20Register/Login.html"; // Replace "https://example.com" with the desired URL
});

// Check if the local storage does not have a username or email
if (!localStorage.getItem("username") || !localStorage.getItem("email")) {
      // Redirect to another page
      window.location.href = "../Login%20and%20Register/Login.html";
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
            document.getElementById("profile_picture").src = ".././Pictures/icon-256x256.png";
      }
}