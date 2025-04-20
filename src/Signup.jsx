import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const userData = {
      user: {
        password: password,
        username: username,
      },
    };

    axios.post("https://chatbot-t2dr.onrender.com/users", userData)
      .then((response) => {
        console.log("Request successful:", response);
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Username"
            autoComplete="username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
