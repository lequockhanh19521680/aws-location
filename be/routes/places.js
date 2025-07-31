const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = process.env.AWS_LOCATION_API_KEY;
const REGION = process.env.AWS_REGION;
const INDEX_NAME = "PlaceStudyCase";

router.post("/search", async (req, res) => {
  const url = `https://places.geo.${REGION}.amazonaws.com/places/v0/indexes/${INDEX_NAME}/search/text`;
  console.log(url);

  try {
    const response = await axios.post(url, req.body, {
      headers: {
        "Content-Type": "application/json",
        "X-Amz-Api-Key": API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
