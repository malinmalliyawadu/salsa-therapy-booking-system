import React from 'react'
import 'firebase/firestore'
import {
    EmailAuthProvider,
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
} from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { NextPage } from 'next'

const Login: NextPage = () => {
    // Configure FirebaseUI.
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            GoogleAuthProvider.PROVIDER_ID,
            FacebookAuthProvider.PROVIDER_ID,
            EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
        ],
    }

    return (
        <div className="m-32 p-10 flex justify-center flex-col">
            <style>
                {`
        .firebaseui-idp-button {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          border-radius: 0.375rem;
          padding: 1rem 1.25rem;
          max-width: 250px;
          --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        }
        
        .firebaseui-idp-button:hover {
          transform: scale(1.05);
        }
        
        .firebaseui-idp-text {
          font-size: 1rem;
        }
        `}
            </style>
            <h1 className="text-center text-4xl font-bold mb-6">
                Login to book a class
            </h1>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
        </div>
    )
}

export default Login
