import { useEffect, useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginRedux } from "../redux/actions/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);

  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (account && account.auth === true) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleLogin = async () => {
    if (!(email && password)) {
      toast.error("Email and Password are required!");
      return;
    }
    dispatch(handleLoginRedux(email, password));
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Log in</div>
        <div className="text">Email or UserName ( eve.holt@reqres.in )</div>
        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onKeyDown={(event) => handlePressEnter(event)}
        />
        <div className="input-password">
          <input
            type={isShowPassword === true ? "password" : "text"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => handlePressEnter(event)}
          />
          <i
            className={
              isShowPassword === true
                ? "fa-regular fa-eye-slash"
                : "fa-regular fa-eye"
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>
        <button
          type="button"
          className={email && password ? "" : "empty"}
          disabled={!(email && password)}
          onClick={() => handleLogin()}
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Log in"}
        </button>
        <div className="back">
          <i className="fa-solid fa-angle-left"></i>
          <span onClick={() => handleGoBack()}> Go Back</span>
        </div>
      </div>
    </>
  );
};

export default Login;
