import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createGlobalStyle } from 'styled-components';
import { AuthProvider } from "./context/AuthContext.tsx";

import Login from "./pages/Login.tsx";

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

import MemberManage from "./pages/admin/MemberManage.tsx";
import MemberDetail from "./pages/admin/MemberDetail.tsx";
import InsertMember from "./pages/admin/InsertMember.tsx";


import AdminBoard from "./pages/admin/AdminBoard.tsx";
import AdminBoardList from "./pages/admin/AdminBoardList.tsx";
import AdminAddBoard from "./pages/admin/AdminAddBoard.tsx";

import Synchronization from "./pages/admin/Synchronization.tsx";


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
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/home" element={<Home />} />
            <Route path="/notification_list" element={<NotificationList />} />
            <Route path="/challenge" element={<ChallengeQuest />} />
            <Route path="/experience-point" element={<ExperiencePoint />} />

            <Route path="/quest" element={<QuestPage />} />
            <Route path="/quest/:id" element={<QuestDetailPage />} />
            <Route path="/quest-all/:id" element={<AllQuestPage />} />

            <Route path="/board" element={<BoardPage />} />
            <Route path="/board/:id" element={<BoardDetail />} />

            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage-pwd" element={<UpdatePWDPage />} />
            <Route path="/mypage-customize" element={<CustomizingPage />} />

            <Route path="/member" element={<MemberManage />} />
            <Route path="/member/:id" element={<MemberDetail />} />
            <Route path="/addMember" element={<InsertMember />} />


            <Route path="/admin-board" element={<AdminBoardList />} />
            <Route path="/admin-board/:id" element={<AdminBoard />} />
            <Route path="/admin-add-board" element={<AdminAddBoard />} />

            <Route path="/synchro" element={<Synchronization />} />

            </Routes>
          </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
