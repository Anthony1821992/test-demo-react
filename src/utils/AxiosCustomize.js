// Mục đích của file Axios Customize này giúp giản lược hoá các bước xử lý data ở phía Client

// Vô Github Page của Axios --> Creating an instance - Quản lý đường link tới BackEnd, nếu sau này có gì thay đổi đường link thì ta chỉ cần thay đổi 1 nơi thôi chứ không phải tìm khắp nơi để sửa.

import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8081/",
});
export default instance;

// Dùng Axios Interceptor (can thiệp trước khi người dùng gửi request hay trước khi nhận về phản hồi từ server) để giản lược data từ phía Server trước khi trả về cho Client thay vì response quá nhiều thông tin không cần thiết.
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
