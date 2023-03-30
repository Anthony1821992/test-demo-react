import axios from "../utils/AxiosCustomize";

// Nếu như có gửi File lên server thì ta sẽ truyền data bằng Axios FormData theo Async/Await
const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email); //("trường(field)", giá trị (value))
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image); // ("file", file)
  return axios.post("api/v1/participant", data);
  // Lấy link từ Postman/Participant/POST Participant/Body
};

const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image); // ("file", file)
  return axios.put("api/v1/participant", data);
  // Lấy link từ Postman/Participant/PUT Participant/Body
};

const deleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post(
    "api/v1/login",
    // { email, password } ====> viết tắt
    { email: email, password: password, delay: 5000 }
  );
};

const postRegister = (email, password, username) => {
  return axios.post("api/v1/register", {
    email: email,
    password: password,
    username: username,
  });
};

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (quizId) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
};

const postSubmitQuiz = (data) => {
  console.log("check api", { ...data });
  return axios.post("api/v1/quiz-submit", { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image); // ("file", file)
  return axios.post("api/v1/quiz", data);
};

const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};

const deleteQuiz = (quizId) => {
  return axios.delete(`api/v1/quiz/${quizId}`);
};

const putEditQuiz = (id, description, name, difficulty, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image); // ("file", file)
  return axios.put("api/v1/quiz", data);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", image); // ("file", file)
  return axios.post("api/v1/question", data);
};

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

const postAssignQuiz = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
  return axios.post("api/v1/quiz-upsert-qa", { ...data });
};

const logout = (email, refresh_token) => {
  return axios.post("api/v1/logout", {
    email: email,
    refresh_token: refresh_token,
  });
};

export {
  postCreateNewUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  deleteQuiz,
  putEditQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  logout,
}; // Export dưới dạng Object để có thể export được nhiều biến để sử dụng được nhiều nơi, còn export default chỉ xuất ra có 1 biến mà thôi

// Giải thích cho việc tại sao chúng ta có thể import axios ở 1 file mà nó chỉ export ra biến instance: Là vì chúng ta dùng export default nên chỉ xuất ra duy nhất có 1 biến là instance thôi mà biến này có dùng tới thằng axios được import từ thư viện axios, nên khi chúng ta import dưới tên axios tại file này thì nó sẽ tự động hiểu chúng ta muốn dùng tới axios của file này. Như vậy chúng ta sẽ không cần thay đổi tên thành instance.post() mà có thể dùng axios.post() nó sẽ giống với cú pháp call API hơn.
