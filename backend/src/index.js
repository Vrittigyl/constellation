// Import necessary modules using ES modules
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Simple route to test if server is running
app.get('/', (req, res) => {
    res.send('Server is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
