import React from "react";
import "firebase/firestore";
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { NextPage } from "next";

const Login: NextPage = () => {
  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      FacebookAuthProvider.PROVIDER_ID,
      EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
    ],
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
