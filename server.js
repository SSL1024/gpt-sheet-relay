// trigger redeploy fix
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbx98Ocji-nLLHHjf9nvLxRGF8xtatra7z6nTEVNdmwIuuINK4ROqGLjoRfklDGXd8Th/exec";

app.use(bodyParser.json());

app.post("/log-design", async (req, res) => {
  const data = req.body;

  if (!Array.isArray(data) || data.length !== 8) {
    return res.status(400).send("❌ Invalid array format.");
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    res.send("✅ Row added to Google Sheet: " + result);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).send("❌ Failed to log to sheet.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
