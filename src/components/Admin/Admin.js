import { ProSidebarProvider } from "react-pro-sidebar";
import "./Admin.scss";
import SideBar from "./SideBar";
const Admin = (props) => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <ProSidebarProvider>
          <SideBar />
        </ProSidebarProvider>
      </div>
      <div className="admin-content"></div>
    </div>
  );
};
export default Admin;
