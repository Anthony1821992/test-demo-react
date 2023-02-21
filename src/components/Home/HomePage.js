import videoHomepage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <h1>There's a better way to ask</h1>
        <p>
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </p>
        {isAuthenticated === false ? (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Get started - it's free
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/users");
            }}
          >
            Doing Quiz Now
          </button>
        )}
      </div>
    </div>
  );
};
export default HomePage;
