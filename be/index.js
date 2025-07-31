require("dotenv").config(); // Load biến môi trường từ .env

const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors()); // Cho phép gọi API từ frontend khác origin
app.use(express.json()); // Parse JSON request body

// Log mọi request vào console (tùy chọn, hữu ích khi debug)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Route chính
app.use("/api/places", require("./routes/places"));
app.use("/api/routes", require("./routes/routes"));
app.use("/api/geofences", require("./routes/geofences"));
app.use("/api/tracker", require("./routes/tracker"));
app.use("/api/suggest", require("./routes/suggest"));
app.use("/api/map-style", require("./routes/map-styles"));

// Middleware xử lý lỗi toàn cục (global error handler)
app.use((err, req, res, next) => {
  console.error("❌ Lỗi xảy ra:", err.stack || err);
  res.status(500).json({ error: "Đã xảy ra lỗi phía server." });
});

// Server chạy ở port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
