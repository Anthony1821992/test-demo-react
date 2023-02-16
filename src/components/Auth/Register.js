import { useState } from "react";
import "./Register.scss";
import { postRegister } from "../../services/APIService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Tạo hàm check email có hợp lệ hay không? (website: StackOverFlow)
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    // Validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      // Check điều kiện có nhập password hay không?
      toast.error("Enter password");
      return;
    }

    // APIs
    let data = await postRegister(email, password, username);
    console.log(data);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <div className="register-container">
      <div className="header">
        <span>Already have an account?</span>
        <button onClick={() => navigate("/login")}>Log in</button>
      </div>
      <div className="title col-3 mx-auto">Typeform</div>
      <div className="content col-3 mx-auto">
        Get better data with conversational forms, surveys, quizzes & more.
      </div>
      <div className="form-group col-3 mx-auto">
        <label>Email (*)</label>
        <input
          className="form-control"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label>Password (*)</label>
        <div className="input-group">
          <input
            className="form-control"
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <span
            className="input-group-append"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
        </div>

        <label>Username</label>
        <input
          className="form-control"
          type="username"
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <button
          onClick={() => {
            handleRegister();
          }}
        >
          Create my free account
        </button>
      </div>
    </div>
  );
};
export default Register;
