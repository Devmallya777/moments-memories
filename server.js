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
// Send Email Route
// =========================
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const sender = {
      email: "mm.giftboxes04@gmail.com",
      name: "Moments & Memories",
    };

    const receivers = [
      {
        email: "mm.giftboxes04@gmail.com",
      },
    ];

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: `New Contact Form Message from ${name}`,
      htmlContent: `
        <div style="font-family: Arial; padding:20px; background:#fdf4f5; color:#5c2d3a; border-radius:10px;">
          <h2 style="color:#b76e79;">New Customer Inquiry 💖</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>

          <div style="margin-top:20px; padding:15px; background:white; border-radius:8px;">
            <strong>Message:</strong>
            <p>${message}</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Email failed to send",
      error: error.message,
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
