import React, { useContext, useState, useEffect } from "react";
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

const AuthApi = {
  login,
  register,
  logout,
  updateProfile,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, ...AuthApi }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
