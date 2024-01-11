import React, { useState } from 'react';

function Login({ setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        const admin = await response.json();
        setAuth(true);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-800 w-screen">
      <div className="bg-stone-900 shadow-lg rounded-md p-8 w-full max-w-sm">
        <h2 className="text-white font-bold text-3xl text-center mb-8">LOG IN</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 mb-4 bg-stone-800 text-white rounded-md"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 mb-4 bg-stone-800 text-white rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
