import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSun, FaMoon, FaTrash, FaStickyNote, FaUser,FaMapPin } from "react-icons/fa";
import { MdOutlineStickyNote2 } from "react-icons/md";
import "./sidenav.css";

const SideNav = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("mode") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("mode", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="sidenav">
      <h1 className="logo">No<span className="logo-highlight">tes</span></h1>
      <nav className="nav-links">
      <NavLink to="/home" className=  {({ isActive }) =>isActive ? "activePage" : "nonActivePage nav-link"} >
        <MdOutlineStickyNote2  className="icon" />All Notes</NavLink>

        <NavLink to="/home/Pin"className=  {({ isActive }) =>isActive ? "activePage" : "nonActivePage nav-link"} >
        <FaMapPin  className="icon" />Pinned</NavLink>

        <NavLink to="/home/Bin"className=  {({ isActive }) =>isActive ? "activePage" : "nonActivePage nav-link"} >
        <FaTrash  className="icon" />Bin</NavLink>

      </nav>
      <div className="mode-toggle">
        <button onClick={toggleMode} className="toggle-button">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default SideNav;
