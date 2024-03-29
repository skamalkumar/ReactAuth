import { GiHappySkull } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import React, { useState } from "react";
import { FcCamcorder } from "react-icons/fc";
import { googleLogout } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setSearchInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";

import "../styling/navbar.css";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("sports");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  const logout = (response) => {
    googleLogout();
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(inputValue));
  };

  return (
    <div className="navbar">
      <h1 className="navbar__header">
        Blog-O-Megaly <GiHappySkull className="skull" />
      </h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Search your favorite blog..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick}>
            Search
          </button>
        </div>
      )}

      {isSignedIn ? (
        <div className="navbar__user__data">
          <RxAvatar
            className="user"
            src={userData?.imageUrl}
            alt={userData?.name}
          />
          <h1 className="signedIn">{userData?.givenName}</h1>

          <button onClick={logout} className="logout__button">
            Logout 😦
          </button>
        </div>
      ) : (
        <h1 className="notSignedIn">
          LogIn Below For A Fantastic Blog Journey
          <FcCamcorder className="cam" />
        </h1>
      )}
    </div>
  );
};

export default Navbar;
