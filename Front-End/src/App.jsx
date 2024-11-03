import { useState } from "react";
import "./App.css";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./Context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <div className="m-0 p-4 h-screen flex items-center justify-center">
        <Toaster />
        <Routes>
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
