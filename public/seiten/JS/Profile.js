
  document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("profile").addEventListener("click", function() {
        var content = document.getElementById("profile-menu");
       if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "flex"; // Sichtbar machen
        } else {
            content.style.display = "none"; // Unsichtbar machen
        }
    });
  
    document.addEventListener("click", function(event) {
        var content = document.getElementById("profile-menu");
        var toggleButton = document.getElementById("profile");
        var isClickInsideContent = content.contains(event.target);
        var isClickInsideToggleButton = toggleButton.contains(event.target);
  
        if (!isClickInsideContent && !isClickInsideToggleButton) {
            content.style.display = "none"; // Unsichtbar machen, wenn außerhalb geklickt wird
        }
    });
  });