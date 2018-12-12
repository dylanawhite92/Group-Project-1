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
var value = sessionStorage.getItem("id");
var ref = database.ref(`/message/${value}`);
var arrayOfAppendedMessages = [];

function writeMessage(id, firstName, lastName, message) {
  firebase.database().ref('/message/' + id).push({
   'firstName': firstName,
    'lastName': lastName,
    'message': message
  });
}

function clearForms() {
  $("#firstNameInput").val("");
  $("#lastNameInput").val("");
  $("#message").val("");
};

function clearValidation() {
  $("#firstNameValidation").empty();
  $("#lastNameValidation").empty();
  $("#descriptionValidation").empty();
};

// Append messages stored in firebase to page
$(document).ready(function(){
  $.ajax({
    url: `https://group-project-1-cfef2.firebaseio.com/message.json`,
    type: "GET",
  }).then(function(data) {
    console.log(data);
    console.log(data[value]);
    if (data[value] !== undefined) {
      $('#message-board').empty();
    }

    for (let dataPoint in data[value]){
      console.log(dataPoint);
      if (data[value].hasOwnProperty(dataPoint)){
        let newDiv = $('<div>');

        newDiv.attr('class', 'chat-log');
        newDiv.attr('id', dataPoint);

        alreadyAppended.push(dataPoint);
        dataPoint = data[dataPoint];
        
        $(newDiv).append(`<p class='chat-title'>${dataPoint.firstName} ${dataPoint.lastName} says: ${dataPoint.message}`);

        $('#message-board').append(newDiv);      
      }
    }
  });

  // Grab data from submission form on click of submit button, clear forms after
  $(document).on('click', '#messageSubmit', function(event){
    event.preventDefault();

    clearValidation();

    let first = $('#firstNameInput').val().trim();
    let last = $('#lastNameInput').val().trim();
    let description = $('#message').val().trim();

    if (first && last && description) {
      writeMessage(value, $('#firstNameInput').val(), $("#lastNameInput").val(), $("#message").val());

      clearForms();
    }

    if (!first) {
      $("#firstNameValidation").text("Please enter a valid first name!");
    }
    if (!last) {
      $("#lastNameValidation").text("Please enter a valid last name!");
    }
    if (!description) {
      $("#descriptionValidation").text("Please enter a valid message!");
    }
  });

  ref.on('value', function(snapshot) {
    console.log(snapshot.val());
    console.log(arrayOfAppendedMessages);
    arrayOfAppendedMessages = appendData(snapshot.val(), arrayOfAppendedMessages);
  })
});

function appendData (data, alreadyAppended) {
  console.log(data);
  console.log(alreadyAppended);
  let i = 0;
  for (let dataPoint in data){
    console.log(dataPoint);
    // console.log(alreadyAppended[i]);
    if (alreadyAppended[i] === dataPoint) {
      i++;
    } else {
      i++;
      let newDiv = $('<div>');
      let time = firebase.database.ServerValue.TIMESTAMP;
      let dateAdded = moment(time).format('MMMM do YYYY, h:mm:ss a');
      console.log(dateAdded);

      newDiv.attr('class', 'chat-log');
      newDiv.attr('id', dataPoint);

      alreadyAppended.push(dataPoint);
      dataPoint = data[dataPoint];
      
      $(newDiv).append(`<p class='chat-title'>${dataPoint.firstName} ${dataPoint.lastName} says: ${dataPoint.message}<br>${dateAdded}`);

      $('#message-board').append(newDiv); 
    }
  }
  return alreadyAppended;
}