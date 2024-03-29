import React, { useState, useEffect, useContext, useRef } from "react";
import {
  IconAlignLeft,
  IconAlignJustified,
  IconChevronDown,
  IconChevronUp,
  IconUser,
} from "@tabler/icons-react";
import "./Navbar.css";
import DarkModeToggle from "./DarkModeToggle";
import Search from "./Search";
import LoginButton from "./LoginButton";
import User from "./User";
import Notification from "./Notification";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import FaceCreator from "../util/FaceCreator";

const Navbar = ({
  setIsLeftPaneOpen,
  isLeftPaneOpen,
  isMobileViewport,
  ProfilePic,
  darkMode,
  setDarkMode,
  setCurrentStreak,
  setHighestStreak,
  setTargetStreak,
  authenticationBoxOpen,
  setAuthenticationBoxOpen,
  browserWindowWidth,
  leftPaneContainerWidth,
  isUserRegistered,
  setIsUserRegistered,
  searchQuery,
  setSearchQuery,
  searchUsersInfoOpen,
  setSearchUsersInfoOpen,
  user,
  setUser,
  searchOpen,
  setSearchOpen,
}) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [searchBarWidth, setSearchBarWidth] = useState(0);
  const [openNotif, setOpenNotif] = useState(false);

  const { userDoc, currentUser } = useContext(AuthContext);
  const currentUserRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsAtTop(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (currentUserRef.current) {
      const currentUserWidth =
        currentUserRef.current.getBoundingClientRect().width;
      const calculatedSearchBarWidth =
        browserWindowWidth < 768
          ? browserWindowWidth - leftPaneContainerWidth - currentUserWidth - 30
          : browserWindowWidth -
            leftPaneContainerWidth -
            currentUserWidth -
            230;
      setSearchBarWidth(calculatedSearchBarWidth);
    }
  }, [browserWindowWidth, leftPaneContainerWidth, currentUserRef]);

  // useEffect(() => {
  //   console.log("search bar width", searchBarWidth);
  // }, [searchBarWidth]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const acceptRequest = async (id, photoURL, displayName, avatar) => {
    try {
      const updatedPendingRequests = userDoc.pendingRequests.filter(
        (request) => request.id !== id
      );

      console.log("updatedPendingRequests", updatedPendingRequests);

      console.log(userDoc.friends);

      const updatedFriends = [
        ...userDoc.friends,
        {
          id: id,
          photoURL: photoURL,
          displayName: displayName,
          avatar: avatar,
        },
      ];

      console.log("type of currentUser.uid", typeof currentUser.uid);

      await updateDoc(doc(db, "users", currentUser.uid), {
        pendingRequests: updatedPendingRequests,
        friends: updatedFriends,
      });

      const senderDoc = await getDoc(doc(db, "users", id));

      if (senderDoc.exists()) {
        const senderData = senderDoc.data();
        const updatedSentRequests = senderData.sentRequests.filter(
          (request) => request.id !== currentUser.uid
        );

        const updatedSenderFriends = [
          ...senderData.friends,
          {
            id: userDoc.uid,
            photoURL: userDoc.photoURL,
            displayName: userDoc.displayName,
            avatar: userDoc.avatar,
          },
        ];

        await updateDoc(doc(db, "users", id), {
          sentRequests: updatedSentRequests,
          friends: updatedSenderFriends,
        });
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      const updatedPendingRequests = userDoc.pendingRequests.filter(
        (request) => request.id !== id
      );

      await updateDoc(doc(db, "users", currentUser.uid), {
        pendingRequests: updatedPendingRequests,
      });

      const senderDoc = await getDoc(doc(db, "users", id));
      if (senderDoc.exists()) {
        const senderData = senderDoc.data();
        const updatedSentRequests = senderData.sentRequests.filter(
          (request) => request.id !== currentUser.uid
        );

        await updateDoc(doc(db, "users", id), {
          sentRequests: updatedSentRequests,
        });
      }
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  useEffect(() => {
    if (authenticationBoxOpen === true && openNotif === true) {
      setOpenNotif(false);
    }
  }, [authenticationBoxOpen]);

  return (
    <div className="navbar">
      <div
        className="leftpane-open-close-button"
        onClick={() => {
          setIsLeftPaneOpen(!isLeftPaneOpen);
        }}
      >
        {isLeftPaneOpen ? <IconAlignJustified /> : <IconAlignLeft />}
      </div>
      <div className="content-user-top-right-options">
        <div>
          <Search
            searchBarWidth={searchBarWidth}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            setOpenNotif={setOpenNotif}
            searchUsersInfoOpen={searchUsersInfoOpen}
            setSearchUsersInfoOpen={setSearchUsersInfoOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            acceptRequest={acceptRequest}
            rejectRequest={rejectRequest}
            user={user}
            setUser={setUser}
          />
        </div>
        {(browserWindowWidth >= 768 || !searchOpen) && (
          <>
            <div>
              <Notification
                openNotif={openNotif}
                setOpenNotif={setOpenNotif}
                setSearchOpen={setSearchOpen}
                setSearchUsersInfoOpen={setSearchUsersInfoOpen}
                setSearchQuery={setSearchQuery}
                acceptRequest={acceptRequest}
                rejectRequest={rejectRequest}
                setAuthenticationBoxOpen={setAuthenticationBoxOpen}
                authenticationBoxOpen={authenticationBoxOpen}
              />
            </div>
            <div>
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            <div
              className="current-user"
              ref={currentUserRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* <img src={ProfilePic} /> */}
              {userDoc === null ? (
                <IconUser />
              ) : userDoc.photoURL !== "" ? (
                <img
                  src={currentUser.photoURL}
                  alt=""
                  style={{ overflow: "hidden" }}
                />
              ) : (
                <FaceCreator {...userDoc.avatar} height={30} width={30} />
              )}
              {!isMobileViewport && (isAtTop || isHovered) && (
                <div className="display-name">
                  {currentUser && currentUser.displayName
                    ? currentUser.displayName
                    : "Guest"}
                </div>
              )}
              <div
                onClick={() => {
                  setAuthenticationBoxOpen(!authenticationBoxOpen);
                }}
              >
                {!authenticationBoxOpen ? (
                  <IconChevronDown style={{ cursor: "pointer" }} />
                ) : (
                  <IconChevronUp style={{ cursor: "pointer" }} />
                )}
              </div>

              {authenticationBoxOpen &&
                (currentUser ? (
                  <User
                    setCurrentStreak={setCurrentStreak}
                    setHighestStreak={setHighestStreak}
                    setTargetStreak={setTargetStreak}
                    setUser={setUser}
                    setSearchQuery={setSearchQuery}
                    setSearchOpen={setSearchOpen}
                  />
                ) : (
                  <LoginButton
                    setAuthenticationBoxOpen={setAuthenticationBoxOpen}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
