import { axiosClient } from "../../configAxios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { validateEmail } from "../../helpers/helpers";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passMatch, setPassMatch] = useState(true);
  const [validateUsername, setValidateUsername] = useState(true);
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(false);
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    validatePassword();
    if (validateUsername === true && passMatch === true) {
      setError(false);
      setValidateConfirmPassword(false);
      try {
        const res = await axiosClient.post("/auth/register", {
          username,
          email,
          password,
        });
        res.data && window.location.replace("/login");
      } catch (err) {
        setError(true);
      }
    } else {
      setValidateConfirmPassword(true);
    }
  };
  useEffect(() => {
    validatePassword();
  }, [confirmPassword, password]);

  const isPassword = () => {
    switch (passMatch) {
      case false:
        return "wrong-password";
      default:
        return "";
    }
  };

  const isValidateUsername = (username) => {
    if (username.length < 30) {
      setUsername(username);
      setValidateUsername(true);
    } else {
      setValidateUsername(false);
    }
  };
  const handleValidateEmail = (email) => {
    if (validateEmail(email) === null) {
      setIsValidateEmail(true);
    } else {
      setEmail(email);
      setIsValidateEmail(false);
    }
  };
  
  const validatePassword = () => {
    password === confirmPassword ? setPassMatch(true) : setPassMatch(false);
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>User name</label>
        <input
          required
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => isValidateUsername(e.target.value)}
        />
        {!validateUsername && (
          <p className="warning">Username max length 30 char</p>
        )}
        <label>Email</label>
        <input
          required
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => handleValidateEmail(e.target.value)}
        />
        {isValidateEmail && <p className="warning">Wrong format email</p>}

        <label>Password</label>
        <input
          required
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm password</label>
        <input
          required
          type="password"
          className={`registerInput ${isPassword()}`}
          placeholder="Enter confirm password..."
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {validateConfirmPassword && (
          <p className="warning">Confirm wrong password</p>
        )}
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
}
