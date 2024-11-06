import express from 'express';
const router = express.Router();

// Sample user registration route
router.route('/register')
  .post((req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Simulate user registration success
    return res.json({ message: `User ${name} registered successfully!` });
  });

export default router;
