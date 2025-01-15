import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createGlobalStyle } from 'styled-components';
import ProtectedRoute from "./utils/ProtectedRoute.tsx";

// ⇩⇩⇩ Init Screen Routes ⇩⇩⇩ //
import Splash from "./pages/Splash.tsx";
import Login from "./pages/Login.tsx";

// ⇩⇩⇩ User Screen Routes ⇩⇩⇩ //
import NotificationList from "./pages/NotificationList.tsx";
import ChallengeQuest from "./pages/ChallengeQuest.tsx";

import QuestPage from "./pages/QuestPage.tsx";
import QuestDetailPage from "./pages/QuestDetailPage.tsx";
import AllQuestPage from "./pages/AllQuestPage.tsx";

import BoardPage from "./pages/BoardPage.tsx";
import BoardDetail from "./pages/BoardDetail.tsx";

import Home from "./pages/Home.tsx";
import StarAnimation from "./components/star/StarAnimation.tsx";

import Mypage from "./pages/Mypage.tsx";
import UpdatePWDPage from "./pages/UpdatePwdPage.tsx";
import CustomizingPage from "./pages/CustomizingPage.tsx";
import ExperiencePoint from "./pages/ExperiencePoint.tsx";

// ⇩⇩⇩ Admin Screen Routes ⇩⇩⇩ //
import MemberManage from "./pages/admin/MemberManage.tsx";
import MemberDetail from "./pages/admin/MemberDetail.tsx";
import InsertMember from "./pages/admin/InsertMember.tsx";

import AdminBoard from "./pages/admin/AdminBoard.tsx";
import AdminBoardList from "./pages/admin/AdminBoardList.tsx";
import AdminAddBoard from "./pages/admin/AdminAddBoard.tsx";

import Setting from "./pages/admin/Setting.tsx";
import { initializeFirebaseMessaging, onForegroundMessage } from "./utils/firebase/messaging.ts";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
       background-color: var(--black-20); 
        font-family: Pretendard;
        height: 100%;
    }
`;

const App = () => {


  if (window.matchMedia("(display-mode: standalone)").matches) {
    console.log("PWA 환경에서 실행 중입니다.");
  }

  useEffect(() => {
    ////////////////////////// 푸시 테스트용용
    const initMessaging = async () => {
      try {
        await initializeFirebaseMessaging();
        onForegroundMessage();
      } catch (error) {
        console.error('Firebase 메시징 초기화 실패:', error);
      }
    };

    initMessaging();
    ////////////////////////// 푸시 테스트용용

    // 슬라이드 제스처 방지 (iOS)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0].pageX < 30 || e.touches[0].pageX > window.innerWidth - 30) e.preventDefault(); // 기본 동작 방지
    };
    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/notification_list" element={<ProtectedRoute element={<NotificationList />} />} />
          <Route path="/challenge" element={<ProtectedRoute element={<ChallengeQuest />} />} />
          <Route path="/experience-point" element={<ProtectedRoute element={<ExperiencePoint />} />} />

          <Route path="/quest" element={<ProtectedRoute element={<QuestPage />} />} />
          <Route path="/quest/:id" element={<ProtectedRoute element={<QuestDetailPage />} />} />
          <Route path="/quest-all/:id" element={<ProtectedRoute element={<AllQuestPage />} />} />

          <Route path="/board" element={<ProtectedRoute element={<BoardPage />} />} />
          <Route path="/board/:id" element={<ProtectedRoute element={<BoardDetail />} />} />

          <Route path="/mypage" element={<ProtectedRoute element={<Mypage />} />} />
          <Route path="/mypage-pwd" element={<ProtectedRoute element={<UpdatePWDPage />} />} />
          <Route path="/mypage-customize" element={<ProtectedRoute element={<CustomizingPage />} />} />

          <Route path="/member" element={<ProtectedRoute element={<MemberManage />} />} />
          <Route path="/member/:id" element={<ProtectedRoute element={<MemberDetail />} />} />
          <Route path="/addMember" element={<ProtectedRoute element={<InsertMember />} />} />

          <Route path="/admin-board" element={<ProtectedRoute element={<AdminBoardList />} />} />
          <Route path="/admin-board/:id" element={<ProtectedRoute element={<AdminBoard />} />} />
          <Route path="/admin-add-board" element={<ProtectedRoute element={<AdminAddBoard />} />} />

          <Route path="/setting" element={<ProtectedRoute element={<Setting />} />} />
        </Routes>

      </BrowserRouter>
    </>
  );
};

export default App;
