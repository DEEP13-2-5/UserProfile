import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ backgroundColor: "#333", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ color: "#fff", margin: 0 }}>User Profile</h2>
      <button 
        style={{ backgroundColor: "#555", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer", borderRadius: "5px" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
