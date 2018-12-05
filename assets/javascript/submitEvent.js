$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC-2cDf9lWxvBYNIH7xXH73DPgwRcQFrHg",
    authDomain: "group-project-1-cfef2.firebaseapp.com",
    databaseURL: "https://group-project-1-cfef2.firebaseio.com",
    projectId: "group-project-1-cfef2",
    storageBucket: "group-project-1-cfef2.appspot.com",
    messagingSenderId: "12922874168"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  function writeEventData(firstName, lastName, email, title, location, eventDescription, keywordsArray) {
    firebase.database().ref('/events/').push({
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'title': title, 
      'location': location,
      'description': eventDescription,
      'keywords': keywordsArray
    });
  }

  // Grab data from submission form on click of submit button, clear forms after
  $(document).on("click", '#eventSubmit', function(event){
    event.preventDefault();

    let string = $('#eventKeywords').val();
    let arrayOfKeywords = string.split(',')

    writeEventData($("#firstNameInput").val(), $('#lastNameInput').val(), $('#contactEmail').val(), $('#exampleFormControlInput1').val(), $('#exampleFormControlInput2').val(), $("#eventDescription").val() ,arrayOfKeywords);

    $("#firstNameInput").val("") 
    $('#lastNameInput').val("");
    $('#contactEmail').val("");
    $('#exampleFormControlInput1').val("")
    $('#exampleFormControlInput2').val("");
    $("#eventDescription").val("");
    $("#eventKeywords").val("");
  })
});