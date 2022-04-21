import express = require('express');
import functions = require('firebase-functions');
import Stripe from 'stripe';
import bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
const stripe = new Stripe(functions.config().stripe.secret, {
    apiVersion: '2020-08-27',
});
app.use(bodyParser.urlencoded({ extended: false }));

const YOUR_DOMAIN = 'https://salsa-therapy-booking-system.web.app/';

app.get('/price/:stripeId', async (req, res) => {
    const stripeId = req.params.stripeId;

    const price = await stripe.prices.retrieve(stripeId);

    res.set('Access-Control-Allow-Origin', '*');
    res.send(price);
});

app.post('/create-checkout-session', async (req, res) => {
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
        customer_email: req.body.email,
        line_items: [
            {
                price: req.body.priceId,
                quantity: 1,
            },
        ],
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/booking/success/?id=${req.body.priceId}&dancerType=${req.body.dancerType}`,
        cancel_url: req.headers.referer || `${YOUR_DOMAIN}`,
        allow_promotion_codes: true,
    });

    res.redirect(303, session.url || '/');
});

app.listen(4242, () => console.log('Running on port 4242'));

exports.app = functions.https.onRequest(app);

export {};
