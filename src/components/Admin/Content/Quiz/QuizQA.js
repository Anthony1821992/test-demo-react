// Logic của phần này đó là khi chúng ta muốn thêm bớt câu hỏi hay thêm/ bớt câu trả lời thì chúng ta cần phải thao tác với mảng [], và trong mảng này chưa các objects {}. Và chúng ta sẽ thao tác với State của React thì mới có hiện tượng Re-render thì mới tạo được cảm giác cho người dùng

import { useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import _ from "lodash"; //dùng để clone state của React, sau đó dùng hàm filter() để cập nhật lai state sau khi dựa vào id để remove object.
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postUpsertQA,
  getQuizWithQA,
} from "../../../../services/APIService";

const QuizQA = (props) => {
  // Tạo State cho Questions và Answers
  const initialQuestion = [
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
      ],
    },
  ];
  const [questions, setQuestions] = useState(initialQuestion);

  const [isPreviewImage, setIsPreviewImage] = useState(false);

  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  console.log("check value", dataImagePreview);

  const [listQuiz, setListQuiz] = useState([]);

  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  //return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  //Usage example:
  urltoFile(
    "data:text/plain;base64,aGVsbG8gd29ybGQ=",
    "hello.txt",
    "text/plain"
  ).then(function (file) {
    console.log(file);
  });

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      // convert base64 to File object
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question - ${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question - ${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
      }

      setQuestions(newQA);
    }
  };

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `Quiz ${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
    console.log("listQuiz", listQuiz);
  };
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

  const handleSubmitQuestionForQuiz = async () => {
    // Validate data:
    // 1. Validate select Quiz: nếu không chọn quiz thì sẽ không cho Submit và báo lỗi
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz");
      return;
    }

    // 2. Validate Answer: không được để trống phần trả lời (nếu muốn tăng độ khó thì làm thêm phần check phải có ít nhất 1 câu trả lời được tick vào ô check box). Ở đây cách đơn giản nhất là ta sẽ dùng vòng lặp for để hạy từng câu hỏi, và cứ mỗi câu hỏi ta sẽ chạy từng câu trả lời. khi nào nó gặp phải điều kiện mà ta code thì ngay lặp tức nó sẽ dừng lại (break)

    let isValidAnswer = true;
    let indexQ = 0;
    let indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j + 1; // để biết xem là bị câu trả lời nào
          break;
        }
      }
      if (isValidAnswer === false) {
        indexQ = i + 1; // để biết xem bị ở câu hỏi nào
        toast.error(`Empty Answer ${indexA} of Question ${indexQ}`);
        break;
      }
    }
    if (isValidAnswer === false) {
      return;
    }

    // 3. Tương tự như phần câu trả lời
    let isValidQuestion = true;
    let indexQuestion = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQuestion = i + 1;
        toast.error(`Empty Question ${indexQuestion}'s Description`);
        break;
      }
    }
    if (isValidQuestion === false) {
      return;
    }
    // 4. Thử thách dành cho bạn, đó là sẽ chuyển ô description của câu hỏi hoặc câu trả lời thành màu đỏ nếu như để trống (cuối video 99 có gợi ý)

    // Submit question
    let questionClone = _.cloneDeep(questions);
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }
    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionClone,
    });
    console.log(">>>check res", res);
    // toast.success(`Created Question and Answer successfully`);
    // setQuestions(initialQuestion);
  };

  const handlePreviewImage = (questionId) => {
    let cloneQuestion = _.cloneDeep(questions);
    let index = cloneQuestion.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(cloneQuestion[index].imageFile),
        title: cloneQuestion[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };
  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
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
                      {q.imageName ? (
                        // khi ta muốn làm onClick của 1 file nào đó ta cần bọc nó vào thẻ <span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePreviewImage(q.id)}
                        >
                          {q.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
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
      {isPreviewImage === true && (
        <Lightbox
          onClose={() => setIsPreviewImage(false)}
          image={dataImagePreview.url}
          title={dataImagePreview.title}
        />
      )}
    </div>
  );
};
export default QuizQA;

// Note phần preview image dựa vào thư viện react-awesome-lightbox
// Ban đầu dự định sẽ để phần preview image bên trong vòng lặp map() của question để ta có thể gán giá trị trực tiếp cho phần URL và phần image title mà không cần phải check questionID. Tuy nhiên việc nó render 1 lúc nhiều <Lightbox> khiến cho phần preview Image bị chồng chéo lên nhau nên xảy ra hiện tượng những image của các câu hỏi trước bị trùng lặp với các câu hỏi sau dù cho thông tin của ảnh của câu hỏi đó vẫn đúng. Đó là 1 bug của thư viện này.
// Để khắc phục lỗi này ta sẽ không phụ thuộc vào vòng lặp nữa mà để nó độc lập. Khi này ta sẽ gán giá trị của URL và title trong <Lightbox> bằng 1 state là 1 object chứa 2 giá trị là URL và title. Lúc đó ta sẽ tạo 1 hàm onClick ở thẻ <span>, mỗi khi ta click vào thẻ <span> để xem preview image ta sẽ cập nhật lại state dựa vào questionId để biết ta muốn preview image của câu hỏi nào
