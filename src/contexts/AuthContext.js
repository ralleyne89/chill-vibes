import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

// FUNCTION TO RUN CONTEXT
export const useAuth = () => {
  return useContext(AuthContext);
};

// CONTEXT PROVIDER WITH FIREBASE AUTH CURRENT USER
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  // FUNCTION FOR USER SIGNUP
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // FUNCTION FOR USER LOGIN
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // FUNCTION FOR USER LOGOUT
  const logout = () => {
    return signOut(auth);
  };

  // SETTING USER AFTER A STATE CHANGE
  useEffect(() => {
    // FUNCTION TO UNSUBSCRIBE FROM LISTENER
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
