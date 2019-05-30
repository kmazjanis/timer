
var myVar = setInterval(myTimer, 1000);

  function myTimer() {
      let d = new Date();
      var t = d.toLocaleTimeString('en-GB');
      document.getElementById("main").innerHTML = t;
    }

  function startTime(){
    
    let time = new Date().toLocaleTimeString('en-GB'); //get only time from date
    
    
    document.getElementById("startingTimeOutput").innerHTML = time;
    window.localStorage.setItem("time", time); //Saving start time in localstorage for later use.
  }

  ///SAVING DATA IN LOCAL STORAGE FROM LAST FIRST SAVED TIME
  window.onload = function (){
    let fromlocal = window.localStorage.getItem('date');
    document.getElementById("startingTimeOutput").innerHTML = fromlocal;
  }



  function stopTime(){
    let date2 = new Date().toLocaleTimeString('en-GB');
    document.getElementById("stopingTimeOutput").innerHTML = date2;
    console.log(date2);
  }

  function parseTime(s) {
    var c = s.split(':');
    return parseInt(c[0]) * 3600 + parseInt(c[1]) * 60 + parseInt(c[2]);
 }

  function difInTime(){
    var date1 =  document.getElementById("startingTimeOutput").innerHTML
    var date2 =  document.getElementById("stopingTimeOutput").innerHTML
    var seconds = parseTime(date2) - parseTime(date1);
    document.getElementById("TimeDiff").innerHTML = seconds;
  }


firestore = firebase.firestore(); //ref to firestore


  //docuement reference

const output = document.querySelector("#fbOutput");
const input= document.querySelector("#fbinputText");
const button = document.querySelector("#fbButtonId");
const Lbutton = document.querySelector("#LfbButtonId");

//CHANGE STATUS IN DB AND LOAD THIS STATUS FROM FIREBASE TO DOM

// button.addEventListener("click", function (){
//   const textToSave = input.value;
//   console.log("sss: " + textToSave);
//   docRef.set({status: textToSave}).then(function() {
//     console.log("status saved");
//   });
// });

// Lbutton.addEventListener("click", function(){
//   docRef.get().then(function (doc){
//     if (doc && doc.exists){
//       const myData = doc.data();
//       output.innerHTML = "Something guys " + myData.status;
//     }
//   });
// });


///WRITE DATA TO FIREBASE

function fbButton(){
  // var firebaseRef = database().ref();
  // firebaseRef.child("Text").set("somevalue")

  var type = document.getElementById("fbinputText").value;
  var starttime = document.getElementById("startingTimeOutput").innerHTML;
  var endtime = document.getElementById("stopingTimeOutput").innerHTML;
  var timedif = document.getElementById("TimeDiff").innerHTML;
  let Fulldate = new Date();

  firestore.collection("Work").doc().set({
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
  

///LOGIN IN

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


//SIGNUP
const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  //get user info
  const email = signupForm['signup-email'].value;
  const pass = signupForm['signup-password'].value;



  //sign up the user
  auth.createUserWithEmailAndPassword(email, pass).then(cred =>{ //takes time to complete so we need to wait
      console.log(cred.user);
      
  }); 
});

//LOGOUT
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) =>{
  e.preventDefault();
  auth.signOut();
  // .then(() =>{
  //     console.log("user signed out");
  //     document.getElementById("signupDiv").style.display = "visible";
  //     document.getElementById("logoutDiv").style.display = "none";
  //     document.getElementById("loginDiv").style.display = "visible";
      
  // });
});

//LOGIN
const login = document.querySelector('#loginForm');
login.addEventListener('submit', (e) =>{
  e.preventDefault();

  const email = login['login-email'].value;
  const pass = login['login-password'].value;


  auth.signInWithEmailAndPassword(email, pass).then(cred =>{
      console.log(cred.user);
  
  });
});

///CREATE A COOKIE FOR STORING START TIME

// function createCookie(key) {
//   var cookie = key;  //escape removes all spaces, semicolas, commas becosuse strings cant caontain them.
//   document.cookie = cookie;
//   console.log(cookie);
//   console.log("Creating new cookie with key: " + key);
// }




//create element and render to dom ?

// function render(){
//   let li = document.createElement('div');   //for each document we create a div tag
//   let name = document.createElement('span');

//   li.setAttribute('data-id', doc.id); //we set attribute for each id
  
//   name.textContent = doc.data().name;  

//   li.appendChild(name);

//   statsOut.appendChild(li);
  
// }


///GET DATA FROM DB
// function getStats(){

  
//   firestore.collection("Work").get().then((snapshot) => {  //snapshot of work collection
//     snapshot.docs.forEach(doc =>{ //get all the doc from that collection then cycle through them with forEach
//       // render(doc);  //for each document we call function "render" and passsing in doc as parameter
//       console.log(doc.data().Type);
//       console.log(doc.data().TimeDiff);
  
//       var test = doc.data().Type;
      // var plainSeconds = doc.data().TimeDiff;
      // var time = formatTime(plainSeconds);
//       document.getElementById("statsOutput").style.display = "none";
//       document.getElementById("statsOutput").innerHTML += "</br>" + test + " " + time;
  
//     });
//   });
// };
const outputStats = document.querySelector("#statsOutput");

db.collection("Work").onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
            if(change.type === "added"){
              console.log(change.doc.data().Type);
              var plainSeconds = change.doc.data().TimeDiff;
              var time = formatTime(plainSeconds);
              outputStats.innerHTML +=  "Type: " + change.doc.data().Type + " - " + time + "<br>";

            }
            
        });
        
  });




//FROM SECONDS BACK TO TIME FUNCTION
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




// firestore.collection("Work").get().then(function(querySnapshot) {
//   querySnapshot.forEach(function(doc) {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.data());
      
//   });
// });

