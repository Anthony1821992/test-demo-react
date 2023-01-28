import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { useState } from "react";

// Vì bên component Con dựa vào State là {show} nên khi chuyển lên thằng Cha ta sẽ dùng Hook useState() dựa trên State này
// vì vậy ta sẽ có được dòng code:  const [show, setShow] = useState(false); mặc định show = false vì ta luôn muốn nó ban
// đầu là đóng trước khi người dùng click vào nút Add New User.

// Trong <button> Add new user ta tạo hàm onClick = Arrow Function tên là handleShow() vì mặc định trong Modal của React-
// Bootstrap nó đã đặt tên là handleShow(). Khi hàm này được gọi thì sau đó sẽ gọi tới hàm setShow(), khi đó ta để giá
// trị mà ta muốn gán cho {show} ở đây là true để Modal được hiện ra.   const handleShow = () => setShow(true);

// Ở Component Con, trong Modal của React-Bootstrap có gọi tới hàm handleClose() mỗi khi người dùng ấn dấu X ở góc phải
// màn hình, hay ấn nút Close, hay sau khi Save xong thông tin. Vì vậy ta cần phải khai báo hàm này ở thằng Cha, và
// truyền xuống cho thằng Con. Và khi này ta cần phải gán lại giá trị cho {show} là false để đóng Modal lại. Vì vậy mà
// ta có dòng code:   const handleClose = () => setShow(false);

// Sau khi tạo xong state, Hook và Functions cho việc đóng mở Modal, ta cần phải bỏ vào trong thẻ của Component Con
// <ModalCreateUser show={show} handleClose={handleClose} /> Lý do không truyền handleShow() vì hàm này chỉ sử dụng ở thằng
// Cha, không sử dụng ở thằng Con

// Xem tiếp bên Component Con

const ManageUser = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="manage-users-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div>
          <button onClick={() => handleShow()}>Add new user</button>
        </div>
        <div>Table User Details</div>
      </div>
      <ModalCreateUser show={show} handleClose={handleClose} />
    </div>
  );
};
export default ManageUser;
