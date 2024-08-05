// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyA1MHEaB4SfihGCFObR617U6EPwBmIhXh0",
      authDomain: "inventory-management-bec1d.firebaseapp.com",
      projectId: "inventory-management-bec1d",
      storageBucket: "inventory-management-bec1d.appspot.com",
      messagingSenderId: "228316266571",
      appId: "1:228316266571:web:eef94a5e25ac47d8b38dce",
      measurementId: "G-Z6FMC9FTNG"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
   // const analytics = getAnalytics(app);
    const firestore = getFirestore(app);

    export {firestore}