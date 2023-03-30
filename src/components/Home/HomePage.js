import videoHomepage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <h1 className="title1">{t("homepage.title1")}</h1>
        <p className="title2">{t("homepage.title2")}</p>
        <div className="title3">
          {isAuthenticated === false ? (
            <button
              className="login"
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("homepage.title3.login")}
            </button>
          ) : (
            <button
              className="user"
              onClick={() => {
                navigate("/users");
              }}
            >
              {t("homepage.title3.user")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
