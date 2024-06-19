import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../../features/userSlice";
import axios from 'axios';

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleLogin = async (e) => {

    e.preventDefault();
    console.log("Logging in with:", { email, password });

    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "/api/seller/login",
        {
          email,
          password,
        }
      );
      dispatch(setUser(response.data));
      localStorage.setItem("sellerToken", response.data.token); 
      alert("Login successful.");
      navigate('/');
    } catch (error) {
      dispatch(setError(error.message));
      alert(`Login failed. ${error.message}.`);
    }
  };

  const handleRegisterAsSeller = () => {
    navigate("/seller/register");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center underline">
          Login as Seller
        </h2>
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
          {loading && <p className="text-blue-500">অপেক্ষা করুন...</p>}
          {error && <p className="text-red-500">{error}</p>}
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
