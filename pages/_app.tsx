import '../styles/globals.css';
import type { AppProps } from 'next/app';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { Layout } from '../components/Layout';
import { useRouter } from 'next/dist/client/router';

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
