import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import DefaultProfilePic from "../assets/DefaultProfilePic.jpg";
import { IconUserScan } from "@tabler/icons-react";

const Register = ({ setIsUserRegistered, setAuthenticationBoxOpen }) => {
  const [err, setErr] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      let downloadURL = DefaultProfilePic;

      const date = new Date().getTime();

      if (avatarFile) {
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(async () => {
          downloadURL = await getDownloadURL(storageRef);
        });
      }

      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
        lastLoggedIn: date,
        currentStreak: 1,
        highestStreak: 1,
        targetStreak: 7,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
    } catch (err) {
      console.log(err);
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="authentication-box authentication-box-register">
        <input
          placeholder="Username"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={(e) => setAvatarFile(e.target.files[0])} // Update file state on change
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
          <IconUserScan />
          <span style={{ transform: "translateY(3px)" }}>
            {!avatarFile ? "Add an avatar" : "Change avatar?"}
          </span>
        </label>
        <div className="authentication-button" onClick={handleSubmit}>
          Register
        </div>
        <div className="authentication-options">
          <div>Already A User?</div>
          {loading ? (
            "Loading"
          ) : (
            <div
              onClick={() => {
                setIsUserRegistered(true), setAuthenticationBoxOpen(true);
              }}
              className="authentication-switch"
            >
              Login
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
