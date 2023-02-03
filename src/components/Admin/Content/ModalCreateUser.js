import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import axios from "axios";
// Có 1 cách làm khác được lưu ở brach diy2, nói rõ cách làm sao để chuyển chức năng <button> có sẵn của
// React-Bootstrap Modal sang 1 <button> ở Component Cha.

const ModalCreateUser = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setRole("USER");
    setImage("");
    setUsername("");
    setPreviewImage("");
  }; // Mỗi khi người dùng Close Modal thì sẽ setup lại tất cả trở về ban đầu.

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Việc chúng ta tạo thêm 1 useState cho previewImage để tránh bị ảnh hưởng tới image
  // Chúng ta chỉ cần lấy image mỗi khi người dùng đã chọn xong hình ảnh = cách setImage cho cái
  // file từ phần previewImage, khi đó image của chúng ta sẽ được cập nhật theo file ảnh mà người
  // dùng mới save
  const handleUploadImage = (event) => {
    // Tạo điều kiện khi và chỉ khi người dùng upload file thì chúng ta mới cập nhật tới biến này
    if (event.target && event.target.files && event.target.files[0]) {
      // Cách để preview hình ảnh trước khi upload, URL.createObjectURL(event.target.files[0])
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]); //dùng setImage để cập nhật giá trị cho image để sử dụng cho backend
    }
  };

  const handleSubmitCreateUser = async () => {
    // validate user
    // call APIs: Có 2 cách:

    // Nếu như không gửi File lên server thì ta có thể dùng cách này để truyền data dưới dạng Object
    // let data = {
    //   email: email,
    //   password: password,
    //   username: username,
    //   role: role,
    //   userImage: image,
    // };

    // Nếu như có gửi File lên server thì ta sẽ truyền data bằng Axios FormData theo Async/Await
    const data = new FormData();
    data.append("email", email); //("trường(field)", giá trị (value))
    data.append("password", password);
    data.append("username", username);
    data.append("role ", role);
    data.append("userImage", image); // ("file", file)

    // Lấy link từ Postman/Participant/POST Participant/Body
    // Sử dụng Await ở đây vì hành động này tốn nhiều thời gian
    let res = await axios.post(
      "http://localhost:8081/api/v1/participant",
      data
    );
    console.log(res);
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add New User
      </Button> */}
      {/* backdrop = "static" - When backdrop is set to static, the modal will not close when clicking outside it */}
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
        // We have to create a className here to CSS because the modal is not inside the div "root" so we cannot CSS via Father
        // Component "manage-user-container".
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div className="col-md-12">
              {/* 12 is a size of column = full size of <div> */}
              <label className="form-label label-upload" htmlFor="labelUpload">
                {/* htmlFor will mapping with "id" of <input>. 
            It means instead of click on <input type = "file", we can click on <label>.
            They have the same function. 
            Therefore, we can hide the tag <input> by using hidden inside <input hidden/>for more prettier. */}
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                onChange={(event) => handleUploadImage(event)}
                hidden
              />
            </div>

            <div className="col-md-12 img-review">
              {/* Tạo điều kiện nếu như người dùng không upload file ảnh gì thì sẽ mặc định hiển thị thẻ <span> */}
              {previewImage ? (
                <img src={previewImage} alt="" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
