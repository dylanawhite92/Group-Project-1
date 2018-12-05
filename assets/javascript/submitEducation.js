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
    $('#linkInput').val("");
    $('#educationDescriptionInput').val("");
    $("#educationKeywordsInput").val("");
  };

  function clearValidation() {
    $("#firstNameValidation").empty();
    $("#lastNameValidation").empty();
    $("#emailValidation").empty();
    $("#educationTitleValidation").empty();
    $("#linkValidation").empty();
    $("#descriptionValidation").empty();
    $("#keywordValidation").empty();
  };

  // Grab data from submission form on click of submit button, clear forms after
  // Validate forms to make sure they aren't empty/correct data types
  // Validate email with mailboxlayer API
  $(document).on("click", '#educationSubmit', function(event){
    event.preventDefault();

    clearValidation();

    let first = $('#firstNameInput').val().trim();
    let last = $('#lastNameInput').val().trim();
    let email = $('#contactEmailInput').val().trim();
    let education = $('#exampleFormControlInput1').val().trim();
    let link = $('#linkInput').val().trim();
    let description = $('#educationDescriptionInput').val().trim();
    let keywords = $('#educationKeywordsInput').val().trim();

    let string = $('#educationKeywordsInput').val();
    let arrayOfKeywords = string.split(',')

    if (first && last && email && education && link && description && keywords) {
    writeEducationData($("#firstNameInput").val(), $('#lastNameInput').val(), $('#contactEmailInput').val(), 
    $('#exampleFormControlInput1').val(), $("#linkInput").val(), $("#educationDescriptionInput").val() ,arrayOfKeywords);

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
    if (!education) {
      $("#educationTitleValidation").text("Please enter a valid title!");
    }
    if (!link) {
      $("#linkValidation").text("Please enter a valid link!");
    }
    if (!description) {
      $("#descriptionValidation").text("Please enter a valid description!");
    }
    if (!keywords) {
      $("#keywordValidation").text("Please enter any number of valid keywords!");
    }
  })
});