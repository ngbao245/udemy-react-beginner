import { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Log in</div>
        <div className="text">Email or UserName</div>
        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="input-password">
          <input
            type={isShowPassword === true ? "password" : "text"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <i
            className={
              isShowPassword === true ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} 
              onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>
        <button
          type="button"
          className={email && password ? "" : "empty"}
          disabled={!(email && password)}
          onClick={() => {
            console.log("Email: ", email, " Password: ", password);
          }}
        >
          Log in
        </button>
        <div className="back">
          <i className="fa-solid fa-angle-left"></i>
          <span> Go Back</span>
        </div>
      </div>
    </>
  );
};

export default Login;
