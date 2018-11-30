const HEROKU_REDIRECT = "https://cors-anywhere.herokuapp.com/";
const GITHUB_JOB_URL = "https://jobs.github.com/positions.json?search=";
const KHAN_ACADEMY_URL = "https://www.khanacademy.org/api/v1/playlists/";
const KHAN_ACADEMY_URL2 = "/videos";
const EVENT_BRIGHT_URL = "https://www.eventbriteapi.com/v3/events/search/?token=JCADVWXDZ2YXAS473ULD&q=";
const DATABASE_URL = "https://group-project-1-cfef2.firebaseio.com";

function renderScreen(data, type) {
  console.log(data);
  if (data.events != null) {
    data = data.events;
  }

  let listToChange;
  if (type === 'job') {
    listToChange = "#job-list";
  } else if (type === 'event') {
    listToChange = '#event-list';
  } else {
    listToChange = '#education-list';
  }

  $(".list-unstyled").empty();
  for (let i = 0; i < data.length; i++) {
    var newMediaObject = $("<li>").addClass("media my-2")
    var newSpan = $("<span>").addClass("badge badge-pill");
    var newImage = $("<img>").addClass("mr-3");
    var newDiv = $("<div>").addClass("media-body");
    var divHeader = $("<h5>").addClass("mt-0 mt-1");
    let textDisplay;
    let header;
  
    newMediaObject.append(newSpan, newImage, newDiv, divHeader);

    if (type === 'job') {
      newSpan.attr('data-id', data[i].id);
      newSpan.addClass("badge-primary");
      newSpan.text("Job");
      divHeader.prepend(newSpan);
      textDisplay = data[i].description;
      header = data[i].title;
    } else if (type === 'education') {
      newSpan.addClass("badge-success");
      newSpan.text("Education");
      divHeader.prepend(newSpan);
      textDisplay = `<a href="${data[i].url}">${data[i].url}</a>`
      console.log(data[i].url);
      header = data[i].description;
    } else {
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
    $(listToChange).append(newMediaObject)
  }
};

$(document).ready(function () {

  let jobData;
  let eventData;
  let educationData;
  function ajaxGetRequest(urlToCall, queryParameter, dataObject){
    $.ajax({
      type: 'GET',
      url: (`${HEROKU_REDIRECT}${urlToCall}${queryParameter}`),
    }).then(function(data) {
      let newArray = [...data];
      // prevents from grabbing properties from prototype
      for (var key in dataObject) {
        // gives each datapoint in firebase an id
        dataObject[key].id = key;
        if (dataObject.hasOwnProperty(key)) {
            newArray.push(dataObject[key]);
        }
    }
      jobData = newArray;
      console.log(jobData);
    });
  };

  function ajaxGetRequestNoRedirect(urlToCall, queryParameter, dataObject){
    $.ajax({
      type: 'GET',
      url: (`${urlToCall}${queryParameter}`),
    }).then(function(data) {
      // return data;
      let newArray = [...data.events];
      // prevents from grabbing properties from prototype
      for (var key in dataObject) {
        // gives each datapoint in firebase an id
        dataObject[key].id = key;
        if (dataObject.hasOwnProperty(key)) {
            newArray.push(dataObject[key]);
        }
    }
      eventData = newArray;
      console.log(eventData);
    });
  }

  function ajaxGetRequestKHAN(urlToCall, url_2nd_half, queryParameter, dataObject){
    $.ajax({
      type: 'GET',
      url: (`${urlToCall}${queryParameter}${url_2nd_half}`),
    }).then(function(data) {
      let newArray = [...data];
      // prevents from grabbing properties from prototype
      for (var key in dataObject) {
        if (dataObject.hasOwnProperty(key)) {
          newArray.push(dataObject[key]);
        }
      }
      educationData = newArray;
      console.log(educationData);
    });
  }

  $(".category").on("click", function(event) {
      if ($(this).attr('data-id') === "job") {
        renderScreen(jobData, 'job');
      }
      else if ($(this).attr('data-id') === "education") {
        renderScreen(educationData, 'education');
      }
      else if ($(this).attr('data-id') === "event") {
         renderScreen(eventData, 'event');
      }
  });

  $(document).on('click', '.badge', function(event){
    createSessionStorageData('id', $(this).data('id'),);
  });

  $.ajax({
    url: 'https://group-project-1-cfef2.firebaseio.com/jobs.json',
    type: "GET",
  }).then(function(data) {
    // request github data
    ajaxGetRequest(GITHUB_JOB_URL, "javascript", data);
  });

  $.ajax({
    url: 'https://group-project-1-cfef2.firebaseio.com/education.json',
    type: "GET",
  }).then(function(data) {
    // request khan academy data
    ajaxGetRequestKHAN(KHAN_ACADEMY_URL, KHAN_ACADEMY_URL2, "pre-algebra-exponents", data);
  });

  ajaxGetRequestNoRedirect(EVENT_BRIGHT_URL, "tech");
});

function createSessionStorageData(key, value) {
  sessionStorage.setItem(key, value);
  window.location.replace('messageSubmit.html');
}