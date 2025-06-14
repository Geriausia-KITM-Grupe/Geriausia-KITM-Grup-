const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const connection = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();
connection();

const app = express();

app.use(express.json());

// CORS configuration (allow frontend, credentials if needed)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(cookieParser());

// User routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/event-likes", require("./routes/likeRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/event-categories", require("./routes/eventCategoryRoutes"));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
