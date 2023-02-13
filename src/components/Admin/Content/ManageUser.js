import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import TableUserPaginate from "./TableUserPaginate";
import { useState, useEffect } from "react";
import { getAllUser, getUserWithPaginate } from "../../../services/APIService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) => {
  const Limit_User = 2;

  const [pageCount, setPageCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});

  const [dataDelete, setDataDelete] = useState({});

  const handleClickBtnUpdate = (item) => {
    setShowModalUpdateUser(true);
    setDataUpdate(item);
  };

  const handleClickBtnDeleteUser = (item) => {
    setShowModalDeleteUser(true);
    setDataDelete(item);
  };

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(1);
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, Limit_User);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
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
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
          />
        </div>
      </div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUsers={fetchListUsers}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalUpdateUser
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
        dataUpdate={dataUpdate}
        fetchListUsers={fetchListUsers}
        setDataUpdate={setDataUpdate}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        currentPage={currentPage}
      />
      <ModalDeleteUser
        show={showModalDeleteUser}
        setShow={setShowModalDeleteUser}
        dataDelete={dataDelete}
        fetchListUsers={fetchListUsers}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default ManageUser;
