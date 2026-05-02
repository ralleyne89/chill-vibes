import React, { useContext, useEffect, useState } from "react";
import { auth, isFirebaseConfigured, missingFirebaseConfig } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
    if (!auth) {
      return Promise.reject(new Error("Firebase is not configured."));
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // FUNCTION FOR USER LOGIN
  const login = (email, password) => {
    if (!auth) {
      return Promise.reject(new Error("Firebase is not configured."));
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  // FUNCTION FOR USER LOGOUT
  const logout = () => {
    if (!auth) {
      return Promise.resolve();
    }
    return signOut(auth);
  };

  // SETTING USER AFTER A STATE CHANGE
  useEffect(() => {
    if (!auth) {
      setCurrentUser(null);
      setLoading(false);
      return undefined;
    }

    // FUNCTION TO UNSUBSCRIBE FROM LISTENER
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isFirebaseConfigured,
    signup,
    login,
    logout,
    missingFirebaseConfig,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
