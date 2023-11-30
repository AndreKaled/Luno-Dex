(function(){
  const firebaseConfig = {
    apiKey: "AIzaSyATIlCOF41KrppYeWfR2sWm_bLAP4xgNQI",
    authDomain: "luno-dex.firebaseapp.com",
    projectId: "luno-dex",
    storageBucket: "luno-dex.appspot.com",
    messagingSenderId: "164384141387",
    appId: "1:164384141387:web:98e1e911b988ea86eb9dce",
    measurementId: "G-7RVHG3ZWKP"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
})()