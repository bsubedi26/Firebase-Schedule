$(document).ready(function() {
  //Firebase variable that links to the database url
   var firebase = new Firebase("https://vivid-fire-7207.firebaseio.com/");
   //Submit button
   $("#submit-button").on("click", function(e) {
      e.preventDefault();   
     var name = $('#name-input').val().trim();
     var destination = $('#role-input').val().trim();
     var arrival = $('#date-input').val().trim();
     var rate = $('#rate-input').val().trim();

//Intial Time
  var firstTimeConverted = moment(arrival ,"hh:mm").subtract(1, "years");
  //Current time
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  //Time Apart (remainder)
  var tRemainder = diffTime % rate; 
  //Minutes till Train
  var tMinutesTillTrain = rate - tRemainder;
  //nextTrain
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextArrival = moment(nextTrain).format("hh:mm");

  //Push results to firebase
  firebase.push({
    name: name,
    destination: destination,
    arrival: arrival,
    rate: rate,
    minutesAway: tMinutesTillTrain,
  });

//Reset input fields
  $('#name-input').val('')
  $('#role-input').val('')
  $('#date-input').val('')
  $('#rate-input').val('')

  })     

firebase.on('child_added', function (childSnapshot){
  //console log the values received from firebase
  console.log(childSnapshot.val().name)
  console.log(childSnapshot.val().destination)
  console.log(childSnapshot.val().arrival)
  console.log(childSnapshot.val().rate)
  console.log(childSnapshot.val().minutesAway)

  //append values to the table
  $('.table > tbody').append('<tr><td>' + childSnapshot.val().name + '</td><td>' + childSnapshot.val().destination + '</td><td>' + childSnapshot.val().rate + '</td><td>' + childSnapshot.val().arrival + '</td><td>' + childSnapshot.val().minutesAway + '</td></tr>');
});

// for (var i =0; i < data.length; i++) {
//    //Display data to the page 
// $("#name").append(data[i].name+"<br>");
// $("#role").append(data[i].destination+"<br>");
// $("#rate").append(data[i].rate+"<br>");
// $("#date").append(data[i].time+"<br>");
// }

//document ready function closer
});