import React from "react";
import { useNavigate } from "react-router-dom";
import FaceCreator from "../util/FaceCreator";

const LoginButton = ({ setAuthenticationBoxOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="authentication-box authentication-box-login">
        <FaceCreator classText="authentication-box-svg" height={100} />
        <div>Guest</div>
        <div
          className="authentication-button"
          onClick={() => navigate("/login")}
        >
          Login?
        </div>
      </div>
    </>
  );
};

export default LoginButton;
