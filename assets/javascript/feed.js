const HEROKU_REDIRECT = "https://cors-anywhere.herokuapp.com/";
const GITHUB_JOB_URL = "https://jobs.github.com/positions.json?search=";
const KHAN_ACADEMY_URL = "https://www.khanacademy.org/api/v1/playlists/";
const KHAN_ACADEMY_URL2 = "/videos";
const EVENT_BRIGHT_URL = "https://www.eventbriteapi.com/v3/events/search/?token=JCADVWXDZ2YXAS473ULD&q=";

function renderScreen(data) {
  console.log(data);
  var newMediaObject = $("<li>").addClass("media my-2")
  var newSpan = $("<span>").addClass("badge badge-pill");
  var newImage = $("<img>").addClass("mr-3");
  var newDiv = $("<div>").addClass("media-body");
  var divHeader = $("<h5>").addClass("mt-0 mt-1");

  newMediaObject.append(newSpan, newImage, newDiv, divHeader)

  $(".list-unstyled").append(newMediaObject)
};

$(document).ready(function () {

  function ajaxGetRequest(urlToCall, queryParameter){
    $.ajax({
      type: 'GET',
      url: (`${HEROKU_REDIRECT}${urlToCall}${queryParameter}`),
    }).then(function(data) {
      // console.log(data);
      // return data;
      renderScreen(data);
    });
  }
  function ajaxGetRequestKHAN(urlToCall, url_2nd_half, queryParameter){
    $.ajax({
      type: 'GET',
      url: (`${urlToCall}${queryParameter}${url_2nd_half}`),
    }).then(function(data) {
      // console.log(data);
      // return data;
      renderScreen(data);
    });
  }
  // let githubJobData = ajaxGetRequest(GITHUB_JOB_URL, 'javascript');
  // let khanAcademyData = ajaxGetRequestKHAN(KHAN_ACADEMY_URL, KHAN_ACADEMY_URL2, "pre-algebra-exponents");
  // let eventData = ajaxGetRequest(EVENT_BRIGHT_URL, "tech");
  
  // Initialize Firebase
  // var config = {
  //     apiKey: "AIzaSyC-2cDf9lWxvBYNIH7xXH73DPgwRcQFrHg",
  //     authDomain: "group-project-1-cfef2.firebaseapp.com",
  //     databaseURL: "https://group-project-1-cfef2.firebaseio.com",
  //     projectId: "group-project-1-cfef2",
  //     storageBucket: "group-project-1-cfef2.appspot.com",
  //     messagingSenderId: "12922874168"
  // };

  // firebase.initializeApp(config);

  // // Create a variable to reference the database
  // var database = firebase.database();

    // $("#submit-btn").on("click", ajaxGetRequest(GITHUB_JOB_URL, "javascript"));
    $("#submit-btn").on("click", function() {
      console.log("click");
      if ($("#job-check").is(":checked")) {
        ajaxGetRequest(GITHUB_JOB_URL, "javascript");
      }
      else if ($("#education-check").is(":checked")) {
        ajaxGetRequestKHAN(KHAN_ACADEMY_URL, KHAN_ACADEMY_URL2, "pre-algebra-exponents");
      }
      else if ($("#event-check").is(":checked")) {
        ajaxGetRequest(EVENT_BRIGHT_URL, "tech");
      }
    });

    // $("#submit-btn").on("click", function () {
    //   // Snippet for appending a new object to the feed
    //   var newMediaObject = $("<li>").addClass("media my-2")

    //   var newImage = $("<img>").addClass("mr-3");
    //   // // newImage.attr("src", "assets/images/150.png");
    //   // // newImage.attr("alt", "response.data[i], name.text")
      
    //   // var newDiv = $("<div>").addClass("media-body");
    //   // // newDiv.text("Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.");
    //   // var divHeader = $("<h5>").addClass("mt-0 mt-1");
    //   // divHeader.text(" List-based media object");
    //   // newDiv.prepend(divHeader);

    //   // Badge based on what option is selected
    //   var newSpan = $("<span>").addClass("badge badge-pill");

    //   if ($("#job-check").is(":checked")) {
    //       // newSpan.addClass("badge-primary");
    //       // newSpan.text("Job");
    //       // divHeader.prepend(newSpan);

    //       // Need to edit github api data into loop
    //       for (var i = 0; i < githubJobData.data.length; i++) {
    //           newSpan.addClass("badge-primary");
    //           newSpan.text("Job");
    //           divHeader.prepend(newSpan);

    //           // Try with and without the thumbnail data 
    //           newImage.attr("src", githubJobData.data[i].image_url + githubJobData.data[i].thumbnail_data.gcs_name)
    //           newImage.attr("alt", githubJobData.data[i].description)

    //           var newDiv = $("<div>").addClass("media-body");
    //           newDiv.text(githubJobData.data[i].description.text);
    //           var divHeader = $("<h5>").addClass("mt-0 mt-1");
    //           divHeader.text(githubJobData.data[i].company + " , " + githubJobData.data[i].title + " , " + githubJobData.data[i].type + " , " + githubJobData.data[i].location);
    //           newDiv.prepend(divHeader);
    //       }
    //     }
    //     else if ($("#education-check").is(":checked")) {
    //         // newSpan.addClass("badge-success");
    //         // newSpan.text("Education");
    //         // divHeader.prepend(newSpan);

    //         for (var i = 0; i < khanAcademyData.data.length; i++) {
    //             newSpan.addClass("badge-primary");
    //             newSpan.text("Job");
    //             divHeader.prepend(newSpan);

    //             // Try with and without the thumbnail data 
    //             newImage.attr("src", khanAcademyData.data[i].image_url + khanAcademyData.data[i].thumbnail_data.gcs_name)
    //             newImage.attr("alt", khanAcademyData.data[i].description)

    //             var newDiv = $("<div>").addClass("media-body");
    //             newDiv.text(khanAcademyData.data[i].description);
    //             var divHeader = $("<h5>").addClass("mt-0 mt-1");
    //             divHeader.text(khanAcademyData.data[i].title);
    //             newDiv.prepend(divHeader);
    //         }
    //     }
    //     else if ($("#event-check").is(":checked")) {
    //       // newSpan.addClass("badge-warning");
    //       // newSpan.text("Event");
    //       // divHeader.prepend(newSpan);

    //       // Need to edit eventbrite api data into loop
    //       for (var i = 0; i < eventData.data.length; i++) {
    //           newSpan.addClass("badge-warning");
    //           newSpan.text("Event");
    //           divHeader.prepend(newSpan);

    //           // Try with and without the thumbnail data 
    //           newImage.attr("src", eventData.data[i].logo.url)
    //           newImage.attr("alt", eventData.data[i].name.text)

    //           var newDiv = $("<div>").addClass("media-body");
    //           newDiv.text(eventData.data[i].description.text);
    //           var divHeader = $("<h5>").addClass("mt-0 mt-1");
    //           divHeader.text(eventData.data[i].name.text);
    //           newDiv.prepend(divHeader);
    //       }
    //     }
    //     newMediaObject.append(newImage, newDiv);
        
    //     $(".list-unstyled").append(newMediaObject)
    // });
});