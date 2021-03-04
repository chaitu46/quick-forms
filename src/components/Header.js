import React, { useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ history }) {
  const { user, logout } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      // TODO: set error
    }
  }, [history, logout]);
  const handleLogin = useCallback(() => {
    history.push("/login");
  }, [history]);

  return (
    <header>
      <h1>Quick Forms</h1>
      {!user ? (
        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>
      ) : (
        <button className="auth-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
}
