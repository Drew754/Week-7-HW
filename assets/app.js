var config = {
    apiKey: "AIzaSyDsDvy3J0kwWjwCq3RY5uXVzb7X2_BsovQ",
    authDomain: "train-time-90b30.firebaseapp.com",
    databaseURL: "https://train-time-90b30.firebaseio.com",
    projectId: "train-time-90b30",
    storageBucket: "train-time-90b30.appspot.com",
    messagingSenderId: "792894158882"
  };

firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency= "";
var currentTime = moment();
var dateTime = null;
date = null;

var update = function () {
    date = moment(new Date())
    dateTime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

// Capture Button Click
$(document).on("click", "#add-train", function () {
    event.preventDefault();
    

    trainName = $("#trainName-term").val().trim();
    console.log(trainName);
    destination = $("#destination-term").val().trim();
    console.log(destination);
    var convert = $("#frequencyInput").val().trim();
    var frequency = parseInt(convert);
    console.log(frequency);
    firstTrainTime = $("#firstTrainTime").val().trim();
    console.log(firstTrainTime);

    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(firstTimeConverted);
    var tremainder = diffTime % frequency;
    console.log(tremainder);
    var minutesAway = frequency - tremainder;
    console.log(minutesAway);
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log(nextTrain);

    var nextArrival = moment(nextTrain).format("hh:mm a");
    console.log(nextArrival);
     var nextArrival = function( {
        date = moment(new.Date()),
         dateTime.html(date.format("hh:mm a"));
     });

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime,
        minutesAway: minutesAway,
        nextArrival: nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().monthly);

    newtr = $("<tr>");
    trainNametd = $("<td>").text(childSnapshot.val().trainName);
    destinationtd = $("<td>").text(childSnapshot.val().destination);
    datetd = $("<td>").text(moment(childSnapshot.val().date).format("MMM Do YYYY"));
    workedtd = $("<td>").text(moment(childSnapshot.val().date).diff(moment(), "months") * -1);
    frequencytd = $("<td>").text(childSnapshot.val().frequency);

    newtr.append(trainNametd);
    newtr.append(destinationtd);
    newtr.append(frequencytd);
    newtr.append(workedtd);
    newtr.append(datetd);

    $(".card-body").append(newtr);
    $("#trainName").append("<tr><td><span> " + childSnapshot.val().trainName) + "</td>" + "</tr>";
    $("#destination").append("<tr><td><span> " + childSnapshot.val().destination) + "</td>" + "</tr>";
    $("#nextArrival").append("<tr><td><span> " + childSnapshot.val().nextArrival)+ "</td>" + "</tr>";
    $("#frequency").append("<tr><td><span> " + childSnapshot.val().frequency) + "</td>" + "</tr>";
    $("#minutesAway").append("<tr><td><span> " + childSnapshot.val().minutesAway)+ "</td>" + "</tr>";


}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
 database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
     $("#trainName").text(snapshot.val().trainNametd);
     $("#destination").text(snapshot.val().destinationtd);
     $("#frequency").text(snapshot.val().frequencytd);
     $("#nextArrival").text(snapshot.val().comment);
   });
© 2018 GitHub, Inc.