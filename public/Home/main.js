

// Add event listener to the Planner div
document.getElementById("Planner").addEventListener("click", function() {
      // Redirect to another page
      window.location.href = "/public/Home/Planner/index.html"; // Replace "https://example.com/planner" with the desired URL
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

// Auto Complete

let Subjects = [
      'Python',
      'Variables',
      'Pythagoras'

];

const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("searchbar");

inputBox.onkeyup = function(){
      let result = [];
      let input = inputBox.value;
      if(input.length){
            result = Subjects.filter((keyword) => {
                  return keyword.toLowerCase().includes(input.toLowerCase());
            });
      console.log(result);
      display(result);
      }
}

function display(result){
      const content = result.map((list) => {
            return "<li onclick=selectInput(this)>" + list + "</li>";
      });

      resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list){
      inputBox.value = list.textContent;
      resultBox.innerHTML = '';
}

document.addEventListener("click", function(event) {
      if (!event.target.matches("#searchbar")) {
            resultBox.innerHTML = '';
      }
});

// Add event listener to the "Enter" key press event
inputBox.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
            // Get the value from the input box
            const searchText = inputBox.value;

            // Redirect to the corresponding subject page
            window.location.href = `./Subjects/${searchText}.html`;
      }
});

// Add event listener to the result box
resultBox.addEventListener("click", function(event) {
      // Check if the clicked element is an <li> element
      if (event.target.tagName === "LI") {
            // Get the selected subject from the clicked <li> element
            const selectedSubject = event.target.textContent;

            // Redirect to the corresponding subject page
            window.location.href = `./Subjects/${selectedSubject}.html`;
      }
});

// Export the Subjects variable
export { Subjects };

// Rest of your code...





