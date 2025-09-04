import { auth, createUserWithEmailAndPassword, db, doc, onAuthStateChanged, setDoc, signInWithEmailAndPassword, signOut } from "./config.js";

function registerForm(event) {

  let email = document.getElementById("register-email")
  let userName = document.getElementById("fullName")
  let password = document.getElementById("register-password")
  createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          addUserToDb(email.value, userName.value, user.uid)
          alert("SignUp Successfully <3")
          getCurrentUser() //ye function add kr raha to db nhi chal raha but iska bina db chal raha or register ka baad redirect users pr nhi horaha
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
      });
}

async function addUserToDb(email, userName, userId) {
  await setDoc(doc(db, "users", userId), {
      email,
      userName,
      userId,
      image: 'https://wallpapers.com/images/hd/meme-laptop-4ibeouacwvi03rsx.jpg'
  });

}

document.getElementById("signUpBtn")?.addEventListener("click", registerForm)

function loginUser() {
  let email = document.getElementById("login-email")
  let password = document.getElementById("login-password")
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user, "User login huwa")
          alert('User Login Successfully <3')
          getCurrentUser()
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
      });
}


async function getCurrentUser() {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          const uid = user.uid;
          if (uid) {
              window.location.replace('./users.html')
          }
          console.log(uid)
      } else{
        console.log('User Logout Done ');
      }
  });
}


function logUserOut() {
  signOut(auth).then(() => {
      // Sign-out successful.
      alert("User Logout Successfully <3")
      window.location.replace('./index.html')
  }).catch((error) => {
      // An error happened.
      console.log("log out nh hua ")
  });
}
document.getElementById('logoutUser')?.addEventListener('click', logUserOut)

document.getElementById("loginBtn")?.addEventListener("click", loginUser)
