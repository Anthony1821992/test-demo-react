import SideBar from "./SideBar";
import "./Admin.scss";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <div className="admin-container">
        <div className="admin-sidebar">
          <SideBar collapsed={collapsed} />
        </div>

        <div className="admin-content">
          <div className="admin-header">
            <FaBars
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            />
          </div>
          <div className="admin-main">
            <PerfectScrollbar>
              <Outlet />
            </PerfectScrollbar>

            {/* Trong file index.js ta có 2 Route Cha là: App và Admin.
            - Route App chứa 2 Route Con là HomePage và User.
            - Route Admin chứa 2 Route Con là DashBoard và ManageUser.
            - <Outlet/> sẽ được sử dụng trong Route Cha, đó là lí do ta import thẻ <Outlet/> 
            bên trong 2 Components (App và Admin) này.
            - <Outlet/> được sử dụng cho mục đích là khi ta Click vào đường Link tới 
            Component Route Con, thì ngoài việc nó sẽ hiển thị nội dụng của Component đó,
            nó còn hiện thị cả nội dung của thằng Route Cha nữa.
            - Trong trường hợp này, thì 2 Components: Homepage và User, ngoài việc 
            hiển thị nội dung mà ta code bên trong chúng, nó còn hiển thị thêm phần
            Header trong Route Cha là App (kế thừa, xài chung với thằng Cha)
            - Còn với DashBoard và ManageUser, ngoài việc hiển thị Modal(ManageUser) và nội dung 
            bên trong thì sẽ hiển thị thêm chung phần SideBar và nút Toggle của Route Cha là Admin  */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
