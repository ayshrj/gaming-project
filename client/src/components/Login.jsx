import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

const Login = ({ setIsUserRegistered, setAuthenticationBoxOpen }) => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = db.collection("users").doc(res.user.uid);
      const userData = (await userDocRef.get()).data();

      const currentDate = new Date().getTime();
      const lastLoggedInDate = userData.lastLoggedIn;
      const oneDay = 24 * 60 * 60 * 1000;

      let { currentStreak, highestStreak } = userData;
      let targetStreak = userData.targetStreak;

      if (currentDate - lastLoggedInDate >= oneDay) {
        // Check if lastLoggedIn is a day before
        if (currentDate - lastLoggedInDate === oneDay) {
          // Increment currentStreak by 1 if lastLoggedIn is a day before
          currentStreak += 1;
        } else {
          // Set currentStreak to 1 if lastLoggedIn is not a day before
          currentStreak = 1;
        }
      }

      // Update highestStreak
      highestStreak = Math.max(currentStreak, highestStreak);

      // Update targetStreak based on currentStreak
      if (currentStreak === 7) {
        targetStreak = 15;
      } else if (currentStreak === 15) {
        targetStreak = 30;
      }

      // Update lastLoggedIn to current time
      await userDocRef.update({
        lastLoggedIn: currentDate,
        currentStreak,
        highestStreak,
        targetStreak,
      });
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
        <div className="authentication-button" onClick={handleLogin}>
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
