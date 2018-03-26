  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD3rx5fZaEVihir-NDv9Nhr7bXJJ64uOBU",
    authDomain: "class-activity-b0d0c.firebaseapp.com",
    databaseURL: "https://class-activity-b0d0c.firebaseio.com",
    projectId: "class-activity-b0d0c",
    storageBucket: "class-activity-b0d0c.appspot.com",
    messagingSenderId: "36997654344"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Button for adding Train
$("#add-train").on("click", function(event) {
    event.preventDefault();

// Grabs conductor input
var trainName = $("#train-name").val().trim();
var trainDestination = $("#train-destination").val().trim();
var trainTime = moment($("#train-time").val().trim(), "HH:mm").format("X");
var trainFrequency = $("#train-frequency").val().trim();

// Creates local "temporary" object for holding train data
var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

    // Logs everything to console
    console.log(trainName.name);
    console.log(trainDestination.destination);
    console.log(trainTime.time);
    console.log(trainFrequency.frequency);


     // Alert
  alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");
  });