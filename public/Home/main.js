

// Add event listener to the Planner div
document.getElementById("Planner").addEventListener("click", function() {
      // Redirect to another page
      window.location.href = "./Planner/index.html"; // Replace "https://example.com/planner" with the desired URL
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
      window.location.href = "../Login%20and%20Register/Login.html"; // Replace "https://example.com" with the desired URL
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
            document.getElementById("profile_picture").src = "../Pictures/icon-256x256.png";
      }
}

// Auto Complete

let Subjects = [
      'Pytaguras',
      'Variables',
      'Functions',
      'Loops',
      'Arrays',
      'Strings',
      'Objects',
      'Classes',
      'Inheritance',
      'Polymorphism',
      'Encapsulation',
      'Abstraction',
      'Data Types',
      'Operators'
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














