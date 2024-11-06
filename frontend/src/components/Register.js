import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State to hold the registration message

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });
      // Update the message with the success response from the backend
      setMessage(response.data.message); // Assuming your backend sends a success message
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        setMessage(`Registration failed: ${error.response.data.message}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        setMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>} {/* Display the registration message */}
    </div>
  );
};

export default Register;
