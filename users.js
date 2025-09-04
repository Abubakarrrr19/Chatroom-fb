import { auth, onAuthStateChanged } from "./config.js";

let userId = null

async function getCurrentUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            userId = uid;
            getAllTheUsers()
            console.log(uid)
        } else{
          console.log('User Logout Done ');
        }
    });
  }

 async function getAllTheUsers(){
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log("userId ====>", userId)
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        let { userName, email } = doc.data();
        if (usersElement) {
            if (userId === doc.id) {
                return
            }
            usersElement.innerHTML += `
        <div class="user-card">
        <h2>${userName}</h2>
        <div >${email}</div>
        <button onclick="checkRoom(event)" id="roomButton" data-id=${doc.id}> chat </button> 
    </div>
        `
        }

    });
 } 