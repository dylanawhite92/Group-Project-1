// description = "put a language here"
const HEROKU_REDIRECT = "https://cors-anywhere.herokuapp.com/"
const GITHUB_JOB_URL = "https://jobs.github.com/positions.json?search="

$(document).ready(function() {

  function ajaxGetRequest(urlToCall, queryParameter){
    $.ajax({
      type: 'GET',
      url: (`${HEROKU_REDIRECT}${urlToCall}${queryParameter}`),
    }).then(function(data) {
      console.log(data);
      return data;
    });
  }
  let githubJobData = ajaxGetRequest(GITHUB_JOB_URL, 'javascript');
  
});