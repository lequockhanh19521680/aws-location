const router = require("express").Router();
const axios = require("axios");

const API_KEY = process.env.AWS_LOCATION_API_KEY;
const REGION = process.env.AWS_REGION;

router.get("/device/:deviceId", async (req, res) => {
  const TRACKER = "YourTracker"; // ← Thay bằng tên tracker thực tế
  const deviceId = req.params.deviceId;

  const url = `https://tracking.geo.${REGION}.amazonaws.com/trackers/${TRACKER}/devices/${deviceId}/position`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-Amz-Api-Key": API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error(
      "Error fetching device position:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
