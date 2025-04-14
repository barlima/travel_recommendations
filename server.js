const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "travel_recommendation.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about_us.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Handle contact form submissions
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Here you would typically save to a database or send an email
  console.log("Contact form submission:", { name, email, message });

  res.json({
    success: true,
    message: "Thank you for your message. We will get back to you soon!",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
