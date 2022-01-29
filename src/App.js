import React from "react";
import { ThemeProvider } from "@ui5/webcomponents-react";
import "./App.css";
import Worklist from "./layout/Worklist/Worklist";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./layout/Object/Product";
import SignUp from "./layout/FullScreen/SignUp";
import SignIn from "./layout/FullScreen/SignIn";
import AuthProvider from "./auth/Auth";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/products" element={<Worklist />}></Route>
            <Route path="/products/:id" element={<Product />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
