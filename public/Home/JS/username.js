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


// Check if the local storage does not have a username or email
if (!localStorage.getItem("username") || !localStorage.getItem("email")) {
      // Redirect to another page
      window.location.href = "../Login%20and%20Register/Login.html";
}
