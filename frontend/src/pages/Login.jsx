import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center">Log in</h2>
        <form onSubmit={handleLogin}>
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
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span 
              className="absolute right-3 top-9 text-gray-500 cursor-pointer text-sm" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <div className="text-right text-sm mb-4">
            <a href="/ResetPassword" className="text-blue-600 font-medium">Forgot password?</a>
          </div>
          <button 
            type="submit" 
            className="w-full bg-gray-300 text-white py-2 rounded-lg cursor-not-allowed" 
            disabled
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
