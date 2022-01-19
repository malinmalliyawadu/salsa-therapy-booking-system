const stripe = require("stripe")(
  "sk_test_51JnuxLEUkqcePY5ex6WmL9JIJ5m2l5S8dlUiCRa6CJYiR1pbKQ2ibFM9rRfYhp1d0pOSNzxEgPY1rQJQdxVirjR800lENpdfbw"
);
const express = require("express");
const app = express();
app.use(express.static("public"));
const functions = require("firebase-functions");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const YOUR_DOMAIN = "https://salsa-therapy-booking-system.web.app/";

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
    success_url: `${YOUR_DOMAIN}/booking/success/?id=${req.body.classId}`,
    cancel_url: req.headers.referer || `${YOUR_DOMAIN}`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));

exports.app = functions.https.onRequest(app);

export {};
