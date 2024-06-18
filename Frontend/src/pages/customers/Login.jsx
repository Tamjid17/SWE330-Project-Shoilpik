import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Logging in with:", { email, password });
  };

  const handleRegisterAsCustomer = () => {
    navigate("/customer/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center underline">Login as Customer</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col justify-between items-center">
            <Button
              type="submit"
              className="bg-lime-400 text-black text-xl py-2 px-4 rounded hover:bg-lime-500 m-4"
            >
              Login
            </Button>
            <div className="font-semibold text-md">or</div>
            <Button
              type="button"
              onClick={handleRegisterAsCustomer}
              className="bg-cyan-400 text-black text-xl py-2 px-4 rounded hover:bg-cyan-500 m-4"
            >
              Register as Customer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
