import * as firebase from "firebase/app";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  FacebookAuthProvider,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import "firebase/firestore";
const {
  initializeAppCheck,
  ReCaptchaV3Provider,
} = require("firebase/app-check");

function SignInScreen() {
  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "popup",
    // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // GitHub as the only included Auth Provider.
    // You could add and configure more here!
    signInOptions: [FacebookAuthProvider.PROVIDER_ID],
  };

  return (
    <div>
      <h1>Pineapple Login</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </div>
  );
}

export default SignInScreen;
