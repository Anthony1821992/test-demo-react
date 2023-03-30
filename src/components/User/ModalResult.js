import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);

  const [isShowAnswer, setIsShowAnswer] = useState(false);

  // console.log(dataModalResult);
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your Result...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Questions: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            Total Correct Answers: <b>{dataModalResult.countCorrect}</b>
          </div>
          {isShowAnswer === true ? (
            <div>Correct Answers: {dataModalResult.countCorrect}</div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              setIsShowAnswer(!isShowAnswer);
            }}
          >
            {isShowAnswer === true ? "Hide Answers" : "Show Answers"}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
