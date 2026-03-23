const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/passwords');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: true, // Allow all origins explicitly for Vercel sharing or restrictive env setup
    credentials: true
}));

const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'passify';
const connectUrl = url.endsWith('/') ? `${url}${dbName}` : `${url}/${dbName}`;

// Connect to MongoDB
mongoose.connect(connectUrl)
    .then(() => console.log('✅ MongoDB Mongoose Connected'))
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:');
        console.error(err);
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
    });
}

module.exports = app;
