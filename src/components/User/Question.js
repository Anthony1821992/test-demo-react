import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
  const [choices, setChoices] = useState([]);

  const [isPreviewImage, setIsPreviewImage] = useState(false);

  const { dataQuiz, index } = props;
  if (_.isEmpty(dataQuiz)) {
    return <></>;
  }
  //   console.log(index, dataQuiz);

  const handleCheckboxChange = (e, a) => {
    const value = e.target.value;
    // console.log("check value", value, e.target.checked);
    // console.log("check value isSelected", a);

    if (e.target.checked) {
      setChoices([...choices, value]);
      a.isSelected = true;
    } else {
      setChoices(choices.filter((c) => c !== value));
      a.isSelected = false;
    }
  };
  // console.log("check choices", choices);

  return (
    <>
      {dataQuiz.image ? (
        <div className="question-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/png;base64,${dataQuiz.image}`}
          ></img>
          {isPreviewImage === true && (
            <Lightbox
              onClose={() => setIsPreviewImage(false)}
              image={`data:image/png;base64,${dataQuiz.image}`}
              title={"Question Image"}
            />
          )}
        </div>
      ) : (
        <div className="question-image"></div>
      )}

      <div className="question">
        Question {index + 1}: {dataQuiz.questionDescription}
      </div>
      <div className="answer">
        {dataQuiz.answers &&
          dataQuiz.answers.length > 0 &&
          dataQuiz.answers.map((a, index) => {
            // console.log("check a value", a, "check index", index);
            return (
              <div key={`answer-${index}`} className="answer-child">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={a.description + +a.id}
                      checked={choices.includes(a.description + +a.id)}
                      onChange={(e) => {
                        handleCheckboxChange(e, a);
                      }}
                    />
                    {a.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
