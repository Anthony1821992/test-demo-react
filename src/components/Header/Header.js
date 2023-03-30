import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/APIService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";

const Header = () => {
  const account = useSelector((state) => state.user.account);
  console.log(account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // console.log(isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    let res = await logout(account.email, account.refresh_token);
    // console.log(res);
    if (res && res.EC === 0) {
      // clear data redux
      dispatch(doLogout());
      return <Navigate to="/login"></Navigate>;
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavLink to="/" className="navbar-brand">
            AndyWooTr
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
              <NavLink to="/admin" className="nav-link">
                Admin
              </NavLink>
            </Nav>

            <Nav>
              {isAuthenticated === false ? (
                <>
                  <button
                    className="btn-login"
                    onClick={() => {
                      navigate("/Login");
                    }}
                  >
                    Log in
                  </button>
                  <button
                    className="btn-signup"
                    onClick={() => {
                      navigate("/Register");
                    }}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <NavDropdown
                  className="btn-setting"
                  title="Setting"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
