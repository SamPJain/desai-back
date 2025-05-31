// index.js (or app.js)
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db'); // Assuming this connects to MongoDB
const projectRoutes = require('./routes/project');
const adminRoutes = require('./routes/admin');
const cors = require('cors');

const app = express();

// --- Database Connection ---
// It's crucial that dbConfig connects to your MongoDB using an environment variable.
// Example: process.env.MONGODB_URI
// Make sure your dbConfig.js handles this.
dbConfig();

// --- CORS Configuration ---
// It's best to manage allowed origins via environment variables, especially for Vercel previews.
// process.env.VERCEL_URL will give you the current deployment URL on Vercel.
const allowedOrigins = [
  process.env.FRONTEND_VERCEL_URL, // Your main Vercel frontend domain (e.g., https://desai-front-end.vercel.app)
  'http://localhost:3000', // For local development of your React app
  'http://localhost:3001'
];

// Add dynamic Vercel preview URLs if the current deployment is a Vercel preview
if (process.env.VERCEL_URL) {
  // This allows any Vercel deployment of your frontend to access this backend
  // Be cautious with this if you have many frontend projects.
  // A more robust solution might involve checking specific project names or patterns.
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // and allow if the origin is in our allowed list
    if (!origin || allowedOrigins.includes(origin)) { // Use .includes for array check
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`)); // Provide more context for debugging
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true, // Set to true if you are sending cookies or authorization headers (like JWT)
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON request bodies

// --- Routes ---
app.get('/', (req, res) => {
    res.send("API is running");
});

app.use('/api/project', projectRoutes);
app.use('/api/admin', adminRoutes);

// --- IMPORTANT: Export the app for Vercel ---
// Vercel will automatically detect this and run your Express app as a serverless function.
module.exports = app;

// Optionally, for local development, you can still listen on a port.
// This block will NOT run on Vercel.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}
