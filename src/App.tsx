import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotificationList from "./pages/NotificationList.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/notification_list" element={<NotificationList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
