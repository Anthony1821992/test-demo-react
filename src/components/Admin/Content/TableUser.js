// Tạo table tất cả người dùng hiển thị trên trang User Management = bootstrap 5 table. Sau đó import vào file ManageUser.js

// 1. Tạo 1 hàm getAllUser() trong file APIService để lấy API của người dùng = axios.get() theo Async/Await từ thằng POSTMAN
// 2. Tạo 1 biến res để hứng lấy API của người dùng (Object), sau đó check điều kiện với res.EC, nếu như res.EC = 0 -> không có lỗi -> thì sẽ chạy React Hook setListUser(res.DT) - cập nhật lại listUser = API data
// 3. Render Table of Users ra HTML bằng map(). Thêm điều kiện khi listUsers.length > 0 và = 0.
// 4. Sử dụng hàm useEffect()

import { useState, useEffect } from "react";
import { getAllUser } from "../../../services/APIService";

const TableUser = (props) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUser();
    console.log("check value", res);
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };
  console.log("run view ");
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-secondary">View</button>
                    <button className="btn btn-warning mx-3">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;
