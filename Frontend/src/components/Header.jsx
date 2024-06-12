import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DropdownMenu from "./ui/dropdown-menu";
function Header() {
  const loginItems = [
    { label: "Login as Customer", path: "/customer/login" },
    { label: "Login as Seller", path: "/seller/login" },
  ];

  const registerItems = [
    { label: "Register as Customer", path: "/customer/register" },
    { label: "Register as Seller", path: "/seller/register" },
  ];
  return (
    <div className="w-full h-20 bg-slate-500 flex items-center px-4">
      {/* Navigation Links */}
      <div className="flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          <Button className = "bg-slate-500 text-lime-500 font-bold hover:bg-slate-500">শৈল্পিক</Button>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          <Button>Products</Button>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          <Button>About</Button>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          <Button>Contact</Button>
        </NavLink>
      </div>
      {/* Input Component */}
      <div className="ml-auto max-w-sm w-full">
        <Input className = "font-bold" placeholder="Search products..." />
      </div>
      <div className="flex space-x-4 ml-5">
        <DropdownMenu label="Login" items={loginItems} />
        <DropdownMenu label="Register" items={registerItems} />
      </div>
    </div>
  );
}

export default Header;
