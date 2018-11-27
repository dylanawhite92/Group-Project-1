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
        var id = $("#id-input").val().trim();
        var message = $("#message-input").val().trim();

        // Create a local object for holding the data
        var newMessage = {
            id: id,
            message: message
        }
  
        // Push captured data to the database
        database.ref("/message").push(newMessage);
  
        // Clear forms on submit
        $("#id-input").val("");
        $("#message-input").val(""); 
    });

    // when you submit a message, if id matches the id from the data point and grabs it then pushes to firebase
    // then next time it pulls the message based on the id 

  function addMediaObject() {
        // Snippet for appending a new object to the feed
        var newMediaObject = $("<li>").addClass("media")

        var newImage = $("<img>").addClass("mr-3");
        newImage.attr("src", response.data[i], image.url);
        newImage.attr("alt", response.data[i], name.text)
        
        var newDiv = $("<div>").addClass("media-body");
        newDiv.text("Text text text");
        var divHeader = $("<h5>").addClass("mt-0 mt-1");
        divHeader.text("Head Head Head");
        newDiv.prepend(divHeader);

        newMediaObject.append(newImage, newDiv,);
  }
        

    $(".list-unstyled").append(newMediaObject)
  });