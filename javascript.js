// setTimeout(()=> {
//     console.log("Hello, after 2sec");
// },
//     2*1000
// );


// const time = () => {
//     console.log("hello 2.5sec, not inline function");
// };

// setTimeout(time, 2.5*1000)



// const rocks = who =>{
//     console.log(who + " rocks");
// }

// setTimeout(rocks, 3*1000, "node.js")



// const chal = temp => {
//     console.log("Hello after "+ temp + "seconds");
    
// }

// setTimeout(chal, 4000, "4");
// setTimeout(chal, 8000, "8");


// setInterval(
//     () => console.log('Hello every 3 seconds'),
//     3000
//   );


//   const timerId = setTimeout(
//     () => console.log('You will not see this one!'),
//     1
//   );
//   clearTimeout(timerId);


//   setTimeout(
//     () => console.log('Hello after 0.5 seconds. MAYBE!'),
//     500,
//   );

//   var count = 0;
//   setInterval(
//     () => console.log('Hello every 3 seconds', count++),
//     3000
//   );

//     var loop = 0;
//     let result = 0;
//     for(i=0; i<10; i++){
//         result = loop + i;
//         console.log(result);
//     }
//   document.getElementById("main").innerHTML = "time: " + result;

//   function doThings() {
//     //the things i want to happen (or increment)
//  }
 
//  setTimeout(function() {
//      doThings();
//  }, 1000);


var myVar = setInterval(myTimer, 1000);

  function myTimer() {
      let d = new Date();
      var t = d.toLocaleTimeString('en-GB');
      document.getElementById("main").innerHTML = t;
    }

  function startTime(){
    let date1 = new Date().toLocaleTimeString('en-GB');
    document.getElementById("startingTimeOutput").innerHTML = date1;
    console.log(date1);
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
    console.log(seconds);
  }


firestore = firebase.firestore(); //ref to firestore

  //docuement reference
const docRef = firestore.collection("collection").doc("doc");
const output = document.querySelector("#fbOutput");
const input= document.querySelector("#fbinputText");
const button = document.querySelector("#fbButtonId");
const Lbutton = document.querySelector("#LfbButtonId");

button.addEventListener("click", function (){
  const textToSave = input.value;
  console.log("sss: " + textToSave);
  docRef.set({status: textToSave}).then(function() {
    console.log("status saved");
  });
});

Lbutton.addEventListener("click", function(){
  docRef.get().then(function (doc){
    if (doc && doc.exists){
      const myData = doc.data();
      output.innerHTML = "Something guys " + myData.status;
    }
  });
});




function fbButton(){
  // var firebaseRef = database().ref();
  // firebaseRef.child("Text").set("somevalue")

  var type = document.getElementById("fbinputText").value;
  var time = document.getElementById("startingTimeOutput").innerHTML;


  firestore.collection("Work").doc().set({
      Type: type,
      Time: time
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}
  

