// // Import the functions you need from the SDKs you need
// import * as firebase from 'firebase';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDGvZusXYbftxd9KCPXDmar61WvkO2LLRo",
//   authDomain: "be-patissier.firebaseapp.com",
//   projectId: "be-patissier",
//   storageBucket: "be-patissier.appspot.com",
//   messagingSenderId: "887060035948",
//   appId: "1:887060035948:web:c6cf58b160ca1ce9ea1b49",
//   measurementId: "G-3YV7S788VT"
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0){
//     app = firebase.initializeApp(firebaseConfig);
// }else {
//     app = firebase.app()
// }
// const auth = firebase.auth()

// export { auth };
// Import the functions you need from the SDKs you need
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
    apiKey: "AIzaSyCLA4vnLFaVow25ylLUkb57NhmnN6qk1vE",
    authDomain: "fir-auth-65294.firebaseapp.com",
    projectId: "fir-auth-65294",
    storageBucket: "fir-auth-65294.appspot.com",
    messagingSenderId: "105428798939",
    appId: "1:105428798939:web:49a9375f32ea94d4dfebfe"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;

// Initialize Firebase
