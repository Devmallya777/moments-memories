require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const path = require("path");

const app = express();

// =========================
// Middleware
// =========================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// =========================
// Static Files
// =========================
app.use(express.static(path.join(__dirname, "public")));

// =========================
// Brevo Setup
// =========================
const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// =========================
// Contact Form Route
// =========================
app.post("/send-email", async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      message
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

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

      subject: `💖 New Contact Message From ${name}`,

      htmlContent: `
      <div style="font-family:Poppins,sans-serif;padding:20px;background:#fff7f5;color:#4b2e2e;">

      <h2 style="color:#c95b84;">
      New Customer Message 💖
      </h2>

      <hr>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>

      <div style="margin-top:20px;padding:15px;background:white;border-radius:10px;">
      <strong>Message:</strong>
      <p>${message}</p>
      </div>

      </div>
      `

    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Email failed to send"
    });

  }

});

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});