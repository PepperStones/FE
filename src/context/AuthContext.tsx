import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { setupAxiosInterceptors } from "../utils/AxiosInterceptors.tsx";
import { LoginApi, SignInRequest } from "../api/user/AuthApi.ts";

import { SERVER_URL } from "../constants/ServerURL.js";
import { ACCESS_TOKEN_EXP_TIME, REFRESH_TOKEN_EXP_TIME } from "../constants/TokenExpireTime";

// AuthContext 타입 정의
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || "userRole";
  });

  const location = useLocation();

  // 페이지 이동 시 토큰 존재 여부로 인증 상태 확인
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    setIsAuthenticated(!!accessToken && !!refreshToken);
  }, [location]);

  // 로그인 함수
  const login = async (userId: string, password: string) => {
    try {
      const requestBody: SignInRequest = { userId, password }; // 요청 Body 생성
      const response = await LoginApi(requestBody); // LoginApi 호출

      // 응답 데이터에서 토큰 추출 및 저장
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      const userRole = response.userRole;


      Cookies.set("accessToken", accessToken, {
        expires: ACCESS_TOKEN_EXP_TIME,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", refreshToken, {
        expires: REFRESH_TOKEN_EXP_TIME,
        secure: true,
        sameSite: "Strict",
      });

      setUserRole(userRole); // 사용자 역할 (예: ADMIN)
      localStorage.setItem("userRole", userRole);

      setIsAuthenticated(true); // 인증 상태 업데이트
    } catch (error: any) {
      console.error("Login failed:", error.message);
      throw new Error(error.message || "로그인에 실패했습니다.");
    }
  };

  // 로그아웃 함수
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    setUserRole("userRole");
    localStorage.removeItem("userRole");

    setIsAuthenticated(false);
  };

  // 액세스 토큰 갱신 함수
  const refreshAccessToken = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await axios.post(
        `${SERVER_URL}auth/newToken`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const { accessToken } = response.data;

      // 새 액세스 토큰을 쿠키에 저장
      Cookies.set("accessToken", accessToken, {
        expires: ACCESS_TOKEN_EXP_TIME,
        secure: true,
        sameSite: "Strict",
      });

      setIsAuthenticated(true);
      return accessToken;
    } catch (error) {
      console.error("Access token refresh failed:", error);
      logout();
      return null;
    }
  };

  useEffect(() => {
    // Axios 인터셉터 설정
    setupAxiosInterceptors({
      refreshAccessToken,
      logout,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
