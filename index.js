// index.js

const express = require("express");
const path = require("path");
const cors = require('cors'); 
const leetCardController = require('./controllers/leetCardController');


const app = express();
const port = process.env.PORT || 8000;

// Enable CORS for all origins using a more explicit configuration
app.use(cors({
  origin: true, // Allow all origins
  methods: ['GET', 'POST'], // You can specify allowed methods if needed
  allowedHeaders: ['Content-Type'], // You can specify allowed headers if needed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Main routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "public/api.html"));
});

// API routes
app.get('/api/cardgen', leetCardController.generateCard);
app.get('/api/cardgenDetail', leetCardController.generateCardDetail);
app.get('/api/preview', leetCardController.generatePreview);

// 404 handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public/404.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, "public/500.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});