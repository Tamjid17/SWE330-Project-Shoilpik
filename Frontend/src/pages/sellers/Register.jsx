import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../../features/sellerSlice";
import axios from 'axios';

const SellerRegister = () => {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.user);

  const handleRegister = async (e) => {

    e.preventDefault();
    const size = password.length;
    if (password !== confirmpassword) {
      alert("পাসওয়ার্ড মিলছে না। পুনরায় চেষ্টা করুন।");
      return;
    }
    if (size < 8) {
      alert("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।");
      return;
    }
    console.log("Registering with:", { name,email, password, gender, address, phone, dob });
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "/api/seller/register",
        {
          name,
          email,
          password,
          phone,
          address,
          dob,
          gender,
        }
      );
      dispatch(setUser(response.data));
      alert('Registration successful! Please check your email for verification.');
      navigate('/seller/login');
    } catch (error) {
      dispatch(setError(error.message));
      alert(`Registration failed. ${error.message}.`);
    }
  };

  const handleloginAsCustomer = () => {
    navigate("/customer/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center underline">
          নিবন্ধন
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 mb-2 font-bold"
            >
              Name/আপনার নাম
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 font-bold"
            >
              Email/আপনার ইমেইল
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
          <div className="mb-0">
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
              placeholder="Enter your password"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 text-sm font-light">
            পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmpassword"
              className="block text-gray-700 mb-2 font-bold"
            >
              Confirm Password/পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <Input
              type="password"
              id="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              placeholder="Enter your password again"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 mb-2 font-bold"
            >
              Phone/ফোন নম্বর
            </label>
            <Input
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 mb-2 font-bold"
            >
              Address/আপানার ঠিকানা
            </label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 mb-2 font-bold"
            >
              Gender/আপনার চিহ্ন
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled selected>
                আপনার চিহ্ন নির্বাচন করুন
              </option>
              <option value="Male">পুরুষ</option>
              <option value="Female">নারী</option>
            </select>
          </div>
          <div className="mb-12">
            <label htmlFor="dob" className="block text-gray-700 mb-2 font-bold">
              Date of Birth/ জন্মসাল
            </label>
            <Input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Enter your date of birth"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {loading && <p className="text-blue-500">নিবন্ধন চলছে...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col justify-between items-center">
            <Button
              type="submit"
              className="bg-lime-400 text-black py-2 px-4 rounded text-xl hover:bg-lime-500 m-4"
            >
              জমা দিন
            </Button>
            <div className="font-semibold">অথবা</div>
            <Button
              type="button"
              onClick={handleloginAsCustomer}
              className="bg-cyan-400 text-black py-2 px-4 rounded text-xl hover:bg-cyan-500 m-4"
            >
              প্রবেশ করুন
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerRegister;
