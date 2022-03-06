const express = require("express");
const app = express();
app.use(express.static("public"));
const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const YOUR_DOMAIN = "https://salsa-therapy-booking-system.web.app/";

app.get("/product/:stripeId/price", async (req: any, res: any) => {
  const stripeId = req.params.stripeId;

  const price = await stripe.prices.list({ product: stripeId });

  res.send(price.data);
});

app.post("/create-checkout-session", async (req: any, res: any) => {
  console.log(req.body);
  const session = await stripe.checkout.sessions.create({
    customer_email: req.body.email,
    line_items: [
      {
        price: req.body.productId,
        quantity: "1",
      },
    ],
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/booking/success/?id=${req.body.productId}`,
    cancel_url: req.headers.referer || `${YOUR_DOMAIN}`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));

exports.app = functions.https.onRequest(app);

export {};
