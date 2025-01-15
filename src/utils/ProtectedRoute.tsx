import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingModal from "../components/loading/Loading.tsx";

import { refreshAccessToken } from "../api/user/AuthApi.ts";

// 액세스 토큰의 유효성 검사
const isAccessTokenValid = (token) => {
  if (!token) return false; // 엑세스 토큰이 없는 경우

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // JWT의 payload 디코딩
    return payload.exp * 1000 > Date.now(); // 만료 시간(exp)와 현재 시간 비교
  } catch (error) {
    console.error("유효성 검사 오류:", error);
    return false;
  }
};

// 사용자 인증 처리 로직
const handleAuthentication = async (navigate) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (isAccessTokenValid(accessToken)) {
    return true; // 엑세스 토큰이 유효하면 인증 성공
  }

  if (refreshToken) {
    try {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        return true; // 리프레시 토큰으로 새 엑세스 토큰 발급 성공
      }
    } catch (error) {
      console.error("리프레시 토큰 갱신 실패:", error);
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return false;
    }
  }

  // 엑세스 토큰과 리프레시 토큰 모두 유효하지 않은 경우
  alert("로그인이 필요한 서비스입니다.");
  navigate("/login");
  return false;
};

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const authenticate = async () => {
      const result = await handleAuthentication(navigate);
      setIsAuthenticated(result); // 인증 결과 업데이트

      setIsLoading(false); // 로딩 완료
      if(!isAuthenticated) navigate("/login");
    };

    authenticate();
  }, [navigate]);

  if (isLoading) {
    return <LoadingModal isOpen={isLoading}/>;
  }

  // 인증된 경우에만 보호된 컴포넌트를 렌더링
  return isAuthenticated ? element : null;
};

export default ProtectedRoute;