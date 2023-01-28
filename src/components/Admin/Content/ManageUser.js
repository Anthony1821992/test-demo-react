import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";

const ManageUser = (props) => {
  return (
    <div className="manage-users-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div>
          <button>Add new user</button>
        </div>
        <div>Table User Details</div>
      </div>
      <ModalCreateUser />
    </div>
  );
};
export default ManageUser;
