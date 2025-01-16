import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import LargeBtn from "../components/button/LargeBtn.tsx";
import LargeInput from "../components/inputField/LargeInput.tsx";
import NoticeModal from "../components/modal/NoticeModal.tsx";

import ID from "../assets/images/gray_person.png";
import ActID from "../assets/images/lightgray_person.png";
import Lock from "../assets/images/gray_lock.png";
import ActLock from "../assets/images/lightgray_lock.png";

import { login } from "../api/user/AuthApi.ts";
import { registerFcmToken } from "../api/user/registerFcmTokenAPI.ts";

// import {
//   requestPermissionAndGetToken,
//   onForegroundMessage,
// } from "../utils/firebase/messaging.ts";
import { onMessageListener, requestPermissionAndGetToken } from "../utils/firebase/firebase.js";

function Login() {
  const navigate = useNavigate();

  const [userID, setUserID] = useState<string>("");
  const [userPWD, setUserPWD] = useState<string>("");
  const [isLoginAvailable, setIsLoginAvailable] = useState<boolean>(false);
  const [isLoginFailModalOpen, setIsLoginFailModalOpen] = useState<boolean>(false);

  // Function to handle login
  const handleLogin = async () => {
    if (!isLoginAvailable) return;

    try {
      // Call the login API
      const result = await login(userID, userPWD);

      // Save tokens to localStorage
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);
      localStorage.setItem("userRole", result.data.userRole);

      // FCM 토큰 발급
      const fcmToken = await requestPermissionAndGetToken();
      console.log("FCM Token:", fcmToken);
      if (fcmToken) {
        try {
          // FCM 토큰 등록 요청
          const registerResponse = await registerFcmToken(fcmToken);

          if (registerResponse.message) {
            console.log("FCM 토큰 등록 성공:", registerResponse.message);
          } else {
            console.error("FCM 토큰 등록 실패:", registerResponse.message);
          }
        } catch (error) {
          console.error("FCM 토큰 등록 요청 실패:", error.message);
        }
      } else {
        console.warn("FCM 토큰을 가져올 수 없습니다.");
      }

      // 포그라운드 메시지 처리
      //onForegroundMessage();
      onMessageListener();

      if (result.data.userRole === "USER") {
        navigate("/home");
      } else if (result.data.userRole === "ADMIN") {
        navigate("/member");
      }
    } catch (error) {
      console.error("Login failed:", error);
      openLoginFailModal();
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setInput(event.target.value);
  };

  const openLoginFailModal = () => {
    setIsLoginFailModalOpen(true);
  };

  const closeLoginFailModal = () => {
    setIsLoginFailModalOpen(false);
  };

  useEffect(() => {
    setIsLoginAvailable(userID !== "" && userPWD !== "");
  }, [userID, userPWD]);

  return (
    <LoginScreenContainer>
      <Header className="title-lg-300">로그인</Header>

      <InputContainer>
        <LargeInput
          icon={ID}
          activeIcon={ActID}
          placeholder="아이디를 입력해주세요."
          value={userID}
          onChangeFunc={(e) => handleInputChange(e, setUserID)}
        />

        <LargeInput
          icon={Lock}
          activeIcon={ActLock}
          placeholder="비밀번호를 입력해주세요."
          type="password"
          value={userPWD}
          onChangeFunc={(e) => handleInputChange(e, setUserPWD)}
        />
      </InputContainer>

      <LargeBtn
        content="로그인"
        onClick={handleLogin}
        isAvailable={isLoginAvailable}
      />

      <NoticeModal
        showNoticeModal={isLoginFailModalOpen}
        title="로그인 실패"
        description="아이디와 비밀번호를 다시 입력해주세요."
        onAcceptFunc={closeLoginFailModal}
      />
    </LoginScreenContainer>
  );
}

export default Login;

const LoginScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 15px;
  overflow: hidden;
`;

const Header = styled.div`
  margin: 150px 0;

  color: var(--gray-100);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  gap: 15px;

  margin-bottom: 40px;
`;
