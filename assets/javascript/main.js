const HEROKU_REDIRECT = "https://cors-anywhere.herokuapp.com/";
const GITHUB_JOB_URL = "https://jobs.github.com/positions.json?search=";
const KHAN_ACADEMY_URL = "https://www.khanacademy.org/api/v1/playlists/";
const KHAN_ACADEMY_URL2 = "/videos";
const EVENT_BRIGHT_URL = "https://www.eventbriteapi.com/v3/events/search/?token=JCADVWXDZ2YXAS473ULD&q=";

$(document).ready(function () {

//   function ajaxGetRequest(urlToCall, queryParameter){
//     $.ajax({
//       type: 'GET',
//       url: (`${HEROKU_REDIRECT}${urlToCall}${queryParameter}`),
//     }).then(function(data) {
//       console.log(data);
//       return data;
//     });
//   }
//   function ajaxGetRequestKHAN(urlToCall, url_2nd_half, queryParameter){
//     $.ajax({
//       type: 'GET',
//       url: (`${urlToCall}${queryParameter}${url_2nd_half}`),
//     }).then(function(data) {
//       console.log(data);
//       return data;
//     });
//   }
//   let githubJobData = ajaxGetRequest(GITHUB_JOB_URL, 'javascript');
//   let khanAcademyData = ajaxGetRequestKHAN(KHAN_ACADEMY_URL, KHAN_ACADEMY_URL2, "pre-algebra-exponents");
//   let eventData = ajaxGetRequest(EVENT_BRIGHT_URL, "tech");
  
//     // Initialize Firebase
//     var config = {
//         apiKey: "AIzaSyC-2cDf9lWxvBYNIH7xXH73DPgwRcQFrHg",
//         authDomain: "group-project-1-cfef2.firebaseapp.com",
//         databaseURL: "https://group-project-1-cfef2.firebaseio.com",
//         projectId: "group-project-1-cfef2",
//         storageBucket: "group-project-1-cfef2.appspot.com",
//         messagingSenderId: "12922874168"
//     };
  
//     firebase.initializeApp(config);
  
//     // Create a variable to reference the database
//     var database = firebase.database();

    // Gather input from submitted form
    // $("#submit-btn").on("click", function () {
  
    //     // Prevent page refresh on click
    //     event.preventDefault();
  
    //     // Store input data
    //     var id = $("#id-input").val().trim();
    //     var message = $("#message-input").val().trim();

    //     // Create a local object for holding the data
    //     var newMessage = {
    //         id: id,
    //         message: message
    //     }
  
    //     // Push captured data to the database
    //     database.ref("/message").push(newMessage);
  
    //     // Clear forms on submit
    //     $("#id-input").val("");
    //     $("#message-input").val(""); 
    // });

    // when you submit a message, if id matches the id from the data point and grabs it then pushes to firebase
    // then next time it pulls the message based on the id 

  $("#submit-btn").on("click", function () {
        // Snippet for appending a new object to the feed
        var newMediaObject = $("<li>").addClass("media my-2")

        var newImage = $("<img>").addClass("mr-3");
        newImage.attr("src", "assets/images/150.png");
        newImage.attr("alt", "response.data[i], name.text")
        
        var newDiv = $("<div>").addClass("media-body");
        newDiv.text("Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.");
        var divHeader = $("<h5>").addClass("mt-0 mt-1");
        divHeader.text(" List-based media object");
        newDiv.prepend(divHeader);

        // Badge based on what option is selected
        var newSpan = $("<span>").addClass("badge badge-pill");

        if ($("#job-check").is(":checked")) {
            newSpan.addClass("badge-primary");
            newSpan.text("Job");
            divHeader.prepend(newSpan);
        }
        else if ($("#education-check").is(":checked")) {
            newSpan.addClass("badge-success");
            newSpan.text("Education");
            divHeader.prepend(newSpan);
        }
        else if ($("#event-check").is(":checked")) {
            newSpan.addClass("badge-warning");
            newSpan.text("Event");
            divHeader.prepend(newSpan);
        }
        newMediaObject.append(newImage, newDiv);
        
        $(".list-unstyled").append(newMediaObject)
    });
  });