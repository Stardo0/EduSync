
// Get the .button element inside the .settings element
let Button = document.getElementById('back-button');

// Add a click event listener to the button
Button.addEventListener('click', () => {
      // Navigate back
      window.history.back();
});