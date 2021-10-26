// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9Rr4BsKpsIlf8lVPhlLi_t9xR5HmgFsA",
  authDomain: "mssm-web-crud.firebaseapp.com",
  projectId: "mssm-web-crud",
  storageBucket: "mssm-web-crud.appspot.com",
  messagingSenderId: "918233535822",
  appId: "1:918233535822:web:ac1149d56c2db769e0ba1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
