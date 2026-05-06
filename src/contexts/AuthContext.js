import React, { useContext, useEffect, useState } from "react";
import { auth, isFirebaseConfigured, missingFirebaseConfig } from "../firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
const GOOGLE_REDIRECT_PATH_KEY = "chill-vibes-google-redirect-path";
const GOOGLE_AUTH_SUCCESS = "success";
const GOOGLE_AUTH_REDIRECT = "redirect";
let authPersistencePromise = null;
let googleRedirectResultPromise = null;

const getGoogleRedirectResult = () => {
  if (!auth) {
    return Promise.resolve(null);
  }
  if (!googleRedirectResultPromise) {
    googleRedirectResultPromise = getRedirectResult(auth);
  }
  return googleRedirectResultPromise;
};

const ensureAuthPersistence = () => {
  if (!auth) {
    return Promise.reject(new Error("Firebase is not configured."));
  }

  if (!authPersistencePromise) {
    authPersistencePromise = setPersistence(auth, browserLocalPersistence).catch(
      (error) => {
        authPersistencePromise = null;
        throw error;
      }
    );
  }

  return authPersistencePromise.then(() => auth);
};

const getStoredGoogleRedirectPath = () => {
  try {
    return window.sessionStorage.getItem(GOOGLE_REDIRECT_PATH_KEY);
  } catch (error) {
    return null;
  }
};

const setStoredGoogleRedirectPath = (redirectPath) => {
  if (!redirectPath) return;
  try {
    window.sessionStorage.setItem(GOOGLE_REDIRECT_PATH_KEY, redirectPath);
  } catch (error) {
    // Session storage can be unavailable in stricter browser contexts.
  }
};

const clearStoredGoogleRedirectPath = () => {
  try {
    window.sessionStorage.removeItem(GOOGLE_REDIRECT_PATH_KEY);
  } catch (error) {
    // Session storage can be unavailable in stricter browser contexts.
  }
};

// FUNCTION TO RUN CONTEXT
export const useAuth = () => {
  return useContext(AuthContext);
};

// CONTEXT PROVIDER WITH FIREBASE AUTH CURRENT USER
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [authError, setAuthError] = useState(null);

  const clearAuthError = () => {
    setAuthError(null);
  };

  // FUNCTION FOR USER SIGNUP
  const signup = async (email, password) => {
    const readyAuth = await ensureAuthPersistence();
    clearAuthError();
    return createUserWithEmailAndPassword(readyAuth, email, password);
  };

  // FUNCTION FOR USER LOGIN
  const login = async (email, password) => {
    const readyAuth = await ensureAuthPersistence();
    clearAuthError();
    return signInWithEmailAndPassword(readyAuth, email, password);
  };

  const signInWithGoogle = async (redirectPath = "/") => {
    const readyAuth = await ensureAuthPersistence();
    clearAuthError();
    setStoredGoogleRedirectPath(redirectPath);
    googleRedirectResultPromise = null;

    try {
      const credential = await signInWithPopup(readyAuth, googleProvider);
      clearStoredGoogleRedirectPath();
      return { credential, status: GOOGLE_AUTH_SUCCESS };
    } catch (error) {
      if (error?.code === "auth/popup-blocked") {
        try {
          await signInWithRedirect(readyAuth, googleProvider);
          return { credential: null, status: GOOGLE_AUTH_REDIRECT };
        } catch (redirectError) {
          clearStoredGoogleRedirectPath();
          throw redirectError;
        }
      }
      clearStoredGoogleRedirectPath();
      throw error;
    }
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

    let isMounted = true;
    const authInitTimeout = window.setTimeout(() => {
      if (!isMounted) return;
      setCurrentUser(auth.currentUser);
      setLoading(false);
    }, 12000);

    const finishAuthLoad = () => {
      window.clearTimeout(authInitTimeout);
      if (isMounted) {
        setLoading(false);
      }
    };

    let unsubscribe = () => {};

    ensureAuthPersistence()
      .then((result) => {
        if (!isMounted) return;
        // FUNCTION TO UNSUBSCRIBE FROM LISTENER
        unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (!isMounted) return;
            setCurrentUser(user);
            if (user) {
              setAuthError(null);
            }
            finishAuthLoad();
          },
          (error) => {
            if (!isMounted) return;
            setAuthError(error);
            setCurrentUser(null);
            finishAuthLoad();
          }
        );

        return getGoogleRedirectResult();
      })
      .then((result) => {
        if (!isMounted || !result) return;
        if (result.user) {
          setCurrentUser(result.user);
          setAuthError(null);
        }
        finishAuthLoad();
      })
      .catch((error) => {
        if (!isMounted) return;
        setAuthError(error);
        setCurrentUser(auth.currentUser);
        finishAuthLoad();
      });

    return () => {
      isMounted = false;
      window.clearTimeout(authInitTimeout);
      unsubscribe();
    };
  }, []);

  const value = {
    authError,
    authLoading: loading,
    clearAuthError,
    currentUser,
    clearStoredGoogleRedirectPath,
    getStoredGoogleRedirectPath,
    isFirebaseConfigured,
    signup,
    login,
    signInWithGoogle,
    logout,
    missingFirebaseConfig,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
