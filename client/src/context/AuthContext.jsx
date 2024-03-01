// AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userDoc, setUserDoc] = useState(null);

  const handleSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserDoc(userData);
        // Update user data in Firestore
        const currentLoggedInTime = new Date().getTime();
        await updateDoc(userDocRef, { lastLoggedIn: currentLoggedInTime });
      } else {
        console.log("User data not found.");
      }
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserDoc(docSnap.data());
          }
        });
        return () => unsubscribeDoc();
      } else {
        setUserDoc(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, userDoc, setUserDoc, handleSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
