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

  function writeEducationData(firstName, lastName, email, title, link, educationDescription, keywordsArray) {
    firebase.database().ref('/education/').push({
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'title': title, 
      'url': link,
      'description': educationDescription,
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

  // Grab data from submission form on click of submit button, clear forms after
  // Validate forms to make sure they aren't empty/correct data types
  // Validate email with mailboxlayer API
  $(document).on("click", '#educationSubmit', function(event){
    event.preventDefault();

    let first = $('#firstNameInput').val().trim();
    let last = $('#lastNameInput').val().trim();
    let email = $('#contactEmailInput').val().trim();
    let job = $('#exampleFormControlInput1').val().trim();
    let location = $('#exampleFormControlInput2').val().trim();
    let description = $('#jobDescriptionInput').val().trim();
    let keywords = $('#jobKeywordsInput').val().trim();

    let string = $('#educationKeywords').val();
    let arrayOfKeywords = string.split(',')

    writeEducationData($("#firstNameInput").val(), $('#lastNameInput').val(), $('#contactEmail').val(), $('#exampleFormControlInput1').val(), $("#linkInput").val(), $("#educationDescription").val() ,arrayOfKeywords);

    $("#firstNameInput").val("") 
    $('#lastNameInput').val("");
    $('#contactEmail').val("");
    $('#exampleFormControlInput1').val("")
    $('#linkInput').val("")
    $("#educationDescription").val("");
    $("#educationKeywords").val("");
  })
});