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


/// WRITE DATA TO FIREBASE
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
const outputStats = document.querySelector("#sumStatsOutput");

db.collection("Work").where("TimeDiff", ">=", "1")
    .onSnapshot(function(querySnapshot) {
        var temp = [];
        querySnapshot.forEach(function(doc) {
            temp.push(doc.data().TimeDiff);
        });
        
        const SecondsArray = temp.map(Number);
        const result = SecondsArray.reduce((a, b) => a + b); 
        
        document.getElementById("sumStatsOutput").innerHTML = `Live result: ${formatTime(result)}`;
        document.getElementById("sumStatsOutput2").innerHTML = `Live result: ${formatTime(result)}`;
});



 /// TEST - DISPLAY DB DATA TO HTML
 let statsOutput = document.querySelector("#statsOutput");

 db.collection("Work")
 .orderBy("Fulldate", "desc")
 .onSnapshot(function(snapshot) {
  
     snapshot.docChanges().forEach(function(change) {
      
         if (change.type === "added") {
          
         

             
             let timedif = change.doc.data().TimeDiff;
             let type = change.doc.data().Type;
             let time = formatTime(timedif);
             let id = change.doc.id;
             document.getElementById("statsOutput").innerHTML += `<li data-id2='${id}'> <span> ${type} </span> / <span>${time}</span> <span class="delete-btn2"></span> </li> `;
            //  console.log("New doc added: ", change.doc.data());
         }
         if (change.type === "modified") {
             console.log("Modified city: ", change.doc.data());
         }
         if (change.type === "removed") {
             console.log("Removed city: ", change.doc.data());
             let statsOutput = statsOutput.querySelector('[data-id2=' + change.doc.id + ']'); // grap li tag with doc id where something is changed
             test.removeChild(li);

         }
     });
 });


/// TEST - Delete FROM DB
// const zzz = document.querySelector("#statsOutput");
// let getSome = document.getElementsByClassName("resultList");
// console.log(zzz);
// zzz.addEventListener('click', (e) =>{
//   e.stopPropagation();
//   let id = e.target.parentElement.getAttribute("resultList");
// })




/// FROM SECONDS BACK TO TIME FUNCTION
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


/// TEST - DISPLAY DATA FROM DB WITH DOM USING FUNCTION

const test = document.querySelector('#statsOutput2'); // # is for id

// create elemnts
function render(doc){
  let li = document.createElement('li');        // creating elements
  let typeR = document.createElement('span');
  let timeR = document.createElement('span');
  let cross = document.createElement('span');   

 
  li.setAttribute('data-id', doc.id);      // sets a ID from document to li
  cross.setAttribute('class', 'delete-btn');    
  typeR.textContent = doc.data().Type;          // adds type data from db to variable TypeR
  timeR.textContent = ' ' + formatTime(doc.data().TimeDiff);
  cross.textContent = '';

  li.appendChild(typeR);                        // append aka put spans and data to li
  li.appendChild(timeR);
  li.appendChild(cross);

  test.appendChild(li);                         // append li to the docuemnt
console.log("cross: " + cross);
// deleting data
cross.addEventListener('click', (e) =>{
  e.stopPropagation(); //stoping from buubling up
  let id = e.target.parentElement.getAttribute('data-id'); // geting event target which is the cross then get parent of cross which is li and then get attribute from it
  db.collection('Work').doc(id).delete();
})



}
// gets data
  // db.collection('Work')
  // .orderBy('Fulldate', 'desc')           // order by date descending
  // .get()                                 // gets the database
  // .then((snapshot) =>{                   // then gets a snapshot of the database
  //   snapshot.docs.forEach(doc => {       // eatch time around we get document 
  //     console.log(doc.id);               // method data() turns to applicable data
  //     render(doc);                       // for every individual document in db we launch function render()
  //   }) 
  // });

//real time listener
db.collection('Work')
.orderBy('Fulldate', 'desc')
.onSnapshot(snapshot => { // if something changes we want to callback to this onSnanpshot method. If something changes we receive a snapshot
    let changes = snapshot.docChanges();   //detect changes with a method docChanges
    changes.forEach(change => {   //
      
      if(change.type == 'added'){
        render(change.doc); 
      }
      else if(change.type == 'removed'){
        let li = test.querySelector('[data-id=' + change.doc.id + ']'); // grap li tag with doc id where something is changed
        test.removeChild(li);
      }
    })
}) 


  /// TEST - ADD DATA MANUAL FROM FORM

  const form = document.querySelector("#addForm");

form.addEventListener('submit', (e) => {
  e.preventDefault();                    // stop default action aka reloading page
  db.collection('Work').add({
      Type: form.type.value,
      TimeDiff: form.time.value
  });
  form.type.value = ''; // empty the form             
  form.time.value = ''; // empty the form             
})