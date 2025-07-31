const express = require("express");
const router = express.Router();
const {
  LocationClient,
  SearchPlaceIndexForTextCommand,
} = require("@aws-sdk/client-location");

const client = new LocationClient({ region: process.env.AWS_REGION });

router.get("/geocode", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing q param" });

  try {
    const result = await axios.post(
      `https://places.geo.${AWS_REGION}.amazonaws.com/places/v0/indexes/${INDEX_NAME}/search/text`,
      { Text: query, MaxResults: 1 },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Amz-Api-Key": AWS_API_KEY,
        },
      }
    );

    res.json(result.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch coordinates" });
  }
});

module.exports = router;
