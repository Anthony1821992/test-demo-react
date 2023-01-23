import SideBar from "./SideBar";
import "./Admin.scss";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <div className="admin-container">
        <div className="admin-sidebar">
          <SideBar collapsed={collapsed} />
        </div>

        <div className="admin-content">
          <FaBars
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
          <span>Content Here</span>
        </div>
      </div>
    </div>
  );
};
export default Admin;
