import axios from 'axios';

// Base URL for the API
const BASE_URL = process.env.REACT_APP_API_BASE_URL + '/auth';

// Create Axios instance
const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login Api
export const login = async (userId: string, password: string) => {
  const response = await authApi.post('/signin', { userId, password });
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await authApi.post('/newToken', { refreshToken });
  return response.data;
};

export default authApi;

// Refresh acess token Api
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("리프레시 토큰이 없습니다.");
    }

    // API 요청: 리프레시 토큰으로 새로운 액세스 토큰 요청
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/newToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`, // 리프레시 토큰을 Authorization 헤더로 전달
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.code === 200 && data.data.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken); // 새로운 액세스 토큰 저장
        return data.data.accessToken;
      } else {
        throw new Error("응답 데이터가 올바르지 않습니다.");
      }
    } else {
      throw new Error("액세스 토큰 갱신 실패");
    }
  } catch (error) {
    console.error("액세스 토큰 갱신 중 오류:", error);
    return null;
  }
};