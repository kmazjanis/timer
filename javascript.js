  /// ADD CLOCK
var myVar = setInterval(myTimer, 1000);
  function myTimer() {
      let d = new Date();
      var t = d.toLocaleTimeString('en-GB');
      document.getElementById("main").innerHTML = t;
    }

  /// DISPLAY START TIME IN HTML & SAVE IN LOCAL STORAGE
  function startTime(){
    let time = new Date().toLocaleTimeString('en-GB'); //get only time from date
    document.getElementById("startingTimeOutput").innerHTML = time;
    window.localStorage.setItem("date", time); //Saving start time in localstorage for later use.
  }

  /// DISPLAY LAST SAVED STARTING TIME IN HTML
  window.onload = function (){
    let fromlocal = window.localStorage.getItem('date');
    document.getElementById("startingTimeOutput").innerHTML = fromlocal;
  }

  /// DISPLAY STOP TIME IN HTML
  function stopTime(){
    let date2 = new Date().toLocaleTimeString('en-GB');
    document.getElementById("stopingTimeOutput").innerHTML = date2;
    console.log(date2);
  }

  /// TURN REGULAR TIME IN SECONDS
  function parseTime(s) {
    var c = s.split(':');
    return parseInt(c[0]) * 3600 + parseInt(c[1]) * 60 + parseInt(c[2]);
 }

  /// GET START AND STOP TIME FROM HTML AND CALCULATE DIFFERENCE
  function difInTime(){
    var date1 =  document.getElementById("startingTimeOutput").innerHTML
    var date2 =  document.getElementById("stopingTimeOutput").innerHTML
    var seconds = parseTime(date2) - parseTime(date1);
    document.getElementById("TimeDiff").innerHTML = seconds;
  }


///WRITE DATA TO FIREBASE
function fbButton(){

  var type = document.getElementById("fbinputText").value;
  var starttime = document.getElementById("startingTimeOutput").innerHTML;
  var endtime = document.getElementById("stopingTimeOutput").innerHTML;
  var timedif = document.getElementById("TimeDiff").innerHTML;
  let Fulldate = new Date();

  db.collection("Work").doc().set({
      Type: type,
      StartTime: starttime,
      EndTime: endtime,
      TimeDiff: timedif,
      Fulldate: Fulldate
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}
  

 /// LOGIN IN

auth.onAuthStateChanged(user => {
   
  if (user){
      document.getElementById("loginDiv").style.display = "none";
      document.getElementById("signupDiv").style.display = "none";
      document.getElementById("logoutDiv").style.display = "block";
      
  }
  else{
      document.getElementById("loginDiv").style.display = "block";
      document.getElementById("signupDiv").style.display = "block";
      document.getElementById("logoutDiv").style.display = "none";
  
  }
});


 /// SIGNUP
const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

  /// get user info
    const email = signupForm['signup-email'].value;
    const pass = signupForm['signup-password'].value;

  /// sign up the user
    auth.createUserWithEmailAndPassword(email, pass).then(cred =>{ //takes time to complete so we need to wait
        console.log(cred.user);
  }); 
});

 /// LOGOUT
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) =>{
  e.preventDefault();
  auth.signOut();
});

 /// LOGIN
const login = document.querySelector('#loginForm');
login.addEventListener('submit', (e) =>{
  e.preventDefault();

  const email = login['login-email'].value;
  const pass = login['login-password'].value;

  auth.signInWithEmailAndPassword(email, pass).then(cred =>{
      console.log(cred.user);
  });
});



/// GET REAL TIME DATA FROM DB

const outputStats = document.querySelector("#statsOutput");

db.collection("Work").where("TimeDiff", ">=", "1")
    .onSnapshot(function(querySnapshot) {
        var cities = [];
        querySnapshot.forEach(function(doc) {
            cities.push(doc.data().TimeDiff);
        });
        
        const citiNumber = cities.map(Number);
        const result = citiNumber.reduce((a, b) => a + b); 
        
        document.getElementById("statsOutput").innerHTML = `Live result: ${formatTime(result)}`;
});




//FROM SECONDS BACK TO TIME
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [
    h,
    m > 9 ? m : (h ? '0' + m : m || '0'),
    s > 9 ? s : '0' + s,
  ].filter(a => a).join(':');
};




