import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyABF8kUkfep2oVOmuKwtXYYNpb9f0u-Bqk",
  authDomain: "mernecommerce-5a3ed.firebaseapp.com",
  projectId: "mernecommerce-5a3ed",
  storageBucket: "mernecommerce-5a3ed.appspot.com",
  messagingSenderId: "948637468972",
  appId: "1:948637468972:web:faefec10dd43a729d10489",
  measurementId: "G-29XRG7ZN01",
};

var storage = firebase.storage();

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export { storage, firebase as default };
