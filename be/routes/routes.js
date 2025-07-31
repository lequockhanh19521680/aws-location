const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = process.env.AWS_LOCATION_API_KEY;
const REGION = process.env.AWS_REGION;

const CALCULATOR = "YourRouteCalculator";

router.post("/calculate", async (req, res) => {
  const url = `https://routes.geo.${REGION}.amazonaws.com/routes/v0/calculators/${CALCULATOR}/calculate/route`;
  console.log(url);
  try {
    const response = await axios.post(url, req.body, {
      headers: {
        "X-Amz-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
