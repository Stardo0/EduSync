document.getElementById("back-button").addEventListener("click", function() {
      window.history.back();
});

document.getElementById("add-button").addEventListener("click", function() {
      var subject = document.getElementById("subject").value;
      var html = quill.getSemanticHTML();
      console.log(subject);
      console.log(html);
      firebase.database().ref('subjects/' + subject).set({
            HTML: html
      });
});


