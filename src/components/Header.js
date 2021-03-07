import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, handleHeaderLogin, handleLogout } = useAuth();

  return (
    <header>
      <h1>
        <Link to="/">Quick Forms</Link>
      </h1>
      {!user ? (
        <button className="button auth-button" onClick={handleHeaderLogin}>
          Login
        </button>
      ) : (
        <button className="button auth-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
}
