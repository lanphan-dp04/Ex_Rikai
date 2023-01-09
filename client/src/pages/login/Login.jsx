import { axiosClient } from "../../configAxios";
import { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";
import { validateEmail } from "../../helpers/helpers";

export default function Login() {
  const navigate = useHistory();
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);
  const [isValidateEmail, setIsValidateEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosClient.post("/auth/login", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      setError(false);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(res.data.role);
      switch (res.data.role) {
        case 'admin':
          navigate.push("/admin");
          break;
       
        default:
          navigate.push("/");
      }
      
    } catch (err) {
      console.log(err);
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  const handleValidateEmail = (email) => {
    if (validateEmail(email) === null) {
      setIsValidateEmail(true);
    } else {
      setIsValidateEmail(false);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong!
          </span>
        )}
        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your email..."
          ref={userRef}
          onChange={(e) => handleValidateEmail(e.target.value)}
        />
        {isValidateEmail && <p className="warning">Wrong format email</p>}
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
