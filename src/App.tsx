import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.tsx";

import NotificationList from "./pages/NotificationList.tsx";
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
          <Route path="/login" element={<Login />} />
          <Route path="/notification_list" element={<NotificationList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
