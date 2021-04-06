import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      var user = result.user;
      const {displayName, photoURL, email} = user;

      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }

      return signedInUser;
      console.log(displayName, photoURL, email);
    })
  }

  export   const handleSignOut =()=>{
    console.log('sign out clicked');

    return firebase.auth().signOut().then(() => {
      const signedOutUser ={
        isSignedIn : false,
        name : '',
        email: '',
        photo: '',
        success: false
      };

      return signedOutUser;
    }).catch((error) => {
      // An error happened.
    });
  }

  export const createUserWithEmailAndPassword = (name, email, password) =>{
    console.log('submitting');
    return firebase.auth().createUserWithEmailAndPassword(email,password)

    .then(res =>{
      // const newUserInfo = {...user};
      const newUserInfo = res.user;
      newUserInfo.error ='';
      newUserInfo.success = true;
      // setUsers(newUserInfo);
      console.log(res);
      // updateUserName(user.name);
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {

      const userNewInfo = {};
      userNewInfo.error = error.message;
      userNewInfo.success = false;
      // setUsers(userNewInfo);

      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return userNewInfo;
      // ..
    });
  }

  export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo = res.user;
      newUserInfo.error ='';
      newUserInfo.success = true;
      // setUsers(newUserInfo);
      // setLoggedInUser(newUserInfo);
      // history.replace(from);
      console.log(res.user);
      return newUserInfo;
    })
    .catch((error) => {

      const userNewInfo = {};
      userNewInfo.error = error.message;
      userNewInfo.success = false;
      // setUsers(userNewInfo);

      var errorCode = error.code;
      var errorMessage = error.message;
      return userNewInfo;
      // ..
    });
  }

  const updateUserName = (name) =>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    
    }).then(function() {
      console.log('Update successful.');
    }).catch(function(error) {
      console.log(error);
    });
  }
