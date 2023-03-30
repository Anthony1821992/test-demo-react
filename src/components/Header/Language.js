import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
import { CircleFlag } from "react-circle-flags";

const Language = (props) => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    console.log(">>>>Check language: ", i18n.language);
  };
  return (
    <>
      <NavDropdown
        title={
          i18n.language === "vi" ? (
            <CircleFlag countryCode="vn" height="35" />
          ) : (
            <CircleFlag countryCode="us" height="35" />
          )
        }
        id="basic-nav-dropdown2"
        className="languages"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          English
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
