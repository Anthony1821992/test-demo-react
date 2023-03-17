import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/APIService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalEditQuiz from "./ModalEditQuiz";

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setQuizDelete({});
    setQuizEdit({});
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
    console.log("res", res);
  };

  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);

  const [quizDelete, setQuizDelete] = useState({});

  const [showModalEditQuiz, setShowModalEditQuiz] = useState(false);

  const [quizEdit, setQuizEdit] = useState({});

  const handleClickBtnDeleteQuiz = (item) => {
    setShowModalDeleteQuiz(true);
    setQuizDelete(item);
  };

  const handleClickBtnEditQuiz = (item) => {
    setShowModalEditQuiz(true);
    setQuizEdit(item);
  };

  return (
    <>
      <div>List Quizzes</div>
      <table className="table table-hover table-bordered mt-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "15px" }}>
                    <button
                      onClick={() => {
                        handleClickBtnEditQuiz(item);
                      }}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleClickBtnDeleteQuiz(item);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalEditQuiz
        show={showModalEditQuiz}
        setShow={setShowModalEditQuiz}
        quizEdit={quizEdit}
        fetchQuiz={fetchQuiz}
        setQuizEdit={setQuizEdit}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        quizDelete={quizDelete}
        fetchQuiz={fetchQuiz}
        // fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        // currentPage={currentPage}
        // setCurrentPage={setCurrentPage}
      />
    </>
  );
};
export default TableQuiz;
