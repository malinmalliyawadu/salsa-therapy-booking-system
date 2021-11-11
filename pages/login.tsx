import React from "react";
import "firebase/firestore";
import { FacebookAuthProvider, getAuth } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { NextPage } from "next";

const Login: NextPage = () => {
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
    <div className="m-32 p-10 flex justify-center flex-col bg-white border">
      <h1 className="text-center text-4xl font-bold mb-6">
        Login to book a class
      </h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </div>
  );
};

export default Login;
