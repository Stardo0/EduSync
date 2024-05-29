

// Add event listener to the Planner div
document.getElementById("Home").addEventListener("click", function() {
      window.location.href = "/Login%20and%20Register/Login.html";
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
      window.location.href = "/Login%20and%20Register/Login.html"; // Replace "https://example.com" with the desired URL
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
            const email = localStorage.getItem("email").replace(/[.#$[\]]/g, "_");
            const databaseRef = firebase.database().ref();
            databaseRef.child("user").child(email).child("planner").child(taskId).update({ date: newDate });
      });

      // Add a click event listener to the checkbox to delete the task
      document.getElementById("checkbox-id-" + taskId).addEventListener('click', function() {
            const email = localStorage.getItem("email").replace(/[.#$[\]]/g, "_");
            const databaseRef = firebase.database().ref();
            databaseRef.child("user").child(email).child("planner").child(taskId).remove();
            document.getElementById(taskId).parentNode.remove();

            // Store the deleted task ID in Firebase
            databaseRef.child("user").child(email).child("deletedTasks").push(taskId);
            updateTaskDisplay();
      });
}

// Add a click event listener to the checkbox
checkbox.addEventListener('click', function() {
      // Get the input values
      var title = titleInput.value;
      var date = dateInput.value;
      const email = localStorage.getItem("email").replace(/[.#$[\]]/g, "_");

      // Check if the input values are not empty
      if (title && date && email) {
            // Create a reference to the Firebase Realtime Database
            const databaseRef = firebase.database().ref();

            // Create a new entry in the database for the user
            var userData = {
                  title: title,
                  date: date
            };

            // Push the user data to the database
            databaseRef.child("user").child(email).child("planner").push(userData, function(error) {
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
            console.error("Title, date or email is missing.");
      }
});

document.addEventListener("DOMContentLoaded", function() {
      const email = localStorage.getItem("email").replace(/[.#$[\]]/g, "_");
      const databaseRef = firebase.database().ref();
      databaseRef.child("user").child(email).child("planner").once("value", function(snapshot) {
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
            } else  {
                  // There is no data
                  anzeigeDiv.innerHTML = "<p>Looks like you don't lead a stressful life! 😅</p>";
            }
      });
});

// Generate a 4-digit code that is not already taken by any other user
function generateUniqueCode() {
      const databaseRef = firebase.database().ref();
      const codeRef = databaseRef.child("codes");

      return codeRef.once("value").then(snapshot => {
            const codes = snapshot.val() || {};
            const usedCodes = Object.values(codes);

            let code;
            do {
                  code = Math.floor(1000 + Math.random() * 9000).toString();
            } while (usedCodes.includes(code));

            return code;
      });
}



// Check if a code is already assigned to the user
var email = localStorage.getItem("email").replace(/[.#$[\]]/g, "_");
console.log("Checking for code for user: " + email); // Debugging line
databaseRef.child("user").child(email).child("code").once("value", function(snapshot) {
      if (!snapshot.exists()) {
            console.log("No code found, generating a new one"); // Debugging line
            // Generate a unique code
            generateUniqueCode().then(code => {
                  console.log("Generated code: " + code); // Debugging line
                  // Save the code in the database
                  databaseRef.child("user").child(email).child("code").set(code, function(error) {
                        if (error) {
                              console.error("Code could not be saved." + error);
                        } else {
                              // Code saved successfully!
                              console.log("Code saved successfully!");
                              console.log("Code: " + code);
                              // Save the code in the local storage
                              localStorage.setItem("code", code);
                        }
                  });
            }).catch(error => {
                  console.error("Error generating code: " + error); // Debugging line
            });
      } else {
            // Code already exists
            var code = snapshot.val();
            console.log("Code: " + code);
            // Save the code in the local storage
            localStorage.setItem("code", code);
      }
});


// Add event listener to the cloning button
document.querySelector(".input-cloning").addEventListener("keyup", function(event) {
      // Check if Enter key is pressed
      if (event.keyCode === 13) {
            // Get the input value
            // Angenommen, Sie haben ein Input-Feld mit der ID "cloningField"
var cloningField = document.getElementById("cloningField");

            // Fügen Sie einen Event-Listener für das 'blur'-Ereignis hinzu
            cloningField.addEventListener('blur', function() {
            var cloningCode = cloningField.value;

            // Überprüfen Sie, ob der Cloning-Code vorhanden ist
            if (cloningCode) {
                  // Erstellen Sie eine Referenz zur Firebase Realtime Database
                  const databaseRef = firebase.database().ref();

                  // Speichern Sie den Cloning-Code unter der E-Mail des Benutzers
                  var email = localStorage.getItem("email").replace(/[.#$[\]]/g, "_");
                  databaseRef.child("user").child(email).child("cloningCode").set(cloningCode, function(error) {
                        if (error) {
                        console.error("Cloning code could not be saved." + error);
                        } else {
                        // Cloning-Code wurde erfolgreich gespeichert!
                        console.log("Cloning code saved successfully!");

                        // Speichern Sie den Cloning-Code im lokalen Speicher
                        localStorage.setItem("cloningCode", cloningCode);
                        }
                  });
            } else {
                  console.error("Cloning code is missing.");
            }
            });
      }
});

// Check if a cloning code is already assigned to the user
var email = localStorage.getItem("email").replace(/[.#$[\]]/g, "_");
console.log("Checking for cloning code for user: " + email); // Debugging line
databaseRef.child("user").child(email).child("cloningCode").once("value", function(snapshot) {
      if (snapshot.exists()) {
            var cloningCode = snapshot.val();
            console.log("Cloning code: " + cloningCode);
            // Save the cloning code in the local storage
            localStorage.setItem("cloningCode", cloningCode);
      }
});

// Get the cloning code from local storage
var cloningCode = localStorage.getItem("cloningCode");

// Set the value of the input field to the cloning code
document.querySelector(".input-cloning").value = cloningCode;

// Add event listener to the input field to save changes
document.querySelector(".input-cloning").addEventListener("input", function() {
      // Get the input value
      var cloningCode = this.value.trim();

      // Check if the input value is not empty
      if (cloningCode) {
            // Get the user's email from local storage
            var email = localStorage.getItem("email").replace(/[.#$[\]]/g, "_");

            // Create a reference to the Firebase Realtime Database
            const databaseRef = firebase.database().ref();

            // Save the cloning code under the user's email
            databaseRef.child("user").child(email).child("cloningCode").set(cloningCode, function(error) {
                  if (error) {
                        console.error("Cloning code could not be saved." + error);
                  } else {
                        // Cloning code saved successfully!
                        console.log("Cloning code saved successfully!");

                        // Save the cloning code in the local storage
                        localStorage.setItem("cloningCode", cloningCode);
                        seartchCloningPerson();
                  }
            });
      } else {
            console.error("Cloning code is missing.");
      }
});




function seartchCloningPerson() {
            // Get the cloning code from local storage
      var cloningCode = localStorage.getItem("cloningCode");

      // Search for the cloning code in the database
      databaseRef.child("user").orderByChild("code").equalTo(cloningCode).once("value", function(snapshot) {
            if (snapshot.exists()) {
                  // The cloning code is found
                  snapshot.forEach(function(childSnapshot) {
                        // Get the user's email
                        var email = childSnapshot.key;
                        console.log("Email: " + email);
                        let clonedpersonsEmail = email;
                        localStorage.setItem("clonedpersonsEmail", clonedpersonsEmail);
                  });
            } else {
                  // The cloning code is not found
                  console.log("No user found with the cloning code.");
                  localStorage.removeItem("clonedpersonsEmail");
            }
      });
}



seartchCloningPerson();

let clonedpersonsEmail = localStorage.getItem("clonedpersonsEmail");

if (clonedpersonsEmail && clonedpersonsEmail !== "") {
    databaseRef.child("user").child(clonedpersonsEmail).child("planner").once("value", function(snapshot) {
        // rest of your code
            snapshot.forEach(function(childSnapshot) {
                  // Get the task data
                  var task = childSnapshot.val();
                  var taskId = childSnapshot.key;
                  
            });
            // Wählen Sie das p-Element aus
            var pElement = document.querySelector('.anzeige p');

            // Überprüfen Sie, ob das Element existiert
            if (pElement) {
            // Entfernen Sie das Element
            pElement.remove();
            }
      });
}

clonePerson();
// Function to clone a person
function clonePerson() {
      // Get the cloning code from local storage
      var cloningCode = localStorage.getItem("cloningCode");

      // Search for the cloning code in the database
      databaseRef.child("user").orderByChild("code").equalTo(cloningCode).once("value", function(snapshot) {
            if (snapshot.exists()) {
                  // Loop through each user with the cloning code
                  snapshot.forEach(function(childSnapshot) {
                        // Get the cloned person's email
                        var clonedpersonsEmail = childSnapshot.key;

                        // Save the cloned person's email in local storage
                        localStorage.setItem("clonedpersonsEmail", clonedpersonsEmail);

                        // Get the tasks for the cloned person
                        databaseRef.child("user").child(clonedpersonsEmail).child("planner").once("value", function(snapshot) {
                              if (snapshot.exists()) {
                                    // Loop through each task
                                    snapshot.forEach(function(childSnapshot) {
                                          // Get the task data
                                          var taskId = childSnapshot.key;
                                          var task = childSnapshot.val();

                                          // Add the task to the display
                                          addTaskToDisplay(task, taskId);
                                    });

                                    // Select the p element
                                    var pElement = document.querySelector('.anzeige p');

                                    // Check if the element exists
                                    if (pElement) {
                                          // Hide the p element
                                          pElement.style.display = "none";
                                    }
                              } else {
                                    var pElement = document.querySelector('.anzeige');
                                    pElement.style.display = "<p>Looks like you don't lead a stressful life! 😅</p>";
                              }
                        });
                  });
            }
      });
      
}


// Retrieve the deleted tasks for the user
databaseRef.child("user").child(email).child("deletedTasks").once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            const email = localStorage.getItem("email").replace(/[.#$[\]]/g, "_");
            // Remove the task from the "planner" node
            databaseRef.child("user").child(email).child("planner").child(childData).remove();

            // Remove the task element from the DOM if it exists
            var taskElement = document.getElementById(childData);
            if (taskElement) {
                  taskElement.parentNode.remove();
                  updateTaskDisplay();
            }
      });
});


function updateTaskDisplay() {
      var anzeigeDiv = document.querySelector(".anzeige");
      if (anzeigeDiv.children.length === 0) {
        anzeigeDiv.innerHTML = "<p>Looks like you don't lead a stressful life! 😅</p>";
      }
}

document.addEventListener("DOMContentLoaded", function() {
      var isMenuOpen = false;
      var cloningField = document.querySelector(".cloning-field");
      if (cloningField) {
            cloningField.style.display = "none";
      }
      var cloningDiv = document.querySelector(".cloning .text, .cloning");
      if (cloningDiv) {
            cloningDiv.addEventListener("click", function(event) {
                  if (event.target === this) {
                        var cloningField = document.querySelector(".cloning-field");
                        if (cloningField) {
                              cloningField.style.display = cloningField.style.display === "block" ? "none" : "block";
                              isMenuOpen = true;
                        }
                  }
            });
      }
      document.addEventListener("click", function(event) {
            var cloningField = document.querySelector(".cloning-field");
            var cloningButton = document.querySelector(".cloning");
            if (cloningField && !cloningField.contains(event.target) && event.target !== cloningButton) {
                  var displayStyle = window.getComputedStyle(cloningField).display;
                  if (displayStyle !== "none") {
                        if (isMenuOpen) {
                              cloningField.style.display = "none";
                              clonePerson();
                        }
                  }
            }
      });
            // Get the code from local storage
      var code = localStorage.getItem("code");

      // Display the code in the HTML
      var anzeigeDiv = document.getElementById("clonign-field-i");
      anzeigeDiv.insertAdjacentHTML('beforeend', `
            <div class="code-title">Your Code :</div>
            <div class="code">${code}</div>
      `);
});
