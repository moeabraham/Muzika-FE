import firebase from 'firebase/app';
import 'firebase/auth';


const config = {
    // TODO: add project details here
    apiKey: "AIzaSyBJmDoYW6dCn6AYppYa-nnorf1FuoHaTug",
    authDomain: "react-muzika.firebaseapp.com",
    projectId: "react-muzika",
    storageBucket: "react-muzika.appspot.com",
    messagingSenderId: "468948450493",
    appId: "1:468948450493:web:3e5dc72c1e70860316cbd4"
}



firebase.initializeApp(config)


// TODO: set up a provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
// reference to firebase auth
const auth = firebase.auth()

// TODO: set up auth functions
function login() {
    auth.signInWithPopup(googleProvider)

}

function logout(){
    auth.signOut();
}
// TODO: export auth functions

export {
    // shorthand property syntax
    login,
    logout,
    auth
}