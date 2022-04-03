import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [someError, setSomeError] = useState("");

  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios({
        url: "http://api.nyayashastraacademy.com/v1/user/login/",
        method: "post",
        data: {
          username,
          password,
        },
      });
      localStorage.setItem(
        "auth-token",
        res.data.details.credentials.access_token
      );
      navigate("/home");
    } catch (e) {
      setSomeError("Something went wrong");
    }
  }
  return (
    <div className="login-main">
      {someError && (
        <div style={{ backgroundColor: "red", color: "white" }}>
          {someError}
        </div>
      )}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="username">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className="password">
          <label>password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
          />
        </div>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
