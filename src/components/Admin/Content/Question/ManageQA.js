// Logic của phần này đó là khi chúng ta muốn thêm bớt câu hỏi hay thêm/ bớt câu trả lời thì chúng ta cần phải thao tác với mảng [], và trong mảng này chưa các objects {}. Và chúng ta sẽ thao tác với State của React thì mới có hiện tượng Re-render thì mới tạo được cảm giác cho người dùng

import { useState } from "react";
import Select from "react-select";
import "./ManageQA.scss";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import _, { clone, findIndex } from "lodash"; //dùng để clone state của React, sau đó dùng hàm filter() để cập nhật lai state sau khi dựa vào id để remove object.
import { NavItem } from "react-bootstrap";

const ManageQA = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});

  // Tạo State cho Questions và Answers
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };

      setQuestions([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      let cloneQuestion = _.cloneDeep(questions); // dùng hàm _.cloneDeep() của lodash để copy state
      cloneQuestion = cloneQuestion.filter((item) => item.id !== id); // dùng hàm filter() để lọc ra những phần tử có id khác với id mà ta có được khi nhấn nút remove câu hỏi.
      setQuestions(cloneQuestion);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    console.log("check questionId", questionId);
    if (type === "ADD") {
      let cloneQuestion = _.cloneDeep(questions);
      let index = cloneQuestion.findIndex((item) => item.id === questionId);

      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      cloneQuestion[index].answers.push(newAnswer);
      setQuestions(cloneQuestion);
    }
    if (type === "REMOVE") {
      let cloneQuestion = _.cloneDeep(questions); // dùng hàm _.cloneDeep() của lodash để copy state
      let index = cloneQuestion.findIndex((item) => item.id === questionId);
      console.log("check Index", index, "answerID", answerId);
      console.log("check value", cloneQuestion[index].answers);
      cloneQuestion[index].answers = cloneQuestion[index].answers.filter(
        (item) => item.id !== answerId
      ); // dùng hàm filter() để lọc ra những phần tử có id khác với id mà ta có được khi nhấn nút remove câu hỏi.
      setQuestions(cloneQuestion);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let cloneQuestion = _.cloneDeep(questions);
      let index = cloneQuestion.findIndex((item) => item.id === questionId);
      if (index > -1) {
        cloneQuestion[index].description = value;
        setQuestions(cloneQuestion);
      }
    }
  };

  const handleOnChangeImageFile = (questionId, event) => {
    let cloneQuestion = _.cloneDeep(questions);
    let index = cloneQuestion.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      cloneQuestion[index].imageFile = event.target.files[0];
      cloneQuestion[index].imageName = event.target.files[0].name; // Vì sao ta có được giá trị này event.target.files[0].name thì ta sẽ dùng console.log(event.target.files[0]) là sẽ hiểu
      setQuestions(cloneQuestion);
    }
  };

  const handleOnChangeAnswer = (type, questionId, answerId, value) => {
    let cloneQuestion = _.cloneDeep(questions);
    let index = cloneQuestion.findIndex((item) => item.id === questionId);
    console.log(type, questionId, answerId, value, index);
    if (index > -1) {
      cloneQuestion[index].answers = cloneQuestion[index].answers.map(
        (item) => {
          if (item.id === answerId) {
            if (type === "CHECKBOX") {
              item.isCorrect = value;
            }
            if (type === "INPUT") {
              item.description = value;
            }
          }
          return item; // đối với những thằng nào chúng ta không thay đổi thì nó vẫn giữ nguyên và trả về. Khi dùng hàm map() ta phải có return ở cuối hàm
        }
      );
      setQuestions(cloneQuestion);
    }
  };

  const handleSubmitQuestionForQuiz = () => {
    console.log("questions", questions);
  };
  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2"> Add Questions:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((q, index) => {
            return (
              <div key={q.id} className="q-main mb-4">
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      defaultValue={q.description}
                      onChange={(event) =>
                        handleOnChange("QUESTION", q.id, event.target.value)
                      }
                    />
                    <label>Question {index + 1}'s description</label>
                  </div>
                  <div className="group-upload">
                    {/* Để icon mapping với input bị hidden ta cần sử dụng htmlFor
                    Ở đây ta sử dụng id = questionId luôn để tránh hardcode, đồng thời cũng tránh bị trùng lặp vì mỗi câu hỏi sẽ có id khác nhau. Bên dưới phần input ta chỉ cần thêm id vào là xong. */}
                    {/* Ta phải sử dụng thẻ <label> cho icon thì nó mới vô phần upload file được */}
                    <label htmlFor={`${q.id}`}>
                      <RiImageAddFill className="icon-image" />
                    </label>
                    <span>
                      {q.imageName ? q.imageName : "0 file is uploaded"}
                    </span>
                    <input
                      id={`${q.id}`}
                      onChange={
                        (event) => handleOnChangeImageFile(q.id, event) //vì chúng ta đang thao tác với file ảnh nên chúng ta chỉ cần biến event thôi để lấy event.target.files, không phải event.target.value
                      }
                      type={"file"}
                      hidden
                    />
                  </div>
                  <div className="btn-group">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <FaPlus className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() => handleAddRemoveQuestion("REMOVE", q.id)}
                      >
                        <FaMinus className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {q.answers &&
                  q.answers.length > 0 &&
                  q.answers.map((a, index) => {
                    return (
                      <div key={a.id} className="answers-content">
                        <input
                          className=" iscorrect form-check-input"
                          type="checkbox"
                          checked={a.isCorrect}
                          onChange={(event) =>
                            handleOnChangeAnswer(
                              "CHECKBOX",
                              q.id,
                              a.id,
                              event.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer">
                          <input
                            defaultValue={a.description}
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            onChange={(event) =>
                              handleOnChangeAnswer(
                                "INPUT",
                                q.id,
                                a.id,
                                event.target.value
                              )
                            }
                          />
                          <label>Answer {index + 1}</label>
                        </div>

                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", q.id, "")
                            }
                          >
                            <FiPlusCircle className="icon-add" />
                          </span>
                          {q.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer("REMOVE", q.id, a.id)
                              }
                            >
                              <FiMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className="btn btn-warning"
            >
              Save Questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ManageQA;
