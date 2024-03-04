const express = require("express");
const axios = require("axios");

require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/send-sms", async (req, res) => {
  const { message, to } = req.body;

  try {
    const formData = new URLSearchParams();
    formData.append("to", to);
    formData.append("secret", process.env.SMS_SECRET || "");
    formData.append("type", "sms");
    formData.append("message", message);
    formData.append("phone", to);
    formData.append("mode", "devices");
    formData.append("device", process.env.SMS_DEVICE_ID || "");
    formData.append("sim", "1");

    const response = await axios.post(
      "https://hahu.io/api/send/sms",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
