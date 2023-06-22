import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import MainAdmin from "./pages/admin/MainAdmin";
import MainUser from "./pages/user/MainUser";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainAdmin />} />
        <Route path="/pages/*" element={<MainUser />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
