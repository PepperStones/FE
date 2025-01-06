import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Test from './pages/Test.tsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
