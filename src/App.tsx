import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.tsx";

import NotificationList from "./pages/NotificationList.tsx";
import ChallengeQuest from "./pages/ChallengeQuest.tsx";

import BoardPage from "./pages/BoardPage.tsx";
import BoardDetail from "./pages/BoardDetail.tsx";

import Home from "./pages/Home.tsx";
import StarAnimation from "./components/star/StarAnimation.tsx";

import Mypage from "./pages/Mypage.tsx";
import UpdatePWDPage from "./pages/UpdatePwdPage.tsx";
import CustomizingPage from "./pages/CustomizingPage.tsx";
import ExperiencePoint from "./pages/ExperiencePoint.tsx";

import { createGlobalStyle } from "styled-components";

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
       background-color: var(--bg-10); 
        font-family: Pretendard;
        height: 100%;
    }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/notification_list" element={<NotificationList />} />
          <Route path="/challenge" element={<ChallengeQuest />} />

          <Route path="/board" element={<BoardPage />} />
          <Route path="/board/:id" element={<BoardDetail />} />

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage-pwd" element={<UpdatePWDPage />} />
          <Route path="/mypage-customize" element={<CustomizingPage />} />
          <Route path="/experience-point" element={<ExperiencePoint />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
