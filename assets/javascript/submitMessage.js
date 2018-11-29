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

function writeMessage(id, firstName, lastName, message) {
  firebase.database().ref('/message/' + id).set({
   'firstName': firstName,
    'lastName': lastName,
    'message': message,
  });
}

// This is a test example
// writeMessage(123, 'kaleb', 'test', 'This is my message to the poster of this job');
var value = sessionStorage.getItem("id");
$(document).ready(function(){
  $.ajax({
    url: `https://group-project-1-cfef2.firebaseio.com/message.json`,
    type: "GET",
  }).then(function(data) {
    console.log(value);
    console.log(data[value]);
    $('.chat-title').text(`${data[value].firstName} ${data[value].lastName}`);
    $('#message-area').text(data[value].message);
  });

  $(document).on('click', '#messageSubmit', function(event){
    event.preventDefault();
    writeMessage(value, $('#firstNameInput').val(), $("#lastNameInput").val(), $("#message").val());

    $("#firstNameInput").val("");
    $("#lastNameInput").val("");
    $("#message").val("");
  });
  
});