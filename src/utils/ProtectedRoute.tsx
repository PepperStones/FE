import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const checkedAuthFlag = useRef(false); // 인증 체크가 한 번만 실행되도록 설정

  // 액세스 토큰 갱신 함수
  const refreshAccessToken = async () => {
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

  useEffect(() => {
    if (!checkedAuthFlag.current) {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        // 액세스 토큰이 없으면 갱신 시도
        (async () => {
          const newAccessToken = await refreshAccessToken();
          if (!newAccessToken) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
          }
        })();
      }

      checkedAuthFlag.current = true;
    }
  }, [navigate]);

  // accessToken이 있을 때만 보호된 컴포넌트를 렌더링
  return localStorage.getItem("accessToken") ? element : null;
};

export default ProtectedRoute;
