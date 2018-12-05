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

  function clearForms() {
    $('#firstNameInput').val("");
    $('#lastNameInput').val("");
    $('#contactEmailInput').val("");
    $('#exampleFormControlInput1').val("");
    $('#exampleFormControlInput2').val("");
    $('#eventDescriptionInput').val("");
    $("#eventKeywordsInput").val("");
  };

  function clearValidation() {
    $("#firstNameValidation").empty();
    $("#lastNameValidation").empty();
    $("#emailValidation").empty();
    $("#eventTitleValidation").empty();
    $("#locationValidation").empty();
    $("#descriptionValidation").empty();
    $("#keywordValidation").empty();
  };

  // Grab data from submission form on click of submit button, clear forms after
  $(document).on("click", '#eventSubmit', function(event){
    event.preventDefault();

    clearValidation();

    let first = $('#firstNameInput').val().trim();
    let last = $('#lastNameInput').val().trim();
    let email = $('#contactEmailInput').val().trim();
    let userEvent = $('#exampleFormControlInput1').val().trim();
    let location = $('#exampleFormControlInput2').val().trim();
    let description = $('#eventDescriptionInput').val().trim();
    let keywords = $('#eventKeywordsInput').val().trim();

    let string = $('#eventKeywordsInput').val();
    let arrayOfKeywords = string.split(',')

    if (first && last && email && userEvent && location && description && keywords) {
      writeEventData($("#firstNameInput").val(), $('#lastNameInput').val(), $('#contactEmailInput').val(), 
      $('#exampleFormControlInput1').val(), $('#exampleFormControlInput2').val(), $("#eventDescriptionInput").val() ,arrayOfKeywords);
      
      clearForms();
    }

    if (!first) {
      $("#firstNameValidation").text("Please enter a valid first name!");
    }
    if (!last) {
      $("#lastNameValidation").text("Please enter a valid last name!");
    }
    if (!email) {
      $("#emailValidation").text("Please enter a valid email address!");
    }
    if (!userEvent) {
      $("#eventTitleValidation").text("Please enter a valid event title!");
    }
    if (!location) {
      $("#locationValidation").text("Please enter a valid location!");
    }
    if (!description) {
      $("#descriptionValidation").text("Please enter a valid description!");
    }
    if (!keywords) {
      $("#keywordValidation").text("Please enter any number of valid keywords!");
    }
  })
});