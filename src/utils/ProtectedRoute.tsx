import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { refreshAccessToken } from "../api/user/AuthApi.ts";

// 액세스 토큰의 유효성 검사
const isAccessTokenValid = (token) => {   
  if (!token) return false; //   엑세스 토큰이 없는 경우

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // JWT의 payload 디코딩
    return payload.exp * 1000 > Date.now(); // 만료 시간(exp)와 현재 시간 비교
  } catch (error) {   //    엑세스 토큰이 있지만 유효하지 않은 경우
    console.error("유효성 검사 오류:", error);
    return false;
  }
};

// 사용자 인증 처리 로직
const handleAuthentication = async (navigate, checkedAuthFlag) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (isAccessTokenValid(accessToken)) {  // 엑세스 토큰이 있고 유효할 경우
    checkedAuthFlag.current = true;
    return true;
  }

  if (refreshToken) {   // 엑세스 토큰이 있지만 유효하지 않을 경우
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {   // 리프레시 토큰이 있고 유효할 경우
      localStorage.setItem("accessToken", newAccessToken);
      checkedAuthFlag.current = true; 
      return true;
    }
  }

  // 리프레시 토큰이 만료되거나 엑세스 토큰이 없는 경우
  alert("로그인이 필요한 서비스입니다.");
  navigate("/login");
  return false;
};

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const checkedAuthFlag = useRef(false);

  useEffect(() => {
    if (!checkedAuthFlag.current) {
      (async () => {
        await handleAuthentication(navigate, checkedAuthFlag);
      })();
    }
  }, [navigate]);

  // accessToken이 있을 때만 보호된 컴포넌트를 렌더링
  return localStorage.getItem("accessToken") ? element : null;
};

export default ProtectedRoute;