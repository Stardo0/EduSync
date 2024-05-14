// Add event listener to the Planner div
document.getElementById("Home").addEventListener("click", function() {
      // Redirect to another page
      window.location.href = "/Home/index.html"; // Replace "https://example.com/planner" with the desired URL
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





// Get references to the input elements and the checkbox
var titleInput = document.querySelector('.field .input #title');
var dateInput = document.querySelector('.field .input #placeholder');
var checkbox = document.querySelector('.chekbox');

// Function to add a task to the display
function addTaskToDisplay(task, taskId) {
      var anzeigeDiv = document.getElementById("anzeige");
      anzeigeDiv.insertAdjacentHTML('beforeend', `
          <div class="element">
              <div class="task" id="${taskId}">
                  <input type="text" class="what" id="title" placeholder="${task.title}" readonly>
                  <input type="date" class="date" id="date-${taskId}" value="${task.date}">
              </div>
              <div class="chekbox">
                  <img src="../../Pictures/charm_tick.svg" id="checkbox-id-${taskId}">
              </div>
          </div>
      `);
  
      // Add event listeners after the element is created
      addEventListeners(taskId);
  }

function addEventListeners(taskId) {
    // Add a change event listener to the date input field
    document.getElementById("date-" + taskId).addEventListener('change', function() {
        // Get the new date
        var newDate = this.value;

        // Update the date in the database
        const username = localStorage.getItem("username");
        const databaseRef = firebase.database().ref();
        databaseRef.child("user").child(username).child("planner").child(taskId).update({ date: newDate });
    });

    // Add a click event listener to the checkbox to delete the task
    document.getElementById("checkbox-id-" + taskId).addEventListener('click', function() {
        const username = localStorage.getItem("username");
        const databaseRef = firebase.database().ref();
        databaseRef.child("user").child(username).child("planner").child(taskId).remove();
        document.getElementById(taskId).parentNode.remove();
    });
}

// Add a click event listener to the checkbox
checkbox.addEventListener('click', function() {
    // Get the input values
    var title = titleInput.value;
    var date = dateInput.value;
    const username = localStorage.getItem("username");

    // Check if the input values are not empty
    if (title && date && username) {
        // Create a reference to the Firebase Realtime Database
        const databaseRef = firebase.database().ref();

        // Create a new entry in the database for the user
        var userData = {
            title: title,
            date: date
        };

        // Push the user data to the database
        databaseRef.child("user").child(username).child("planner").push(userData, function(error) {
            if (error) {
                // The write failed...
                console.error("Data could not be saved." + error);
            } else {
                var anzeigeDiv = document.getElementById("anzeige");
                anzeigeDiv.innerHTML = ""; // Clear the div
                // Data saved successfully!
                console.log("Data saved successfully!");

                // Get the task ID
                var taskId = this.key;

                // Add the task to the display
                addTaskToDisplay(userData, taskId);

                // Clear the input fields
                titleInput.value = '';
                dateInput.value = '';
                location.reload()
            }
        });
    } else {
        console.error("Title, date or username is missing.");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem("username");
    const databaseRef = firebase.database().ref();
    databaseRef.child("user").child(username).child("planner").once("value", function(snapshot) {
        var anzeigeDiv = document.getElementById("anzeige");
        anzeigeDiv.innerHTML = ""; // Clear the div

        if (snapshot.exists()) {
            // The data exists
            var tasks = snapshot.val();
            // tasks is now an object with all tasks

            // Convert the tasks object to an array
            var tasksArray = Object.values(tasks);

            // Sort the tasks array by date
            tasksArray.sort(function(a, b) {
                return new Date(a.date) - new Date(b.date);
            });

            // Add each task to the display
            tasksArray.forEach(function(task) {
                var taskId = Object.keys(tasks).find(key => tasks[key] === task);
                addTaskToDisplay(task, taskId);
            });
        } else {
            // There is no data
            anzeigeDiv.innerHTML = "<p>Looks like you don't lead a stressful life! 😅</p>";
        }
    });
});