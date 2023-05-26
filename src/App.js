import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainAdmin from "./pages/admin/MainAdmin";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<MainAdmin />} />
      </Routes>
    </>
  );
};

export default App;
