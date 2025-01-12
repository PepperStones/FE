// src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (요청 전 데이터를 가공하거나 헤더 추가, 인증 등을 처리.)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("[Request Error]", error);
    return Promise.reject(error); // 요청 중단
  }
);

// 응답 인터셉터 (서버 응답 데이터를 가공하거나 오류 처리 로직 추가.)
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터 처리
    console.log("[Response]", response);
    return response.data; // 필요 시 데이터를 변환
  },
  (error) => {
    // 응답 오류 처리
    if (error.response) {
      // 서버에서 반환한 HTTP 상태 코드에 따른 에러 처리
      console.error(
        "[Response Error]",
        error.response.code,
        error.response.data
      );
      //   if (error.response.code === 401) {
      //     alert("로그인이 필요합니다.");
      //     // 로그아웃 처리 또는 로그인 페이지로 리다이렉트
      //   }
    } else if (error.request) {
      // 요청은 성공적으로 전송되었으나 서버에서 응답하지 않음
      console.error("[No Response]", error.request);
    } else {
      // 기타 요청 생성 중 에러
      console.error("[Error]", error.message);
    }
    return Promise.reject(error); // 오류를 계속 전파
  }
);

export default axiosInstance;
