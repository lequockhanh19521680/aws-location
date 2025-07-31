const express = require("express");
const router = express.Router();
const {
  LocationClient,
  SearchPlaceIndexForTextCommand,
} = require("@aws-sdk/client-location");

console.log("🟢 suggest.js loaded");

const client = new LocationClient({ region: process.env.AWS_REGION });

router.post("/", async (req, res) => {
  console.log("📨 API /suggest hit");
  console.time("SuggestAPI");

  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Missing 'text' in body" });

    console.log("🔍 Querying AWS with:", text);

    const command = new SearchPlaceIndexForTextCommand({
      IndexName: process.env.AWS_PLACE_INDEX_NAME,
      Text: text,
      MaxResults: 5,
    });

    console.time("AWS_SDK_CALL");
    const response = await client.send(command);
    console.timeEnd("AWS_SDK_CALL");

    console.log("✅ AWS returned", JSON.stringify(response.Results, null, 2));
    console.timeEnd("SuggestAPI");

    return res.json(response.Results);
  } catch (err) {
    console.error("❌ Error in suggest:", err);
    console.timeEnd("SuggestAPI");
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
});

module.exports = router;
