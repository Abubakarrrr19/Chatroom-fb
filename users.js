import { auth, collection, db, getDocs, onAuthStateChanged, where, query, addDoc } from "./config.js";
let userId = null
let userContainer = document.getElementById('userCont');
async function getCurrentUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      userId = uid;
      getAllTheUsers()
    } else {
      console.log('User Logout Done ');
    }
  });
}

async function getAllTheUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  console.log("login person id =>", userId)
  querySnapshot.forEach((doc) => {
    let { userName, email } = doc.data()
    if (userContainer) {
      if (userId === doc.id) {
        return
      }
      userContainer.innerHTML += ` <div class="user-item" >
            <div class="user-details">
              <span class="user-name">${userName}</span>
              <span class="user-email">${email}</span>
            </div>
            <button class="chat-btn" onclick="checkRoom(event)" id="roomButton" data-id=${doc.id}>💬 Chat</button>
          </div>`
    }
  })
}

getCurrentUser()

window.checkRoom = async (event) => {
  let friendId = event.target.dataset.id
  console.log('This is my friend id', friendId);
  let bothUsers = { [userId]: true, [friendId]: true }

  const q = query(collection(db, 'Chatroom'), where(`bothUsers.${userId}`, "==", true), where(`bothUsers.${friendId}`, "==", true))
  let roomId = "";
  const rooms = await getDocs(q)
  // console.log(rooms);
  rooms.forEach((room) => {
    roomId = room.id
    // console.log(roomId);
  })
  if (!roomId) {
    const docRef = await addDoc(collection(db, "Chatroom"), { bothUsers, createdAt: new Date().toISOString(), createdBy: userId });
    roomId = docRef.id
  }
  if (roomId) {
    window.location.href = `./chatroom.html?roomId=${roomId}`
  }
}