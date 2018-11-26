$(document).ready(function () {

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
  
    // Gather input from submitted form
    $("#submit-btn").on("click", function () {
  
        // Prevent page refresh on click
        event.preventDefault();
  
        // Store input data
        var firstName = $("#first-name-input").val().trim();
        var lastName = $("#last-name-input").val().trim();
        var email = $("#email-input").val().trim();
        var phoneNumber = $("#phone-number-input").val().trim();
        var comment = $("#comment-input").val().trim();
  
        // Create a local object for holding the data
        var newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            comment: comment
        };
  
        // Push captured data to the database
        database.ref().push(newUser);
  
        // Clear forms on submit
        $("#first-name-input").val("");
        $("#last-name-input").val("");
        $("#email-input").val("");
        $("#phone-number-input").val("");
        $("#comment-input").val("");
    });
  
    // Snippet for appending a new row of data to the feed
    // var newRow = $("<tr>").append(
    //     $("<td>").text("#"),
    //     $("<td>").text("#"),
    //     $("<td>").text("#"),
    //     $("<td>").text("#"),
    //     $("<td>").text("#"),
    // );
  });