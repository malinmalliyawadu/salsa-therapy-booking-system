import '../styles/globals.css';
import type { AppProps } from 'next/app';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { Layout } from '../components/Layout';
import { useRouter } from 'next/dist/client/router';

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: 'salsa-therapy-booking-system.firebaseapp.com',
    projectId: 'salsa-therapy-booking-system',
    storageBucket: 'salsa-therapy-booking-system.appspot.com',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    databaseURL:
        'https://salsa-therapy-booking-system-default-rtdb.asia-southeast1.firebasedatabase.app',
};

if (!firebase.getApps().length) {
    const app = firebase.initializeApp(clientCredentials);

    if (typeof document !== 'undefined') {
        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(
                '6Lc-tCcdAAAAAEdTLe8olt7t12q9jYnjByn4RO37'
            ),
            isTokenAutoRefreshEnabled: true,
        });
    }
}

function MyApp({ Component, pageProps }: AppProps) {
    // hack to fix issue where redirect from stripe
    // loads the root index page instead of the page
    // the browser was sent to
    const router = useRouter();
    if (
        typeof window !== 'undefined' &&
        router.pathname !== window.location.pathname
    ) {
        router.push(window.location.href);
    }

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
