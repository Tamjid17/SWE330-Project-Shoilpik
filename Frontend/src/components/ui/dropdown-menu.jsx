import React from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { useNavigate } from "react-router-dom";

const DropdownMenu = ({ label, items }) => {
  const navigate = useNavigate();

  return (
    <Menu
      menuButton={
        <MenuButton className="px-4 py-2 rounded text-black bg-lime-400 hover:bg-lime-600">{label}</MenuButton>
      }
    >
      {items.map((item, index) => (
        <MenuItem className= "hover:text-lime-600" key={index} onClick={() => navigate(item.path)}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DropdownMenu;
