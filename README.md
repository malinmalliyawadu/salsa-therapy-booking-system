# Salsa Therapy Booking System 📆

## ⚡️ Getting Started

Create a `.env.local` file with the following values pulled from the Firebase project.

```
NEXT_PUBLIC_FIREBASE_API_KEY=<apiKey>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<messagingSenderId>
NEXT_PUBLIC_FIREBASE_APP_ID=<appId>
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Configuration

Set the Stripe secret key in Firebase

```
firebase functions:config:set stripe.secret=<STRIPE LIVE SECRET KEY>
```

## 🚀 Deployment

### Frontend

```
npm run deploy
```

### Backend

```
cd functions
npm run deploy
```
