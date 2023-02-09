// Tạo table tất cả người dùng hiển thị trên trang User Management = bootstrap 5 table. Sau đó import vào file ManageUser.js

// 1. Render Table of Users ra HTML bằng map(). Thêm điều kiện khi listUsers.length > 0 và = 0.

// 2. Tạo 1 hàm getAllUser() trong file APIService để lấy API của người dùng = axios.get() theo Async/Await từ thằng POSTMAN

// 3. Tạo 1 hàm để cập nhật lại listUser. Bên trong hàm tạo 1 biến res để hứng lấy API của người dùng (Object), sau đó check điều kiện với res.EC, nếu như res.EC = 0 -> không có lỗi -> thì sẽ chạy React Hook setListUser(res.DT) - cập nhật lại listUser = API data. Lý do tạo 1 hàm riêng để xử lý việc này vì ta không nên sử dụng Async/Await bên trong hàm useEffect(). Sau khi tạo hàm xong chúng ra sẽ bỏ vào bên trong hàm useEffect()

// 4. Sử dụng hàm useEffect() mục đích để cho phần HTML render trước để chèn vào DOM. Sau khi chèn vào DOM rồi thì chúng ta mới bắt đầu gọi API, vì API cần phải thao tác với HTML. Nếu chúng ta gọi API trước khi HTML render (chèn vào DOM) thì API không có HTML để mà thao tác.

// Sau lần render đầu tiên thì thằng useEffect() sẽ chạy duy nhất 1 lần để cập nhật lại listUsers, và sau khi listUsers được cập nhật thì HTML sẽ render lại 1 lần nữa, như vậy ta có cảm giác là dữ liệu được cập nhật

// import { useState, useEffect } from "react";
// import { getAllUser } from "../../../services/APIService";

const TableUser = (props) => {
  const { listUsers } = props;
  // const [listUsers, setListUsers] = useState([]);

  // useEffect(() => {
  //   fetchListUsers();
  // }, []);

  // const fetchListUsers = async () => {
  //   let res = await getAllUser();
  //   if (res.EC === 0) {
  //     setListUsers(res.DT);
  //   }
  // };
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
              console.log(item.role);
              return (
                <tr key={`table-user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-secondary">View</button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => props.handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
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
