



  

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjdDfHArhUXfVY8e6ls01pQsRLxvS11qA",
    authDomain: "trainscheduler-273a0.firebaseapp.com",
    databaseURL: "https://trainscheduler-273a0.firebaseio.com",
    projectId: "trainscheduler-273a0",
    storageBucket: "trainscheduler-273a0.appspot.com",
    messagingSenderId: "355823416633"
  };
  firebase.initializeApp(config);

var database = firebase.database();

 $("#add-employee-btn").on("click", function(event) {
   event.preventDefault();

   var empName = $("#employee-name-input").val().trim();
   var empRole = $("#role-input").val().trim();
   var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
   var empRate = $("#rate-input").val().trim();

    // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empName,
    role: empRole,
    start: empStart,
    rate: empRate
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  // Alert
  alert("Employee successfully added");

  // Clears all of the text-boxe
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");

 });
 // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
 
   console.log(childSnapshot.val());
 
   // Store everything into a variable.
   var empName = childSnapshot.val().name;
   var empRole = childSnapshot.val().role;
   var empStart = childSnapshot.val().start;
   var empRate = childSnapshot.val().rate;
 
   // Employee Info
   console.log(empName);
   console.log(empRole);
   console.log(empStart);
   console.log(empRate);
 
   // Prettify the employee start
   var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
 
   // Calculate the months worked using hardcore math
   // To calculate the months worked
   var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
   console.log(empMonths);
   // Calculate the total billed rate
   var empBilled = empMonths * empRate;
   console.log(empBilled);
 
   // Add each train's data into the table
   $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
   empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
 })