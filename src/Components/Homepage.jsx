import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle, FcLike } from "react-icons/fc";

import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";

import "../styling/home.css";

const Homepage = () => {
  const isSignedIn = useSelector(selectSignedIn);
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      dispatch(setSignedIn(true));
      dispatch(setUserData(codeResponse.profileObj));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div className="home__page">
      {!isSignedIn ? (
        <div className="login__message">
          <h2>📗</h2>
          <h1>
            Reader's Delight{" "}
            <span className="heart">
              <FcLike className="heart1" />
            </span>
          </h1>
          <p>
            We provide high quality online resource for reading blogs. Just sign
            up and start reading some quality blogs.
          </p>
          <div>
            <button type="button" onClick={() => login()}>
              <FcGoogle />
              SignIn With Google
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Homepage;
