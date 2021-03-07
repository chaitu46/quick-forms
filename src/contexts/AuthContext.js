import { useSnackbar } from "notistack";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function register(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

function logout() {
  return auth.signOut();
}

function updateProfile(userData, fullName) {
  return userData.user.updateProfile({ displayName: fullName });
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const handleLogin = useCallback(
    async (values, props) => {
      const { email, password } = values;
      try {
        await login(email, password);
        history.push("/");
      } catch (error) {
        const message = error.message || "Something went wrong!";
        enqueueSnackbar(message, { variant: "error" });
      }
    },
    [history, enqueueSnackbar]
  );
  const handleRegister = useCallback(
    async (values, props) => {
      const { email, password, fullName } = values;
      console.log(values);
      try {
        const userData = await register(email, password);
        await updateProfile(userData, fullName);
        history.push("/");
        props.resetForm();
      } catch (error) {
        const message = error.message || "Something went wrong!";
        enqueueSnackbar(message, { variant: "error" });
      }
    },
    [history, enqueueSnackbar]
  );

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      const message = error.message || "Something went wrong!";
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [history, enqueueSnackbar]);

  const handleHeaderLogin = useCallback(() => {
    history.push("/login");
  }, [history]);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleRegister,
        handleLogin,
        handleLogout,
        handleHeaderLogin,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
