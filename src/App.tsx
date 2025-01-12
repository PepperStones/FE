import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import { AuthProvider } from "./context/AuthContext.tsx";

import Login from "./pages/Login.tsx"

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #131725; 
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
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
