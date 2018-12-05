// DIFFERENTIATE BETWEEN OUR DATABASE AND API LISTING
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

  function writeJobData(firstName, lastName, email, jobTitle, location, jobDescription, keywordsArray) {
    firebase.database().ref('/jobs/').push({
    'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'title': jobTitle, 
      'location': location,
      'description': jobDescription,
      'keywords': keywordsArray
    });
  }

  function clearForms() {
    $('#firstNameInput').val("");
    $('#lastNameInput').val("");
    $('#contactEmailInput').val("");
    $('#exampleFormControlInput1').val("");
    $('#exampleFormControlInput2').val("");
    $('#jobDescriptionInput').val("");
    $("#jobKeywordsInput").val("");
  };

  function clearValidation() {
    $("#firstNameValidation").empty();
    $("#lastNameValidation").empty();
    $("#emailValidation").empty();
    $("#jobTitleValidation").empty();
    $("#jobLocationValidation").empty();
    $("#descriptionValidation").empty();
    $("#keywordValidation").empty();
  };

  // writeJobData('kaleb', 'test', 'test@SpeechGrammarList.com', 'software Engineer', 'have to like dogs', ['frogs', 'dogs', 'code', 'tech', 'javaScript']);

  // Grab data from submission form on click of submit button, clear forms after
  $(document).on("click", '#jobSubmit', function(event){
    event.preventDefault();

    clearValidation();

    let first = $('#firstNameInput').val().trim();
    let last = $('#lastNameInput').val().trim();
    let email = $('#contactEmailInput').val().trim();
    let job = $('#exampleFormControlInput1').val().trim();
    let location = $('#exampleFormControlInput2').val().trim();
    let description = $('#jobDescriptionInput').val().trim();
    let keywords = $('#jobKeywordsInput').val().trim();

    let string = $('#jobKeywordsInput').val();
    let arrayOfKeywords = string.split(',')

    if (first && last && email && job && location && description && keywords) {
      writeJobData($('#firstNameInput').val(), $('#lastNameInput').val(), $('#contactEmailInput').val(), 
      $('#exampleFormControlInput1').val(), $('#exampleFormControlInput2').val(), $('#jobDescriptionInput').val(), arrayOfKeywords);
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
    if (!job) {
      $("#jobTitleValidation").text("Please enter a valid job title!");
    }
    if (!location) {
      $("#jobLocationValidation").text("Please enter a valid location!");
    }
    if (!description) {
      $("#descriptionValidation").text("Please enter a valid description!");
    }
    if (!keywords) {
      $("#keywordValidation").text("Please enter any number of valid keywords!");
    }
  })
});