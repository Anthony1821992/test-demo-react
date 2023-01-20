import "./App.scss";
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div>
        <button>
          <Link to={`/users`}>Go to User Page</Link>
        </button>
        <button>
          <Link to={`/admin`}>Go to Admin Page</Link>
        </button>
      </div>
    </div>
  );
};
export default App;
