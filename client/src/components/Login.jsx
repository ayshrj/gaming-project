import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

const Login = ({
  setIsUserRegistered,
  setAuthenticationBoxOpen,
  setCurrentStreak,
  setHighestStreak,
  setTargetStreak,
}) => {
  const [err, setErr] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user data from Firestore using UID
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // console.log("User Data:", userData);

        console.log("Current Streak", userData.currentStreak);
        console.log("Target Streak", userData.targetStreak);
        console.log("Max Streak", userData.highestStreak);

        const lastLoggedIn = new Date(userData.lastLoggedIn);

        console.log("Last Logged In", lastLoggedIn);

        const currentLoggedInTime = new Date().getTime();

        console.log("Current Logged In", currentLoggedInTime);

        function isNextDay(timestamp1, timestamp2) {
          const date1 = new Date(timestamp1);
          const date2 = new Date(timestamp2);

          const day1 = date1.getDate();
          const day2 = date2.getDate();

          if (day2 === day1) return 0;
          else if (
            day2 === day1 + 1 ||
            (day1 === getLastDayOfMonth(date1) && day2 === 1)
          ) {
            return 1;
          }
          return -1;
        }

        console.log(
          "Is it the next day or not",
          isNextDay(lastLoggedIn, currentLoggedInTime)
        );

        const newCurrentStreak =
          isNextDay(lastLoggedIn, currentLoggedInTime) === 1
            ? userData.currentStreak + 1
            : isNextDay(lastLoggedIn, currentLoggedInTime) === 0
            ? newCurrentStreak
            : 1;

        const maxStreak = Math.max(newCurrentStreak, userData.highestStreak);

        console.log("Max Streak", maxStreak);

        let newTargetStreak = userData.targetStreak;

        if (newTargetStreak === 7) {
          newTargetStreak = 15;
        } else if (newTargetStreak === 15) {
          newTargetStreak = 30;
        } else if (newTargetStreak === 60) {
          newTargetStreak = 60;
        }

        setCurrentStreak(newCurrentStreak);
        setTargetStreak(newTargetStreak);
        setHighestStreak(maxStreak);
        setAuthenticationBoxOpen(false);

        updateDoc(doc(db, "users", userData.uid), {
          lastLoggedIn: currentLoggedInTime,
          currentStreak: newCurrentStreak,
          highestStreak: maxStreak,
          targetStreak: newTargetStreak,
        });
      } else {
        console.log("User data not found.");
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
