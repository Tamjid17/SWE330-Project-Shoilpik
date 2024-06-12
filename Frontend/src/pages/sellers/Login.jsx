import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Logging in with:", { email, password });
  };

  const handleRegisterAsSeller = () => {
    navigate("/seller/register");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center">Login as Seller</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 font-bold"
            >
              Email/ইমেইল
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 font-bold"
            >
              Password/পাসওয়ার্ড
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col justify-between items-center">
            <Button
              type="submit"
              className="bg-lime-400 text-black text-xl py-2 px-4 rounded hover:bg-lime-500 m-4"
            >
              প্রবেশ করুন
            </Button>
            <div className="font-semibold text-md">অথবা</div>
            <Button
              type="button"
              onClick={handleRegisterAsSeller}
              className="bg-cyan-400 text-black text-xl py-2 px-4 rounded hover:bg-cyan-500 m-4"
            >
              বিক্রেতা নিবন্ধন
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
