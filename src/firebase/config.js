import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAQ0PMGalU93Zcn26TAfwbkbdTQH4tvOhw",
    authDomain: "vue-music-39298.firebaseapp.com",
    projectId: "vue-music-39298",
    storageBucket: "vue-music-39298.appspot.com",
    messagingSenderId: "390646336467",
    appId: "1:390646336467:web:f0b81d75a9badf2d413d26"
  };


firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export{projectAuth, projectFirestore, timestamp}