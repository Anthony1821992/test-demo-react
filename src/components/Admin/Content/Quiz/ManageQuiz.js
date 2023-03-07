import "./ManageQuiz.scss";
import Select from "react-select";
import { useState } from "react";
import { FcPlus } from "react-icons/fc";
import { postCreateNewQuiz } from "../../../../services/APIService";
import { toast } from "react-toastify";

const ManageQuiz = (props) => {
  const options = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const handleChangeFile = (event) => {
    // Tạo điều kiện khi và chỉ khi người dùng upload file thì chúng ta mới cập nhật tới biến này
    if (event.target && event.target.files && event.target.files[0]) {
      // Cách để preview hình ảnh trước khi upload, URL.createObjectURL(event.target.files[0])
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]); //dùng setImage để cập nhật giá trị cho image để sử dụng cho backend
    }
  };

  const handleSubmitQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }

    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setPreviewImage("");
      setType(null);
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <div className="title">Manage Quizzes</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name@example.com"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="my-3">
            <Select
              defaultValue={type}
              onChange={setType}
              options={options}
              placeholder={"Quiz type..."}
            />
          </div>

          <div className="more-actions form-group">
            <label
              className="form-label label-upload mb-1"
              htmlFor="labelUpload"
            >
              <FcPlus />
              Upload Image
            </label>
            <input
              type="file"
              id="labelUpload"
              className="form-control"
              onChange={(event) => handleChangeFile(event)}
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
          <div className="mt-3">
            <button
              onClick={() => handleSubmitQuiz()}
              className="btn btn-warning"
            >
              Save
            </button>
          </div>
        </fieldset>
      </div>
      <div className="list-detail">Table</div>
    </div>
  );
};
export default ManageQuiz;
