import { useState } from "react";
import "./Signup.scss";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  return (
    <div className="signup-container">
      <div className="header">
        <span>Already have an account?</span>
        <button>Log in</button>
      </div>
      <div className="title col-4 mx-auto">Typeform</div>
      <div className="content col-4 mx-auto">
        Get better data with conversational forms, surveys, quizzes & more.
      </div>
      <div className="form-group col-4 mx-auto">
        <label>Email (*)</label>
        <input
          className="form-control"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label>Password (*)</label>
        <input
          className="form-control"
          type={password}
          value={password}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.password)}
        ></input>
        <label>Username</label>
        <input
          className="form-control"
          type="username"
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <button>Create my free account</button>
      </div>
    </div>
  );
};
export default Signup;
