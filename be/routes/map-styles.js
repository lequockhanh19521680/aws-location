const express = require("express");
const router = express.Router();
const {
  LocationClient,
  GetMapStyleDescriptorCommand,
} = require("@aws-sdk/client-location");

router.get("/", async (req, res) => {
  const client = new LocationClient({ region: "us-east-1" });

  try {
    const command = new GetMapStyleDescriptorCommand({
      MapName: "ImageryMapStydyCase",
    });

    const response = await client.send(command);
    res.set("Content-Type", response.ContentType || "application/json");
    res.send(Buffer.from(response.Blob));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get map style" });
  }
});

module.exports = router;
