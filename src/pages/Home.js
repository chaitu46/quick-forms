import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import fire from "../firebase";
import { AuthContext } from "../AuthProvider";

const Home = (props) => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const handleSignOut = useCallback(
    async (values, props) => {
      fire.auth().signOut();
      history.push("/login");
    },
    [history]
  );
  console.log(user);
  if (!user) {
    history.push("/login");
  }
  return (
    <main className="container">
      <button onClick={handleSignOut}>Logout</button>
      <section className="container__box">TODO</section>
    </main>
  );
};

export default Home;
