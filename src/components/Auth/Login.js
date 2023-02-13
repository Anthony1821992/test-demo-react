import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/APIService";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Validate

    //Submit APIs
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    } else {
      toast.error(data.EM);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
        <span>Need help?</span>
      </div>
      <div className="title col-4 mx-auto">Typeform</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot Password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Log in to Typeform
          </button>
        </div>
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            &#60;&#60; Go back to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
