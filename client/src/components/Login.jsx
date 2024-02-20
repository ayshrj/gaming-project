import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

const Login = ({ setIsUserRegistered, setAuthenticationBoxOpen }) => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        const userRef = db.collection("users").doc(user.uid);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const lastLoggedIn = userData.lastLoggedIn;
          const currentStreak = userData.currentStreak;
          const highestStreak = userData.highestStreak;
          const now = new Date().getTime();
          let updatedCurrentStreak = currentStreak;
          let updatedHighestStreak = highestStreak;

          if (now - lastLoggedIn < 24 * 60 * 60 * 1000) {
            updatedCurrentStreak++;
            updatedHighestStreak = Math.max(
              updatedCurrentStreak,
              updatedHighestStreak
            );
            if (updatedCurrentStreak === 7) {
              updatedCurrentStreak = 15;
            } else if (updatedCurrentStreak === 15) {
              updatedCurrentStreak = 30;
            }
          } else {
            updatedCurrentStreak = 1;
          }

          await userRef.update({
            lastLoggedIn: now,
            currentStreak: updatedCurrentStreak,
            highestStreak: updatedHighestStreak,
          });

          // Log the updated user data
          console.log("Updated User Data:", {
            lastLoggedIn: now,
            currentStreak: updatedCurrentStreak,
            highestStreak: updatedHighestStreak,
          });
        }
      }
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>
      <div className="authentication-box authentication-box-login">
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="authentication-button" onClick={handleSubmit}>
          Login
        </div>
        <div className="authentication-options">
          <div>Not A User?</div>
          <div
            onClick={() => {
              setIsUserRegistered(false), setAuthenticationBoxOpen(true);
            }}
            className="authentication-switch"
          >
            Register
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
