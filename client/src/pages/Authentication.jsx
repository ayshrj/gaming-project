import React, { useState, useEffect } from "react";
import "./Authentication.css";
import { IconUserScan, IconX } from "@tabler/icons-react";
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
  const [photoFile, setPhotoFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [avatarMakerOpen, setAvatarMakerOpen] = useState(false);

  const defaultAvatarSettings = {
    height: 300,
    width: 300,
    hair: 6, //From 0 to 9
    hairFill: "#000000",
    hairStroke: "#1C1C1C",
    skinBorder: "#000000",
    skinColor: "#755243",
    shirt: 4, //From 0 to 7
    shirtFill: "#AE3737",
    shirtStroke: "#321A1A",
    shirtDesign: "grey",
    mouth: 2, //From 0 to 6
    mouthFill: "#ff2993",
    nose: 1, //From 0 to 7
    eye: 1, //From 0 to 4
    eyebrow: 1, //From 0 to 5
    accessory: 0, //From 0 to 3
    accessoryStroke: "#7608fe",
  };

  const [avatarSettings, setAvatarSettings] = useState(defaultAvatarSettings);
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
  const [avatarSettingsAdded, setAvatarSettingsAdded] = useState(false);
  const navigate = useNavigate();

  const handleSettingsChange = (key, value) => {
    setAvatarSettings({ ...avatarSettings, [key]: value });
  };

  const handleSubmit = async () => {
    if (type === "Register") {
      try {
        console.log("enter ", type);
        const res = await createUserWithEmailAndPassword(auth, email, password);

        let downloadURL = "";

        const date = new Date().getTime();

        if (photoFile) {
          const storageRef = ref(storage, `${displayName + date}`);

          const metadata = {
            contentType: photoFile.type,
          };

          await uploadBytesResumable(storageRef, photoFile, metadata).then(
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
          avatar: avatarSettings,
          highscore: {
            driverLicense: 0,
            tetris: 0,
            snakeGame: 0,
            rps: 0,
          },
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
      <div
        className="authentication-page-logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <svg
          className="icon-no-can-do-path"
          width="80px"
          height="80px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.65 5.71875H7.35C4.4 5.71875 2 8.11875 2 11.0687V16.6488C2 19.5988 4.4 21.9988 7.35 21.9988H16.65C19.6 21.9988 22 19.5988 22 16.6488V11.0687C22 8.11875 19.6 5.71875 16.65 5.71875ZM14.5 12.0188C14.5 11.4688 14.95 11.0188 15.5 11.0188C16.05 11.0188 16.5 11.4688 16.5 12.0188C16.5 12.5688 16.05 13.0287 15.5 13.0287C14.95 13.0287 14.5 12.5888 14.5 12.0388V12.0188ZM10.13 16.0688C9.98 16.2188 9.79 16.2888 9.6 16.2888C9.41 16.2888 9.22 16.2188 9.07 16.0688L8.04 15.0387L7.05 16.0288C6.9 16.1788 6.71 16.2488 6.52 16.2488C6.33 16.2488 6.14 16.1788 5.99 16.0288C5.7 15.7388 5.7 15.2587 5.99 14.9688L6.98 13.9788L6.02 13.0188C5.73 12.7288 5.73 12.2488 6.02 11.9588C6.31 11.6688 6.79 11.6688 7.08 11.9588L8.04 12.9188L9.03 11.9288C9.32 11.6388 9.8 11.6388 10.09 11.9288C10.38 12.2188 10.38 12.6988 10.09 12.9887L9.1 13.9788L10.13 15.0088C10.42 15.2988 10.42 15.7788 10.13 16.0688ZM13.54 14.9988C12.99 14.9988 12.53 14.5488 12.53 13.9988C12.53 13.4488 12.97 12.9988 13.52 12.9988H13.54C14.09 12.9988 14.54 13.4488 14.54 13.9988C14.54 14.5488 14.1 14.9988 13.54 14.9988ZM15.5 16.9688C14.95 16.9688 14.5 16.5288 14.5 15.9788V15.9587C14.5 15.4087 14.95 14.9587 15.5 14.9587C16.05 14.9587 16.5 15.4087 16.5 15.9587C16.5 16.5087 16.06 16.9688 15.5 16.9688ZM17.48 14.9988C16.93 14.9988 16.47 14.5488 16.47 13.9988C16.47 13.4488 16.91 12.9988 17.46 12.9988H17.48C18.03 12.9988 18.48 13.4488 18.48 13.9988C18.48 14.5488 18.04 14.9988 17.48 14.9988Z" />
          <path d="M13.6394 2.71L13.6294 3.65C13.6194 4.53 12.8894 5.26 11.9994 5.26C11.8494 5.26 11.7594 5.36 11.7594 5.49C11.7594 5.62 11.8594 5.72 11.9894 5.72H10.3794C10.3694 5.65 10.3594 5.57 10.3594 5.49C10.3594 4.59 11.0894 3.86 11.9794 3.86C12.1294 3.86 12.2294 3.76 12.2294 3.63L12.2394 2.69C12.2494 2.31 12.5594 2 12.9394 2H12.9494C13.3394 2 13.6394 2.32 13.6394 2.71Z" />
        </svg>
        <div>NoCanDo</div>
      </div>
      {avatarMakerOpen ? (
        <div className="avatar-maker-container">
          <div className="avatar-maker-svg-container">
            <div
              className="authentication-page-logo"
              onClick={() => {
                navigate("/");
              }}
            >
              <svg
                className="icon-no-can-do-path"
                width="80px"
                height="80px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.65 5.71875H7.35C4.4 5.71875 2 8.11875 2 11.0687V16.6488C2 19.5988 4.4 21.9988 7.35 21.9988H16.65C19.6 21.9988 22 19.5988 22 16.6488V11.0687C22 8.11875 19.6 5.71875 16.65 5.71875ZM14.5 12.0188C14.5 11.4688 14.95 11.0188 15.5 11.0188C16.05 11.0188 16.5 11.4688 16.5 12.0188C16.5 12.5688 16.05 13.0287 15.5 13.0287C14.95 13.0287 14.5 12.5888 14.5 12.0388V12.0188ZM10.13 16.0688C9.98 16.2188 9.79 16.2888 9.6 16.2888C9.41 16.2888 9.22 16.2188 9.07 16.0688L8.04 15.0387L7.05 16.0288C6.9 16.1788 6.71 16.2488 6.52 16.2488C6.33 16.2488 6.14 16.1788 5.99 16.0288C5.7 15.7388 5.7 15.2587 5.99 14.9688L6.98 13.9788L6.02 13.0188C5.73 12.7288 5.73 12.2488 6.02 11.9588C6.31 11.6688 6.79 11.6688 7.08 11.9588L8.04 12.9188L9.03 11.9288C9.32 11.6388 9.8 11.6388 10.09 11.9288C10.38 12.2188 10.38 12.6988 10.09 12.9887L9.1 13.9788L10.13 15.0088C10.42 15.2988 10.42 15.7788 10.13 16.0688ZM13.54 14.9988C12.99 14.9988 12.53 14.5488 12.53 13.9988C12.53 13.4488 12.97 12.9988 13.52 12.9988H13.54C14.09 12.9988 14.54 13.4488 14.54 13.9988C14.54 14.5488 14.1 14.9988 13.54 14.9988ZM15.5 16.9688C14.95 16.9688 14.5 16.5288 14.5 15.9788V15.9587C14.5 15.4087 14.95 14.9587 15.5 14.9587C16.05 14.9587 16.5 15.4087 16.5 15.9587C16.5 16.5087 16.06 16.9688 15.5 16.9688ZM17.48 14.9988C16.93 14.9988 16.47 14.5488 16.47 13.9988C16.47 13.4488 16.91 12.9988 17.46 12.9988H17.48C18.03 12.9988 18.48 13.4488 18.48 13.9988C18.48 14.5488 18.04 14.9988 17.48 14.9988Z" />
                <path d="M13.6394 2.71L13.6294 3.65C13.6194 4.53 12.8894 5.26 11.9994 5.26C11.8494 5.26 11.7594 5.36 11.7594 5.49C11.7594 5.62 11.8594 5.72 11.9894 5.72H10.3794C10.3694 5.65 10.3594 5.57 10.3594 5.49C10.3594 4.59 11.0894 3.86 11.9794 3.86C12.1294 3.86 12.2294 3.76 12.2294 3.63L12.2394 2.69C12.2494 2.31 12.5594 2 12.9394 2H12.9494C13.3394 2 13.6394 2.32 13.6394 2.71Z" />
              </svg>
              <div>NoCanDo</div>
            </div>

            <div className="avatar-maker-svg">
              <FaceCreator {...avatarSettings} />
            </div>
            <div className="avatar-maker-save-button">
              <div
                onClick={() => {
                  setAvatarSettingsAdded(true);
                  setAvatarMakerOpen(false);
                }}
              >
                Save
              </div>
              <div
                onClick={() => {
                  setAvatarSettings(defaultAvatarSettings);
                  setAvatarMakerOpen(false);
                }}
              >
                Exit
              </div>
            </div>
          </div>
          <div className="avatar-maker-settings-container">
            <div className="avatar-maker-setting">
              <label>Hair</label>
              <input
                type="range"
                min={0}
                max={9}
                value={avatarSettings.hair}
                onChange={(e) =>
                  handleSettingsChange("hair", parseInt(e.target.value))
                }
              />
            </div>

            <div className="avatar-maker-setting">
              <label>Hair Outline</label>
              <input
                type="color"
                value={avatarSettings.hairStroke}
                onChange={(e) =>
                  handleSettingsChange("hairStroke", e.target.value)
                }
              />
            </div>

            <div className="avatar-maker-setting">
              <label>Hair Color</label>
              <input
                type="color"
                value={avatarSettings.hairFill}
                onChange={(e) =>
                  handleSettingsChange("hairFill", e.target.value)
                }
              />
            </div>

            <div className="avatar-maker-setting">
              <label>Skin Color</label>
              <input
                type="color"
                value={avatarSettings.skinColor}
                onChange={(e) => {
                  handleSettingsChange("skinColor", e.target.value);
                }}
              />
            </div>

            <div className="avatar-maker-setting">
              <label>Nose</label>
              <input
                type="range"
                min={0}
                max={7}
                value={avatarSettings.nose}
                onChange={(e) =>
                  handleSettingsChange("nose", parseInt(e.target.value))
                }
              />
            </div>

            <div className="avatar-maker-setting">
              <label>Mouth</label>
              <input
                type="range"
                min={0}
                max={6}
                value={avatarSettings.mouth}
                onChange={(e) =>
                  handleSettingsChange("mouth", parseInt(e.target.value))
                }
              />
            </div>

            {(avatarSettings.mouth === 3 ||
              avatarSettings.mouth === 4 ||
              avatarSettings.mouth === 5) && (
              <div className="avatar-maker-setting">
                <label>Mouth Color</label>
                <input
                  type="color"
                  value={avatarSettings.mouthFill}
                  onChange={(e) => {
                    handleSettingsChange("mouthFill", e.target.value);
                  }}
                />
              </div>
            )}

            <div className="avatar-maker-setting">
              <label>Eyebrow</label>
              <input
                type="range"
                min={0}
                max={5}
                value={avatarSettings.eyebrow}
                onChange={(e) =>
                  handleSettingsChange("eyebrow", parseInt(e.target.value))
                }
              />
            </div>

            <div className="avatar-maker-setting">
              <label>Eye</label>
              <input
                type="range"
                min={0}
                max={4}
                value={avatarSettings.eye}
                onChange={(e) =>
                  handleSettingsChange("eye", parseInt(e.target.value))
                }
              />
            </div>

            <div className="avatar-maker-setting">
              <label>Cloth</label>
              <input
                type="range"
                min={1}
                max={7}
                value={avatarSettings.shirt}
                onChange={(e) =>
                  handleSettingsChange("shirt", parseInt(e.target.value))
                }
              />
            </div>

            <div className="avatar-maker-setting">
              <label>Shirt Color</label>
              <input
                type="color"
                value={avatarSettings.shirtFill}
                onChange={(e) => {
                  handleSettingsChange("shirtFill", e.target.value);
                }}
              />
            </div>

            <div className="avatar-maker-setting">
              <label>Shirt Outline</label>
              <input
                type="color"
                value={avatarSettings.shirtStroke}
                onChange={(e) => {
                  handleSettingsChange("shirtStroke", e.target.value);
                }}
              />
            </div>

            {(avatarSettings.shirt === 1 || avatarSettings.shirt === 5) && (
              <div className="avatar-maker-setting">
                <label>Shirt Design</label>
                <input
                  type="color"
                  value={avatarSettings.shirtDesign}
                  onChange={(e) => {
                    handleSettingsChange("shirtDesign", e.target.value);
                  }}
                />
              </div>
            )}

            <div className="avatar-maker-setting">
              <label>Accessory</label>
              <input
                type="range"
                min={0}
                max={3}
                value={avatarSettings.accessory}
                onChange={(e) =>
                  handleSettingsChange("accessory", parseInt(e.target.value))
                }
              />
            </div>

            {avatarSettings.accessory !== 0 && (
              <div className="avatar-maker-setting">
                <label>Accessory Color</label>
                <input
                  type="color"
                  value={avatarSettings.accessoryStroke}
                  onChange={(e) => {
                    handleSettingsChange("accessoryStroke", e.target.value);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
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
              {photoFile === null && (
                <div className="authentication-avatar-creator-container">
                  <div
                    className="authentication-avatar-creator"
                    onClick={() => {
                      setAvatarMakerOpen(true);
                      console.log(avatarMakerOpen);
                    }}
                  >
                    {avatarSettingsAdded ? (
                      <div className="avatar-added">
                        <FaceCreator
                          {...avatarSettings}
                          height={60}
                          width={60}
                        />
                      </div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="currentColor"
                          d="M4 8v-2a2 2 0 0 1 2 -2h2"
                        />
                        <path
                          stroke="currentColor"
                          d="M4 16v2a2 2 0 0 0 2 2h2"
                        />
                        <path
                          stroke="currentColor"
                          d="M16 4h2a2 2 0 0 1 2 2v2"
                        />
                        <path
                          stroke="currentColor"
                          d="M16 20h2a2 2 0 0 0 2 -2v-2"
                        />
                        <g style={{ transform: "translate(3px, 2px)" }}>
                          <FaceCreator
                            {...avatarSettings}
                            height={17}
                            width={17}
                          />
                        </g>
                      </svg>
                    )}
                    <div>
                      {avatarSettingsAdded
                        ? "Change the avatar?"
                        : "Create an avatar"}
                    </div>
                  </div>
                  {avatarSettingsAdded && (
                    <IconX
                      className="authentication-page-x"
                      color={"rgb(193, 82, 31)"}
                      onClick={() => {
                        setAvatarSettingsAdded(false);
                        setAvatarSettings(defaultAvatarSettings);
                      }}
                      style={{ transform: "translate(2px, 20px)" }}
                    />
                  )}
                </div>
              )}
              {/* <FaceCreator {...avatarSettings} /> */}
              {avatarSettingsAdded === false && photoFile === null && (
                <div>OR</div>
              )}
              {avatarSettingsAdded === false && (
                <div className="authentication-photo-adder">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    onChange={(e) => setPhotoFile(e.target.files[0])}
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
                    {!photoFile ? (
                      <IconUserScan size={80} />
                    ) : (
                      <>
                        <div>
                          <img
                            src={URL.createObjectURL(photoFile)}
                            alt="profile selected"
                          />
                        </div>
                      </>
                    )}

                    <span style={{ transform: "translateY(3px)" }}>
                      {!photoFile ? "Add a photo" : "Change the photo?"}
                    </span>
                  </label>
                  {photoFile && (
                    <IconX
                      className="authentication-page-x"
                      color={"rgb(193, 82, 31)"}
                      onClick={() => {
                        setPhotoFile(null);
                      }}
                    />
                  )}
                </div>
              )}
            </>
          )}
          <div className="authentication-page-button" onClick={handleSubmit}>
            {type}
          </div>
          <div className="authentication-page-options">
            {type === "Register" ? (
              <>
                <div>
                  {"Already A User? "}
                  <span
                    onClick={() => navigate("/login")}
                    className="authentication-page-switch"
                  >
                    Login
                  </span>
                </div>
              </>
            ) : (
              <>
                <div>
                  {"Not A User? "}
                  <span
                    onClick={() => navigate("/register")}
                    className="authentication-page-switch"
                  >
                    Register
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Authentication;
