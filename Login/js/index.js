//listen for auth status changes
auth.onAuthStateChanged(user => {
   
    if (user){
        console.log('this user just logged in', user);
        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("signupDiv").style.display = "none";
        document.getElementById("logoutDiv").style.display = "block";
        
    }
    else{
        document.getElementById("loginDiv").style.display = "block";
        document.getElementById("signupDiv").style.display = "block";
        document.getElementById("logoutDiv").style.display = "none";
        console.log('user logged out');
    }
});


//signup
const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  //get user info
  const email = signupForm['signup-email'].value;
  const pass = signupForm['signup-password'].value;

  console.log(email, pass);


  //sign up th user
  auth.createUserWithEmailAndPassword(email, pass).then(cred =>{ //takes time to complete so we need to wait
      console.log(cred.user);
      
  }); 
});

//logout
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

//login
const login = document.querySelector('#loginForm');
login.addEventListener('submit', (e) =>{
    e.preventDefault();

    const email = login['login-email'].value;
    const pass = login['login-password'].value;


    auth.signInWithEmailAndPassword(email, pass).then(cred =>{
        console.log(cred.user);
    
    });
});


// const eField = document.getElementById("eField");
// const pField = document.getElementById("pField");
// const login = document.getElementById("login");
// const signup = document.getElementById("signup");
// const logout = document.getElementById("logout");

// console.log(document.getElementById("eField"));

// login.addEventListener('click', e =>{
//   const email = efield.value;
  
//   const pass = pfield.value;
//   const auth = firebase.auth();
//   const promise = auth.signInWIthEmailAndPassword(email, pass);
//   promise.catch(e => console.log(e.message));
// });

// firebase.auth().signInWithEmailAndPassword(email, password)
//     .catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   if (errorCode === 'auth/wrong-password') {
//     alert('Wrong password.');
//   } else {
//     alert(errorMessage);
//   }
//   console.log(error);
// });


//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       document.getElementById("logoutDiv").style.display("block");
//       document.getElementById("loginDiv").style.display("none");
//     } else {
//       document.getElementById("logoutDiv").style.display("none");
//       document.getElementById("loginDiv").style.display("block");
//     }
//   });


// function login(){
  
//   var eField = document.getElementById("eField").value;
//   var pField = document.getElementById("pField").value;

//   console.log(eField, pField);
// }

