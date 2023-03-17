import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuiz } from "../../../../services/APIService";
import { toast } from "react-toastify";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, quizDelete } = props;
  console.log("check quizDelete", quizDelete);

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuiz(quizDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz();
      // props.setCurrentPage(1);
      // await props.fetchListUsersWithPaginate(1);
    } else {
      toast.error(data.EM);
    }
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this quiz. id =
          <b>{quizDelete && quizDelete.id ? quizDelete.id : ""}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteQuiz();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
