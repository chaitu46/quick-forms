import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const history = useHistory();

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
        <button className="button auth-button" onClick={handleLogin}>
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
