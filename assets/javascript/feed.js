const HEROKU_REDIRECT = "https://cors-anywhere.herokuapp.com/";
const GITHUB_JOB_URL = "https://jobs.github.com/positions.json?search=";
const KHAN_ACADEMY_URL = "https://www.khanacademy.org/api/v1/playlists/";
const KHAN_ACADEMY_URL2 = "/videos";
const EVENT_BRIGHT_URL = "https://www.eventbriteapi.com/v3/events/search/?token=JCADVWXDZ2YXAS473ULD&q=";
const DATABASE_URL = "https://group-project-1-cfef2.firebaseio.com";

function renderScreen(data) {
  console.log(data);
  if (data.events != null) {
    data = data.events;
  }

  // $(".list-unstyled").append(newMediaObject)
  for (let i = 0; i < data.length; i++) {
    var newMediaObject = $("<li>").addClass("media my-2")
    var newSpan = $("<span>").addClass("badge badge-pill");
    var newImage = $("<img>").addClass("mr-3");
    var newDiv = $("<div>").addClass("media-body");
    var divHeader = $("<h5>").addClass("mt-0 mt-1");
    let textDisplay;
    let header;
  
    newMediaObject.append(newSpan, newImage, newDiv, divHeader);

    if ($("#job-check").is(":checked")) {
      newSpan.addClass("badge-primary");
      newSpan.text("Job");
      divHeader.prepend(newSpan);
      textDisplay = data[i].description;
      header = data[i].title;
    } else if ($("#education-check").is(":checked")) {
      newSpan.addClass("badge-success");
      newSpan.text("Education");
      divHeader.prepend(newSpan);
      textDisplay = `<a href="${data[i].url}">${data[i].url}</a>`
      header = data[i].description;
    } else if ($("#event-check").is(":checked")) {
      newSpan.addClass("badge-warning");
      newSpan.text("Event");
      divHeader.prepend(newSpan);
      textDisplay = data[i].description.html;
      header = data[i].name.text;
    }

    newDiv.html(textDisplay);
      var divHeader = $("<h5>").addClass("mt-0 mt-1");
      divHeader.text(header);
      newDiv.prepend(divHeader);

    newMediaObject.append(newImage, newDiv);
    $(".list-unstyled").append(newMediaObject)
  }
};

$(document).ready(function () {

  function ajaxGetRequest(urlToCall, queryParameter, dataObject){
    $.ajax({
      type: 'GET',
      url: (`${HEROKU_REDIRECT}${urlToCall}${queryParameter}`),
    }).then(function(data) {
      // console.log(data);
      // return data;
      console.log(dataObject);
      let newArray = [...data];
      // prevents from grabbing properties from prototype
      for (var key in dataObject) {
        console.log(key);
        if (dataObject.hasOwnProperty(key)) {
            newArray.push(dataObject[key]);
        }
    }
      renderScreen(newArray);
    });
  }
  function ajaxGetRequestKHAN(urlToCall, url_2nd_half, queryParameter){
    $.ajax({
      type: 'GET',
      url: (`${urlToCall}${queryParameter}${url_2nd_half}`),
    }).then(function(data) {
      renderScreen(data);
    });
  }

  $("#submit-btn").on("click", function() {
    console.log("click");
    if ($("#job-check").is(":checked")) {
      $.ajax({
        url: 'https://group-project-1-cfef2.firebaseio.com/jobs.json',
        type: "GET",
      }).then(function(data) {
        console.log(data);
        ajaxGetRequest(GITHUB_JOB_URL, "javascript", data);
      });
    }
    else if ($("#education-check").is(":checked")) {
      $.ajax({
        url: 'https://group-project-1-cfef2.firebaseio.com/education.json',
        type: "GET",
      }).then(function(data) {
        console.log(data);
        ajaxGetRequest(KHAN_ACADEMY_URL, KHAN_ACADEMY_URL2, "pre-algebra-exponents");
      });
      ajaxGetRequestKHAN(KHAN_ACADEMY_URL, KHAN_ACADEMY_URL2, "pre-algebra-exponents");
    }
    else if ($("#event-check").is(":checked")) {
      ajaxGetRequest(EVENT_BRIGHT_URL, "tech");
    }
  });
});