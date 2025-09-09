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
            messageBox.innerHTML += `
            <div class="chat-msg ${userId === senderId ? 'owner' : ''}">
                <div class="chat-msg-profile">
                    <img class="chat-msg-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpyPf8tIdIZ6zbNlEcOAdbsrtAwOIr0D8k5g&s" alt="">
                </div>
                <div class="chat-msg-content">
                    <div class="chat-msg-text">${userMessage}</div>
                </div>
            </div>  
        `
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



// import { auth, collection, db, doc, onAuthStateChanged, onSnapshot, query, setDoc } from "./config.js";

// const params = new URLSearchParams(window.location.search);
// const roomId = params.get('roomId');
// let userId = null;
// console.log("Room ID: ", roomId)
// let messageBox = document.getElementById('messagesBox');

// function getRealTimeData() {
//     const q = query(collection(db, "chatrooms", roomId, "messages"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const messages = []
//         querySnapshot.forEach((doc) => {
//             messages.push(doc.data());
//         });
//         messageBox.innerHTML = ""
//         messages.map((messages) => {
//             const { message: userMessage, userId: senderId } = messages
//             messageBox.innerHTML += `
//             <div class="chat-msg ${userId === senderId ? 'owner' : ''}">
//                 <div class="chat-msg-profile">
//                     <img class="chat-msg-img" src="https://tse1.mm.bing.net/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?r=0&cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3" alt="">
//                 </div>
//                 <div class="chat-msg-content">
//                     <div class="chat-msg-text">${userMessage}</div>
//                 </div>
//             </div>`
//         });

//         // 🔽 Always scroll to bottom after rendering
//         messageBox.scrollTo({ top: messageBox.scrollHeight, behavior: "smooth" });
//     });
// }

// async function getCurrentUser() {
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             const uid = user.uid;
//             if (uid) {
//                 userId = uid
//             }
//             console.log("User ID: ", uid)
//         } else {
//             console.log("user logged out ho chuka he ")
//         }
//     });
// }

// getCurrentUser()

// async function sendMessage() {
//     let messageId = roomId + "_" + Date.now();
//     let message = document.getElementById('message-input');
//     console.log(message.value, "Broadcasting Message for Test purpose");
//     const getLoginUser = null;
//     await getCurrentUser((user) => {
//         getLoginUser = user
//     })

//     if (!message.value.trim()) return; // prevent empty messages

//     const messageRef = doc(db, 'chatrooms', roomId, "messages", messageId);
//     await setDoc(messageRef, { createdAt: new Date().toISOString(), message: message.value, userId: userId });
//     message.value = "";

//     // 🔽 Ensure scroll after sending
//     messageBox.scrollTo({ top: messageBox.scrollHeight, behavior: "auto" });
// }

// getRealTimeData()

// document.getElementById('sendMsgBtn')?.addEventListener('click', sendMessage);

// document.getElementById('message-input')?.addEventListener('keydown', (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//         e.preventDefault();
//         sendMessage();
//     }
// });

// document.getElementById("backBtn")?.addEventListener("click", () => {
//     window.location.href = "dashboard.html"; // change filename if needed
// });