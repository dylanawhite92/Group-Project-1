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

function writeJobData(id, firstName, lastName, email, jobTitle, jobDescription, keywordsArray) {
  firebase.database().ref('/jobs/' + id).set({
   'firstName': firstName,
    'lastName': lastName,
    'email': email,
    'jobTitle': jobTitle, 
    'jobDescription': jobDescription,
    'keywords': keywordsArray
  });
}

writeJobData(123, 'kaleb', 'test', 'test@SpeechGrammarList.com', 'software Engineer', 'have to like dogs');