import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useState, useEffect } from "react";
import { getAllUser } from "../../../services/APIService";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };
  return (
    <div className="manage-users-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-user-container">
          <TableUser listUsers={listUsers} />
        </div>
      </div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUsers={fetchListUsers}
      />
    </div>
  );
};
export default ManageUser;
