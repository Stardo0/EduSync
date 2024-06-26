// Auto Complete
let Subjects = [];

databaseRef.child("subjects").once("value", function(snapshot) {
      console.log(Subjects);
      if (snapshot.exists()) {
            // Loop through each task
            snapshot.forEach(function(childSnapshot) {
                  // Get the task data
                  Subjects.push(childSnapshot.key);
                  console.log(Subjects);
            });
      } else {
            console.log("No data available");
      }
});

console.log(Subjects);
console.log("seartch...");
const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("searchbar");

inputBox.onkeyup = function(){
      let result = [];
      let input = inputBox.value;
      if(input.length){
          result = Subjects.filter((keyword) => {
              return typeof keyword === 'string' && keyword.toLowerCase().includes(input.toLowerCase());
          });
          console.log(result);
          display(result);
      } else {
          console.log("No data available 2");
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
      } else {
            console.log("No data available 3");
      
      }
});

// Add event listener to the "Enter" key press event
inputBox.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
            // Get the value from the input box
            const searchText = inputBox.value;
            localStorage.setItem("selectedSubject", selectedSubject);
            // Redirect to the corresponding subject page
            window.location.href = `/Home/Subjects/Preset/Preset.html`;
      }
});

// Add event listener to the result box
resultBox.addEventListener("click", function(event) {
      // Check if the clicked element is an <li> element
      if (event.target.tagName === "LI") {
            // Get the selected subject from the clicked <li> element
            const selectedSubject = event.target.textContent;
            // Save the selected subject to local storage
            localStorage.setItem("selectedSubject", selectedSubject);
            // Redirect to the corresponding subject page
            window.location.href = `/Home/Subjects/Preset/Preset.html`;
      }
});
