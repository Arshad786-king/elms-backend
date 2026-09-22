const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const managerRoutes = require("./routes/managerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

const app = express();


// Connect MongoDB
connectDB();


// Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://elms-frontend-nu.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", passwordRoutes);


// Employee routes
app.use("/api/employee", employeeRoutes);


// Leave routes
app.use("/api/leaves", leaveRoutes);


// Manager routes
app.use("/api/manager", managerRoutes);


// Admin routes
app.use("/api/admin", adminRoutes);


// Notification routes
app.use("/api/notifications", notificationRoutes);


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "ELMS Backend is running successfully"
    });
});


// Start server locally
const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`ELMS Backend running on port ${PORT}`);
    });
}


// Export app for Vercel
module.exports = app;