import React from "react";
import "firebase/firestore";
import { FacebookAuthProvider, getAuth } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

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
