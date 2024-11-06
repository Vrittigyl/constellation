// app.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; // Import user routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the user routes with a base URL
app.use('/api/users', userRoutes); // Now /api/users will route to userRoutes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Simple route for the root path
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Export the app for use in other modules
export { app }; // Ensure you're exporting the app like this
