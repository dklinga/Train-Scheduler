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
$("#add-train").on("click", function (event) {
  event.preventDefault();

  // Grabs conductor input
  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#train-destination").val().trim();
  var trainTime = moment($("#train-time").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#train-frequency").val().trim();

  // Creates local object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  // Uploads data to the database
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

//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {


  console.log(childSnapshot.val());


  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);


  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);


  var currentTime = moment();
  console.log("current time: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("difference: " + diffTime);

  // Time apart 
  var tRemainder = diffTime % trainFrequency;

  // Minute Until Train
  var tMinutesTillTrain = trainFrequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});