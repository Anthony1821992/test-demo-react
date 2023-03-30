import CountDown from "./CountDown";
import { useRef } from "react";

const Content = (props) => {
  const refDiv = useRef([]);

  const { dataQuiz } = props;
  const onTimeUp = () => {
    props.handleFinishQuiz();
  };

  const getClassQuestion = (question) => {
    //check answer
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (question, index) => {
    console.log("check index", index);
    props.setIndex(index);
    if (refDiv.current) {
      console.log(refDiv.current);
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }
    if (question && question.answers.length > 0) {
      let isAnswer = question.answers.find((item) => item.isSelected === true);
      if (isAnswer) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };

  //   if (() => props.handleNext()) {
  //     handleClickQuestion();
  //   }

  //   if (() => props.handlePrev()) {
  //     handleClickQuestion();
  //   }

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                key={`question-abc-${index}`}
                className={getClassQuestion(item, index)}
                onClick={() => handleClickQuestion(item, index)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Content;
