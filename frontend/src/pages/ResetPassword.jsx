import React, { useState } from "react";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setMessage("If this email exists in our system, you will receive a reset link.");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        {message && <p className="text-center text-green-600 font-medium mb-4">{message}</p>}
        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Email address</label>
            <input 
              type="email" 
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/login" className="text-blue-600 font-medium">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
