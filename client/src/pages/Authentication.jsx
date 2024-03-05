import React, { useState, useEffect } from "react";
import "./Authentication.css";
import { IconUserScan } from "@tabler/icons-react";
import DefaultProfilePic from "../assets/DefaultProfilePic.jpg";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import FaceCreator from "../util/FaceCreator";

const Authentication = ({
  type,
  setCurrentStreak,
  setHighestStreak,
  setTargetStreak,
  setAuthenticationBoxOpen,
}) => {
  useEffect(() => {
    setAuthenticationBoxOpen(false);
  }, []);
  const [err, setErr] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const avatarSettings = {
  //   height: 300,
  //   width: 300,
  //   hair: 6, //From 0 to 9
  //   hairFill: "#000000",
  //   hairStroke: "#1C1C1C",
  //   skinBorder: "#000000",
  //   skinColor: "#755243",
  //   shirt: 4, //From 0 to 7
  //   shirtFill: "#AE3737",
  //   shirtStroke: "#321A1A",
  //   shirtDesign: "grey",
  //   mouth: 2, //From 0 to 6
  //   mouthFill: "#ff2993",
  //   nose: 1, //From 0 to 7
  //   eye: 1, //From 0 to 4
  //   eyebrow: 1, //From 0 to 5
  //   accessory: 0, //From 0 to 3
  //   accessoryStroke: "#7608fe",
  // };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (type === "Register") {
      try {
        console.log("enter ", type);
        const res = await createUserWithEmailAndPassword(auth, email, password);

        let downloadURL = DefaultProfilePic;

        const date = new Date().getTime();

        if (avatarFile) {
          const storageRef = ref(storage, `${displayName + date}`);

          const metadata = {
            contentType: avatarFile.type,
          };

          await uploadBytesResumable(storageRef, avatarFile, metadata).then(
            async () => {
              downloadURL = await getDownloadURL(storageRef);
            }
          );
        }

        await updateProfile(res.user, {
          displayName,
          photoURL: downloadURL,
        });

        setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          photoURL: downloadURL,
          lastLoggedIn: date,
          currentStreak: 1,
          highestStreak: 1,
          targetStreak: 7,
          pendingRequests: [],
          sentRequests: [],
          friends: [],
        }).then(() => {
          navigate("/");
        });

        await setDoc(doc(db, "userChats", res.user.uid), {});

        setCurrentStreak(1);
        setHighestStreak(1);
        setTargetStreak(7);
      } catch (err) {
        console.log(err);
        setErr(true);
      } finally {
        setLoading(false);
      }
    } else if (type === "Login") {
      console.log("enter ", type);
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

          // console.log("Current Streak", userData.currentStreak);
          // console.log("Target Streak", userData.targetStreak);
          // console.log("Max Streak", userData.highestStreak);

          const lastLoggedIn = userData.lastLoggedIn;

          const currentLoggedInTime = new Date().getTime();

          // console.log("Current Logged In", currentLoggedInTime);

          function isNextDay(timestamp1, timestamp2) {
            const date1 = new Date(timestamp1);
            const date2 = new Date(timestamp2);
            // console.log("date1", date1);
            // console.log("date2", date2);

            const day1 = date1.getDate();
            const day2 = date2.getDate();
            // console.log("day1", day1);
            // console.log("day2", day2);

            function getLastDayOfMonth(dateString) {
              const date = new Date(dateString);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const lastDay = new Date(year, month, 0).getDate();
              return lastDay;
            }

            console.log(date1);
            console.log("Last date of the month", getLastDayOfMonth(date1));

            if (day2 === day1) {
              console.log("Same day");
              return 0;
            } else if (
              day2 === day1 + 1 ||
              (day1 === getLastDayOfMonth(date1) && day2 === 1)
            ) {
              console.log("Next day");
              return 1;
            }
            console.log("Not next day");
            return -1;
          }

          const isNxtDay = isNextDay(lastLoggedIn, currentLoggedInTime);
          console.log("isNxtDay", isNxtDay);

          const newCurrentStreak =
            isNxtDay === 1
              ? userData.currentStreak + 1
              : isNxtDay === 0
              ? userData.currentStreak
              : 1;

          console.log("newCurrentStreak", newCurrentStreak);
          const maxStreak = Math.max(newCurrentStreak, userData.highestStreak);

          console.log("Max Streak", maxStreak);

          let newTargetStreak = userData.targetStreak;

          console.log("userData.currentStreak", userData.currentStreak);

          if (userData.currentStreak < 7) {
            newTargetStreak = 7;
          } else if (userData.currentStreak < 15) {
            newTargetStreak = 15;
          } else if (userData.currentStreak < 30) {
            newTargetStreak = 30;
          } else if (userData.currentStreak < 60) {
            newTargetStreak = 60;
          }

          // console.log("newTargetStreak", newTargetStreak);

          setCurrentStreak(newCurrentStreak);
          setTargetStreak(newTargetStreak);
          setHighestStreak(maxStreak);

          updateDoc(doc(db, "users", userData.uid), {
            lastLoggedIn: currentLoggedInTime,
            currentStreak: newCurrentStreak,
            highestStreak: maxStreak,
            targetStreak: newTargetStreak,
          }).then(() => {
            navigate("/");
          });
        } else {
          console.log("User data not found.");
        }
      } catch (err) {
        setErr(true);
      }
    }
  };

  return (
    <div className="authentication-container">
      {type === "Register" && (
        <input
          type="text"
          value={displayName}
          placeholder="Username"
          onChange={(e) => {
            const inputValue = e.target.value;
            const filteredValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");
            setDisplayName(filteredValue);
          }}
        />
      )}
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {type === "Register" && (
        <>
          {/* <FaceCreator {...avatarSettings} /> */}
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
          <label
            htmlFor="file"
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              gap: "3px",
            }}
          >
            <IconUserScan />{" "}
            <span style={{ transform: "translateY(3px)" }}>
              {!avatarFile ? "Add an avatar" : "Change avatar?"}
            </span>
          </label>
        </>
      )}
      <div className="authentication-button" onClick={handleSubmit}>
        {type}
      </div>
      <div className="authentication-options">
        {type === "Register" ? (
          <>
            <div>Already A User?</div>
            {loading ? (
              "Loading"
            ) : (
              <div
                onClick={() => navigate("/login")}
                className="authentication-switch"
              >
                Login
              </div>
            )}
          </>
        ) : (
          <>
            <div>Not A User?</div>
            <div
              onClick={() => navigate("/register")}
              className="authentication-switch"
            >
              Register
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Authentication;
