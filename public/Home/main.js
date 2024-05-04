

// Add event listener to the Planner div
document.getElementById("Planner").addEventListener("click", function() {
      // Redirect to another page
      window.location.href = "/public/Home/Planner/index.html"; 
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
      window.location.href = "/public/Login%20and%20Register/Login.html"; // Replace "https://example.com" with the desired URL
});







