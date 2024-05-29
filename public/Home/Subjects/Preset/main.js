// Check if the local storage has a username
if (localStorage.getItem("selectedSubject")) {
      // Get the username from the local storage
      const subject = localStorage.getItem("selectedSubject");

      // Capitalize the first letter of the subject
      const capitalizedSubject = subject.charAt(0).toUpperCase() + subject.slice(1);

      // Replace all occurrences of "[Titel]" with the capitalized subject
      document.body.innerHTML = document.body.innerHTML.replace(/\[Titel\]/g, capitalizedSubject);
}




