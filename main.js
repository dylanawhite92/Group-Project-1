// description = "put a language here"
const HEROKU_REDIRECT = "https://cors-anywhere.herokuapp.com/";
const GITHUB_JOB_URL = "https://jobs.github.com/positions.json?search=";
const KHAN_ACADEMY_URL = "https://www.khanacademy.org/api/v1/playlists/";
const KHAN_ACADEMY_URL2 = "/videos"
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
  function ajaxGetRequestKHAN(urlToCall, url_2nd_half, queryParameter){
    $.ajax({
      type: 'GET',
      url: (`${urlToCall}${queryParameter}${url_2nd_half}`),
    }).then(function(data) {
      console.log(data);
      return data;
    });
  }
  let githubJobData = ajaxGetRequest(GITHUB_JOB_URL, 'javascript');
  let khanAcademyData = ajaxGetRequestKHAN(KHAN_ACADEMY_URL, KHAN_ACADEMY_URL2, "pre-algebra-exponents");
  
});