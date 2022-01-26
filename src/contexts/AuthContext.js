import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword} from "firebase/auth"

const AuthContext = React.createContext()
// FUNCTION TO RUN CONTEXT
export const useAuth = () => {
    return useContext(AuthContext)
}
// CONTEXT PROVIDER WITH FIREBASE AUTH CURRENT USER
export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState()
    // FUNCTION FOR USER SIGNUP
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(email, password)
    }
    // const signup = async(email, password) => {
    //     return await createUserWithEmailAndPassword(email, password).then((response) => {
    //     setCurrentUser(response.user)
    //     return response.user
    //     })
    // }
    // SETTING USER AFTER A STATE CHANGE
    useEffect(() => {
        // FUNCTION TO UNSUBSCRIBE FROM LISTENER
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        console.log(console.log("FIREBASE:", auth))
        return unsubscribe
    }, [])
    const value = {currentUser, signup}
  return (
  <AuthContext.Provider value={value}>
      {!loading && children}
  </AuthContext.Provider>
  );
};