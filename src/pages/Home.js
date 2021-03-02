import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Home = (props) => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const handleSignOut = useCallback(async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      // TODO: set error
    }
  }, [history, logout]);
  return (
    <main className="container">
      <button onClick={handleSignOut}>Logout</button>

      <section className="container__box">
        <p>{user.displayName}</p>
      </section>
    </main>
  );
};

export default Home;
