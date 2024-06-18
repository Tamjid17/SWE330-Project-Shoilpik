import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const CustomerRegister = () => {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault();
    const size = password.length;
    if(password !== confirmpassword) {
      alert("Passwords do not match. PLease try again.")
      return
    }
    if(size < 8) {
      alert("Password should be atleast 8 characters long.")
      return
    }
    console.log("Registering with:", { name,email, password, gender, address, phone, dob});
  };

  const handleloginAsCustomer = () => {
    navigate("/customer/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center underline">
          Registration
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 mb-2 font-bold"
            >
              Name
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
          <div className="mb-0">
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 font-bold"
            >
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
          <div className="mb-4 text-sm font-light">
            Password should be atleast 8 characters long.
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmpassword"
              className="block text-gray-700 mb-2 font-bold"
            >
              Confirm Password
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
              Phone
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
              Address
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
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled selected>
                Select your gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-12">
            <label htmlFor="dob" className="block text-gray-700 mb-2 font-bold">
              Date of Birth
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
          <div className="flex flex-col justify-between items-center">
            <Button
              type="submit"
              className="bg-lime-400 text-black py-2 px-4 rounded hover:bg-lime-500 m-4 text-xl"
            >
              Register
            </Button>
            <div className="font-semibold">or</div>
            <Button
              type="button"
              onClick={handleloginAsCustomer}
              className="bg-cyan-400 text-black py-2 px-4 rounded hover:bg-cyan-500 m-4 text-xl"
            >
              Login as Customer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister