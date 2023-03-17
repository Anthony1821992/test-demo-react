import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putEditQuiz } from "../../../../services/APIService";
import _ from "lodash";

const ModalEditQuiz = (props) => {
  const { show, setShow, quizEdit } = props;
  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPreviewEditImage("");
    props.setQuizEdit({});
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewEditImage, setPreviewEditImage] = useState("");
  useEffect(() => {
    if (!_.isEmpty(quizEdit)) {
      // update state
      setName(quizEdit.name);
      setDescription(quizEdit.description);
      setType(quizEdit.difficulty);
      setImage("");
      if (quizEdit.image) {
        setPreviewEditImage(`data:image/jpeg;base64,${quizEdit.image}`);
      }
    }
  }, [quizEdit]);

  const handleUploadEditImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewEditImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitEditQuiz = async () => {
    let data = await putEditQuiz(quizEdit.id, description, name, type, image);
    console.log("check data", data);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz();
      // await props.fetchListUsersWithPaginate(props.currentPage);
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                // disabled
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                // disabled
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            {/* <div className="col-md-6">
              <label className="form-label">Difficulty</label>
              <input
                type="text"
                className="form-control"
                value={type}
                onChange={(event) => setType(event.target.value)}
              />
            </div> */}
            <div className="col-md-4">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="col-md-12">
              <label
                className="form-label label-upload"
                htmlFor="labelEditUpload"
              >
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                id="labelEditUpload"
                onChange={(event) => handleUploadEditImage(event)}
                hidden
              />
            </div>

            <div className="col-md-12 img-review">
              {previewEditImage ? (
                <img src={previewEditImage} alt="" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitEditQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalEditQuiz;
