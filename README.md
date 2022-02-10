# Salsa Therapy Booking System 📆

## ⚡️ Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

Set the Stripe secret key in Firebase

```
firebase functions:config:set stripe.secret=<STRIPE LIVE SECRET KEY>
```

## Deployment

### Frontend

```
npx firebase deploy --only hosting
```

### Backend

```
cd functions
npm run deploy
```
