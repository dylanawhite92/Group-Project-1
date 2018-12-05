const HEROKU_REDIRECT = "https://cors-anywhere.herokuapp.com/";
const GITHUB_JOB_URL = "https://jobs.github.com/positions.json?search=";
const KHAN_ACADEMY_URL = "http://www.khanacademy.org/api/v1/topic/";
const KHAN_ACADEMY_URL2 = "/videos";
const EVENT_BRIGHT_URL = "https://www.eventbriteapi.com/v3/events/search/?token=JCADVWXDZ2YXAS473ULD&q=";
const EVENT_BRIGHT_URL2 = "&location.within=30mi&location.latitude=41.8781&location.longitude=-87.6298";
const DATABASE_URL = "https://group-project-1-cfef2.firebaseio.com";

// function displayWheel() {
//   var loader = $("<div>").addClass("loader");
//   $(loader).addClass("show");

//   $("#query-feed").prepend(loader);
// };

// function hideWheel() {
//   $(".loader").remove();
// };

// This function determines which data set is on-screen
function renderScreen(data, type) {
  console.log(data);

  $("#query-feed").css("display", "none");
  $("#loader-container").fadeIn().delay(800).fadeOut("fast");

  let listToChange;

  if (type === 'job') {
    listToChange = "#job-list";
  } 
  else if (type === 'event') {
    listToChange = '#event-list';
  } 
  else {
    listToChange = '#education-list';
  }

  $(".list-unstyled").empty();

  // displayWheel();

  // $(".loader").css("display", "block");


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
    } 
    else if (type === 'education') {
      newSpan.addClass("badge-success");
      newSpan.text("Education");
      divHeader.prepend(newSpan);
      textDisplay = `<a href="${data[i].url}">${data[i].url}</a>`
      header = data[i].description;
    } 
    else {
      console.log(data[i]);
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

  $("#query-feed").delay(1400).fadeIn();
};

$(document).ready(function () {

  let jobData = [];
  let eventData = [];
  let educationData = [];

  // function loaderWheel() {
  //   var loader = $("<div>").addClass("loader");
  //   $(loader).addClass("show");
  
  //   $("#query-feed").prepend(loader);
  // }

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

    // $(".loader").remove();
  });

  $(document).on('click', '.badge', function(event){
    createSessionStorageData('id', $(this).data('id'),);
  });

  $(document).on('click', '#search-submit-button', function(event) {
    event.preventDefault();
    let queryParameter = $('#search-text').val().trim();
    if (queryParameter !== '') {
      let dataPromise = loadData(queryParameter);
      dataPromise.then(function(value) {
        eventData = [...value[4]];
        jobData = [...value[0], ...value[3]];
        educationData = [...value[1], ...value[2]];
      });
    }
  });

  let dataPromise = loadData('tech');
  dataPromise.then(function(value) {
    console.log(value);
    eventData = [...value[4]];
    jobData = [...value[0], ...value[3]];
    educationData = [...value[1], ...value[2]];
  })
});

// Returns a single promise containing all data from promises
async function loadData(query){
  let promise_firebase_jobs = firebaseGetRequest('jobs');
  let promise_firebase_education = firebaseGetRequest('education');
  let promise_education = httpGetRequest(KHAN_ACADEMY_URL, query, true, KHAN_ACADEMY_URL2);
  let promise_jobs = httpGetRequest(GITHUB_JOB_URL, query, true);
  let promise_events = httpGetRequest(EVENT_BRIGHT_URL, query, false, EVENT_BRIGHT_URL2);
  
  return (Promise.all([
    // turns object into array
    promise_firebase_jobs.then(function(value){
      let newArray = [];
      for (var key in value) {
        value[key].id = key;
        if (value.hasOwnProperty(key)) {
            newArray.push(value[key]);
        }
      }
      console.log(newArray);
      return newArray;
    }), 
    // Turns object into array
    promise_firebase_education.then(function(value){
      let newArray = [];
      for (var key in value) {
        value[key].id = key;
        if (value.hasOwnProperty(key)) {
            newArray.push(value[key]);
        }
      }
      console.log(newArray);
      return newArray;
    }), 
    promise_education.catch(e => ([])), 
    promise_jobs, 
    promise_events.then(p => p.events)
  ])
    .then(results => {
      console.log(results)
      return results
    }))
}

// returns a promise
function httpGetRequest(urlToCall, queryParameter, requiresRedirect, secondPartOfUrl="") {
  let url = ''; 
  if (requiresRedirect === true) {
    url += HEROKU_REDIRECT;
  }
  url += urlToCall + queryParameter + secondPartOfUrl;
  console.log(url);
  return $.ajax({
    'type': 'GET',
    'url': url,
  });
}

function firebaseGetRequest(dataToSee, secondPartOfUrl=".json") {
  let url = 'https://group-project-1-cfef2.firebaseio.com/'; 
  url += dataToSee + secondPartOfUrl;

  return $.ajax({
    'type': 'GET',
    'url': url,
  });
}

function createSessionStorageData(key, value) {
  sessionStorage.setItem(key, value);
  window.location.replace('messageSubmit.html');
}