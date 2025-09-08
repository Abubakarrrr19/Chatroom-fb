import { auth, collection, db, doc, onAuthStateChanged, onSnapshot, query, setDoc } from "./config.js";

const params = new URLSearchParams(window.location.search);
const roomId = params.get('roomId');

let userId = null;

console.log(userId);
let messageBox = document.getElementById('messagesBox');

function getRealTimeData() {
    const q = query(collection(db, "Chatroom", roomId, "messages"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = []
        querySnapshot.forEach((doc) => {
            messages.push(doc.data());
        });
        messageBox.innerHTML = ""
        messages.map((messages) => {
            const { message: userMessage, userId: senderId } = messages
            messageBox.innerHTML += `  <div class="message incoming ${userId === senderId ? 'owner' : ''}" >
            <div class="avatar-sm"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpyPf8tIdIZ6zbNlEcOAdbsrtAwOIr0D8k5g&s" alt="avatar"></div>
            <div class="bubble">${userMessage}<div class="time">11:02</div></div>
          </div>`
        });

    });
}
 async function getCurrentUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            if (uid) {
                userId = uid
            }
            console.log("User ID: ", uid)
        } else {
            console.log("user logged out ho chuka he ")
        }
    });
}
getCurrentUser()
async function sendMessage() {
    let messageId = roomId + "_" + Date.now();
    let message = document.getElementById('message-input');
    console.log(message.value, "Broadcasting Message for Test purpose");
    const getLoginUser = null;
    await getCurrentUser((user) => {
        getLoginUser = user
    })

    if (!message.value.trim()) return; // prevent empty messages

    const messageRef = doc(db, 'Chatroom', roomId, "messages", messageId);
    await setDoc(messageRef, { createdAt: new Date().toISOString(), message: message.value, userId: userId });
    message.value = "";
}

getRealTimeData()

document.getElementById('sendMsgBtn')?.addEventListener('click', sendMessage);
