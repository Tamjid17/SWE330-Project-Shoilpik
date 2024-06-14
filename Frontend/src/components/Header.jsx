import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
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
    <div className="w-full h-auto md:h-20 bg-slate-500 flex flex-wrap items-center px-4 py-2 md:py-0">
      {/* Navigation Links */}
      <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-40 pl-20 mb-2 md:mb-0 w-full md:w-auto justify-center md:justify-center">
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-class" : "inactive-class"
            }
          >
            <Button className="bg-slate-500 text-lime-500 font-bold hover:bg-slate-500">
              শৈল্পিক
            </Button>
          </NavLink>
        </div>
        <div className="flex w-auto space-x-4 md:justify-center">
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
      </div>

      {/* Dropdown Menus */}
      <div className="flex space-x-0 md:space-x-4 ml-0 md:ml-auto w-full md:w-auto justify-center md:justify-end">
        <DropdownMenu label="Login" items={loginItems} />
        <DropdownMenu label="Register" items={registerItems} />
      </div>
    </div>
  );
}

export default Header;
