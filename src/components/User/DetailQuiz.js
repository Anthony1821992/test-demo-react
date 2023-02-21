import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/APIService";
import { useEffect } from "react";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    console.log(res);
  };
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  return <>Quiz Detail</>;
};
export default DetailQuiz;
