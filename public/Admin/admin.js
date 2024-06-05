
// Get the .button element inside the .settings element
let Button = document.getElementById('back-button');

// Add a click event listener to the button
Button.addEventListener('click', () => {
      // Navigate back
      window.history.back();
});

// Get the subject-button element
let subjectButton = document.getElementById('subject-button');

// Add a click event listener to the subject-button
subjectButton.addEventListener('click', () => {
      // Perform the redirection
      window.location.href = './Pages/Subject-Creator/index.html'; // Replace 'https://example.com' with the desired URL
});