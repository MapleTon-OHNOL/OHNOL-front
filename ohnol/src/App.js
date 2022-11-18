import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import LoginForm from "./pages/Login/LoginForm";
import SignUp from "./pages/SignUp/SignUp";
import AuthProvider from "./components/Auth/AuthProvider";
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer"
import WriteLetter from "./pages/WriteLetter/WriteLetter"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* 로그인 라우팅 */}

          <Route path="/" element={<Login />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home/:userID" element={<Home />} />

          {/* 로그인해야만 접근가능한 URL */}
          <Route element={<AuthProvider />}>
            <Route path="/writeLetter" element={<WriteLetter />} />
          </Route>``
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
