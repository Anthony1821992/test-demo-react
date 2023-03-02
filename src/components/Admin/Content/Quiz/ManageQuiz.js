import "./ManageQuiz.scss";
import Select from "react-select";
import { useState } from "react";

const ManageQuiz = (props) => {
  const options = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Easy");
  const [image, setImage] = useState(null);
  const handleChangeFile = (event) => {};

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
              value={type}
              onChange={(event) => setType(event.target.value)}
              options={options}
            />
          </div>

          <div className="more-actions form-group">
            <label className="mb-1">Upload Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => handleChangeFile(event)}
            />
          </div>
        </fieldset>
      </div>
      <div className="list-detail">Table</div>
    </div>
  );
};
export default ManageQuiz;
