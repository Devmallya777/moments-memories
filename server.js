```javascript
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const path = require("path");

const app = express();


// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));


// ======================
// STATIC FILES
// ======================

app.use(express.static(
  path.join(__dirname, "public")
));


// ======================
// BREVO SETUP
// ======================

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey =
client.authentications["api-key"];

apiKey.apiKey =
process.env.BREVO_API_KEY;

const tranEmailApi =
new SibApiV3Sdk.TransactionalEmailsApi();


// ======================
// ORDER ROUTE
// ======================

app.post("/api/order", async (req, res) => {

  try {

    const {
      product,
      price,
      name,
      email,
      phone,
      address,
      occasion,
      message
    } = req.body;


    // VALIDATION

    if (
      !product ||
      !price ||
      !name ||
      !email ||
      !phone ||
      !address
    ) {

      return res.status(400).json({

        success: false,

        message: "Please fill all fields"

      });

    }


    // SEND EMAIL

    await tranEmailApi.sendTransacEmail({

      sender: {

        email: "mm.giftboxes04@gmail.com",

        name: "Moments & Memories"

      },

      to: [

        {
          email: "mm.giftboxes04@gmail.com"
        }

      ],

      subject:
      `💖 New Order From ${name}`,

      htmlContent: `

      <div style="
      font-family:Poppins,sans-serif;
      padding:25px;
      background:#fff7f5;
      border-radius:14px;
      color:#4b2e2e;
      ">

      <h1 style="color:#c95b84;">
      New Order Received 💖
      </h1>

      <hr>

      <p>
      <strong>Product:</strong>
      ${product}
      </p>

      <p>
      <strong>Total Price:</strong>
      ${price}
      </p>

      <p>
      <strong>Name:</strong>
      ${name}
      </p>

      <p>
      <strong>Email:</strong>
      ${email}
      </p>

      <p>
      <strong>Phone:</strong>
      ${phone}
      </p>

      <p>
      <strong>Address:</strong>
      ${address}
      </p>

      <p>
      <strong>Occasion:</strong>
      ${occasion}
      </p>

      <div style="
      margin-top:20px;
      padding:15px;
      background:white;
      border-radius:10px;
      ">

      <strong>Gift Message ❤️</strong>

      <p>
      ${message || "No Message"}
      </p>

      </div>

      </div>

      `

    });


    // SUCCESS RESPONSE

    res.status(200).json({

      success: true,

      message: "Order Sent Successfully"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Email failed to send"

    });

  }

});


// ======================
// HOME ROUTE
// ======================

app.get("/", (req, res) => {

  res.sendFile(

    path.join(
      __dirname,
      "public",
      "index.html"
    )

  );

});


// ======================
// START SERVER
// ======================

const PORT =
process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
```
